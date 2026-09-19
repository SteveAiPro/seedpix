#!/bin/bash
# GSC 批量 URL 收录检查 — 复用单个 token，快速跑完 sitemap 全部 URL
#
# 作用:
#   1) 查看每个 URL 的 Google 收录状态
#   2) URL Inspection API 调用本身会【触发 Google 重新抓取该 URL】，
#      所以批量跑一遍 = 主动催 Google 抓内页（新站 crawl budget 低时很有用）
#
# 用法:
#   SITE_URL="sc-domain:seedpix.org" bash gsc-inspect-all.sh
#   SITE_URL="sc-domain:example.com" SITEMAP_URL="https://example.com/sitemap.xml" bash gsc-inspect-all.sh
#
# 凭证: <项目>/.secrets/*.json

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -n "${GSC_KEY_FILE:-}" ]; then KEY_FILE="$GSC_KEY_FILE"; else
  for d in "$SCRIPT_DIR/.." "$PWD"; do
    F=$(ls "$d"/.secrets/*.json 2>/dev/null | head -1); [ -n "$F" ] && KEY_FILE="$F" && break
  done
fi
: "${KEY_FILE:?未找到 SA key}"
SITE_URL="${SITE_URL:?需设置 SITE_URL，如 sc-domain:seedpix.org}"
SITEMAP_URL="${SITEMAP_URL:-https://seedpix.org/sitemap.xml}"

if [ -z "${NODE_BIN:-}" ]; then
  for NB in "/Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node" "/opt/homebrew/bin/node" "$(command -v node)"; do
    [ -n "$NB" ] && [ -x "$NB" ] && NODE_BIN="$NB" && break
  done
fi
: "${NODE_BIN:?未找到 node}"
PROXY="${PROXY:-http://127.0.0.1:7897}"

# 只取一次 token，循环复用（assertion 较长，用变量传参，不要走 xargs）
ASSERTION=$("$NODE_BIN" -e '
const fs=require("fs"),crypto=require("crypto");
const key=JSON.parse(fs.readFileSync(process.argv[1],"utf8"));
const now=Math.floor(Date.now()/1e3);
const b64=o=>Buffer.from(JSON.stringify(o)).toString("base64url");
const jwt=`${b64({alg:"RS256",typ:"JWT"})}.${b64({iss:key.client_email,scope:"https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/webmasters",aud:"https://oauth2.googleapis.com/token",iat:now,exp:now+3600})}`;
process.stdout.write(`${jwt}.${crypto.sign("RSA-SHA256",jwt,key.private_key).toString("base64url")}`);
' "$KEY_FILE")

TOKEN=$(curl -s --max-time 20 -x "$PROXY" "https://oauth2.googleapis.com/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
  --data-urlencode "assertion=$ASSERTION" | \
  "$NODE_BIN" -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);if(!j.access_token){console.error("TOKEN_ERROR");process.exit(1)}console.log(j.access_token)})')

[ -z "$TOKEN" ] && { echo "取 token 失败"; exit 1; }

URLS=$(curl -s --max-time 20 -x "$PROXY" "$SITEMAP_URL" | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g')
TOTAL=$(echo "$URLS" | wc -l | tr -d ' ')
echo "站点: $SITE_URL  |  sitemap: $SITEMAP_URL  |  共 $TOTAL 个 URL"
echo "------------------------------------------------------------"

IDX=0; UNK=0; OTHER=0
while read -r u; do
  [ -z "$u" ] && continue
  st=$(curl -s --max-time 25 -x "$PROXY" -X POST \
    "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect" \
    -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    --data-raw "{\"inspectionUrl\":\"$u\",\"siteUrl\":\"$SITE_URL\"}" | \
    "$NODE_BIN" -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);const r=j.inspectionResult||{};console.log((r.indexStatusResult||{}).coverageState||"n/a")}catch(e){console.log("ERR")}})')
  case "$st" in
    "Submitted and indexed"|"Indexed, though blocked by robots.txt"*) IDX=$((IDX+1));;
    "URL is unknown to Google") UNK=$((UNK+1));;
    *) OTHER=$((OTHER+1));;
  esac
  printf "%-46s %s\n" "$(echo "$u" | sed 's|https://seedpix.org||')" "$st"
done <<< "$URLS"

echo "------------------------------------------------------------"
echo "已收录: $IDX  |  未知(未抓取): $UNK  |  其他: $OTHER  / 共 $TOTAL"
