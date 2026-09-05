#!/bin/zsh
# GSC (Google Search Console) API 封装 — 提交 sitemap / 检查收录 / 拉搜索表现，不再点浏览器
# 用法: bash gsc-api.sh {submit-sitemap|inspect <url>|queries|list|projects}
#
# 凭证: seedpix/.secrets/silken-vial-504813-b2-*.json (service account JSON key)
# 文档: https://developers.google.com/webmaster-tools

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
KEY_FILE=$(ls "$SCRIPT_DIR"/../.secrets/silken-vial-*.json 2>/dev/null | head -1)

: "${KEY_FILE:?未找到 .secrets/ 下的 service account JSON key}"

SITE_URL="sc-domain:seedpix.org"   # GSC 资源（域名资源格式）
API="https://searchconsole.googleapis.com/webmasters/v3"

# 用 service account JSON key 换 OAuth2 access token（node 只负责签名 JWT，curl 负责请求）
get_token() {
  local assertion
  assertion=$(/Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e '
const fs = require("fs");
const crypto = require("crypto");
const key = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
const now = Math.floor(Date.now() / 1000);
const header = { alg: "RS256", typ: "JWT" };
const claim = {
  iss: key.client_email,
  scope: "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/webmasters",
  aud: "https://oauth2.googleapis.com/token",
  iat: now,
  exp: now + 3600,
};
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const jwt = `${b64(header)}.${b64(claim)}`;
const sig = crypto.sign("RSA-SHA256", jwt, key.private_key).toString("base64url");
process.stdout.write(`${jwt}.${sig}`);
' "$KEY_FILE")
  curl -s --max-time 20 -x "http://127.0.0.1:7897" \
    "https://oauth2.googleapis.com/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
    --data-urlencode "assertion=$assertion" | \
    /Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);if(!j.access_token){console.error("TOKEN_ERROR:",JSON.stringify(j));process.exit(1)}console.log(j.access_token)})'
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

case "${1:-}" in
  # 提交 sitemap
  submit-sitemap)
    gsc_put() {
      local token=$(get_token)
      curl -s --max-time 30 -x "http://127.0.0.1:7897" -X PUT "$API$1" -H "Authorization: Bearer $token"
    }
    gsc_put "/sites/$SITE_URL/sitemaps/https%3A%2F%2Fseedpix.org%2Fsitemap.xml"
    echo " → sitemap 提交完成"
    ;;
  # 检查单 URL 收录状态
  inspect)
    local url="${2:?用法: gsc-api.sh inspect <url>}"
    gsc_post "/sites/$SITE_URL/urlInspection/index:inspect" "{\"inspectionUrl\":\"$url\",\"siteUrl\":\"$SITE_URL\"}" | \
      /Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);const r=(j.inspectionResult||{});console.log(JSON.stringify({indexStatus:(r.indexStatusResult||{}).coverageState,pageFetch:(r.pageFetchResult||{}).fetchState,canonical:r.canonical,robotsTxt:(r.robotsTxtState||{}).crawledAs,indexingState:(r.indexStatusResult||{}).indexingState},null,2))})'
    ;;
  # 拉搜索表现（最近 28 天，按 query 聚合）
  queries)
    local today=$(date +%Y-%m-%d)
    local start=$(/Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e 'const d=new Date(Date.now()-28*864e5);console.log(d.toISOString().slice(0,10))')
    gsc_post "/sites/$SITE_URL/searchAnalytics/query" "{\"startDate\":\"$start\",\"endDate\":\"$today\",\"dimensions\":[\"query\"],\"rowLimit\":25}" | \
      /Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);(j.rows||[]).forEach(r=>console.log(`${r.clicks}\t${r.impressions}\t${(r.ctr*100).toFixed(1)}%\t${r.position.toFixed(1)}\t${r.keys[0]}`));})'
    ;;
  # 列出可访问的 GSC 资源
  list)
    gsc_get "/sites" | /Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);(j.siteEntry||[]).forEach(s=>console.log(s.siteUrl, "-", s.permissionLevel));})'
    ;;
  *) echo "用法: gsc-api.sh {submit-sitemap|inspect <url>|queries|list}" ;;
esac
