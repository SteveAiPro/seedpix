#!/bin/bash
# GSC (Google Search Console) API 封装 — 提交 sitemap / 检查收录 / 拉搜索表现
# 通用版：供「新站上线五环节」使用，站点与凭证均从环境/参数传入，不硬编码
#
# 用法:
#   SITE_URL="sc-domain:example.com" bash gsc-api.sh submit-sitemap
#   bash gsc-api.sh list                          # 列出 SA 可访问的 GSC 资源
#   bash gsc-api.sh inspect <url>                 # 检查单 URL 收录
#   bash gsc-api.sh queries                       # 最近 28 天搜索关键词表现
#
# 凭证: <项目>/.secrets/*.json (service account JSON key，需已在 GSC 授权该 SA)
#       可通过 GSC_KEY_FILE 环境变量指定具体文件
# 文档: https://developers.google.com/webmaster-tools

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# SA key 定位：优先环境变量 → 否则 .secrets/ 下任意 json
if [ -n "${GSC_KEY_FILE:-}" ]; then
  KEY_FILE="$GSC_KEY_FILE"
else
  # 从调用方工作目录往上层找 .secrets
  for d in "$SCRIPT_DIR/.." "$SCRIPT_DIR/../.." "$PWD"; do
    F=$(ls "$d"/.secrets/*.json 2>/dev/null | head -1)
    [ -n "$F" ] && KEY_FILE="$F" && break
  done
fi
: "${KEY_FILE:?未找到 service account JSON key（.secrets/ 下），或用 GSC_KEY_FILE 指定}"

# 站点资源：sc-domain:<domain> 或 https://<domain>/
SITE_URL="${SITE_URL:-sc-domain:example.com}"
# sitemap 的完整 URL（域名资源需填完整地址）
SITEMAP_URL="${SITEMAP_URL:-https://example.com/sitemap.xml}"
API="https://searchconsole.googleapis.com/webmasters/v3"
# node 定位：优先 NODE_BIN 环境变量 → 托管 node → 系统 node
if [ -z "${NODE_BIN:-}" ]; then
  for NB in "/Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node" "/opt/homebrew/bin/node" "$(command -v node)"; do
    [ -n "$NB" ] && [ -x "$NB" ] && NODE_BIN="$NB" && break
  done
fi
: "${NODE_BIN:?未找到 node，请设置 NODE_BIN}"

get_token() {
  local assertion
  assertion=$("$NODE_BIN" -e '
const fs = require("fs");
const crypto = require("crypto");
const key = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
const now = Math.floor(Date.now() / 1000);
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const jwt = `${b64({alg:"RS256",typ:"JWT"})}.${b64({iss:key.client_email,scope:"https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/webmasters",aud:"https://oauth2.googleapis.com/token",iat:now,exp:now+3600})}`;
process.stdout.write(`${jwt}.${crypto.sign("RSA-SHA256", jwt, key.private_key).toString("base64url")}`);
' "$KEY_FILE")
  curl -s --max-time 20 -x "http://127.0.0.1:7897" \
    "https://oauth2.googleapis.com/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
    --data-urlencode "assertion=$assertion" | \
    "$NODE_BIN" -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);if(!j.access_token){console.error("TOKEN_ERROR:",JSON.stringify(j));process.exit(1)}console.log(j.access_token)})'
}

gsc_get() {
  local token=$(get_token)
  curl -s --max-time 30 -x "http://127.0.0.1:7897" "$API$1" -H "Authorization: Bearer $token"
}

gsc_post() {
  local token=$(get_token)
  local body="${2:-}"
  if [ -n "$body" ]; then
    curl -s --max-time 30 -x "http://127.0.0.1:7897" -X POST "$API$1" -H "Authorization: Bearer $token" -H "Content-Type: application/json" --data-raw "$body"
  else
    curl -s --max-time 30 -x "http://127.0.0.1:7897" -X POST "$API$1" -H "Authorization: Bearer $token" -H "Content-Type: application/json"
  fi
}

# 对 URL 做 percent-encode（给 path 段用）
enc() { "$NODE_BIN" -e 'console.log(encodeURIComponent(process.argv[1]))' "$1"; }

case "${1:-}" in
  submit-sitemap)
    sp=$(enc "$SITEMAP_URL")
    token=$(get_token)
    curl -s --max-time 30 -x "http://127.0.0.1:7897" -X PUT "$API/sites/$SITE_URL/sitemaps/$sp" -H "Authorization: Bearer $token"
    echo " → sitemap 提交完成: $SITEMAP_URL"
    ;;
  sitemaps) # 查 sitemap 状态（errors/submitted/indexed）
    gsc_get "/sites/$SITE_URL/sitemaps" | "$NODE_BIN" -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);(j.sitemap||[]).forEach(s=>{console.log(s.path);console.log("   submitted:",(s.contents||[]).map(c=>c.submitted).join("/"),"indexed:",(s.contents||[]).map(c=>c.indexed).join("/"),"errors:",s.errors,"isPending:",s.isPending)})})'
    ;;
  inspect)
    # URL Inspection 用独立 base（v1），与 sitemap/searchAnalytics(v3) 不同
    url="${2:?用法: gsc-api.sh inspect <url>}"
    token=$(get_token)
    curl -s --max-time 30 -x "http://127.0.0.1:7897" -X POST \
      "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect" \
      -H "Authorization: Bearer $token" -H "Content-Type: application/json" \
      --data-raw "{\"inspectionUrl\":\"$url\",\"siteUrl\":\"$SITE_URL\"}" | \
      "$NODE_BIN" -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);if(j.error){console.error("API_ERROR:",j.error.message||JSON.stringify(j.error));process.exit(1)}const r=(j.inspectionResult||{});console.log(JSON.stringify({indexStatus:(r.indexStatusResult||{}).coverageState,pageFetch:(r.pageFetchResult||{}).fetchState,canonical:r.canonical,indexingState:(r.indexStatusResult||{}).indexingState},null,2))})'
    ;;
  queries)
    today=$(date +%Y-%m-%d)
    start=$("$NODE_BIN" -e 'const d=new Date(Date.now()-28*864e5);console.log(d.toISOString().slice(0,10))')
    gsc_post "/sites/$SITE_URL/searchAnalytics/query" "{\"startDate\":\"$start\",\"endDate\":\"$today\",\"dimensions\":[\"query\"],\"rowLimit\":25}" | \
      "$NODE_BIN" -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);(j.rows||[]).forEach(r=>console.log(`${r.clicks}\t${r.impressions}\t${(r.ctr*100).toFixed(1)}%\t${r.position.toFixed(1)}\t${r.keys[0]}`))})'
    ;;
  list)
    gsc_get "/sites" | "$NODE_BIN" -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);(j.siteEntry||[]).forEach(s=>console.log(s.siteUrl, "-", s.permissionLevel))})'
    ;;
  *) echo "用法: gsc-api.sh {submit-sitemap|sitemaps|inspect <url>|queries|list}" ;;
esac
