#!/bin/bash
# GA4 (Google Analytics Data API v1beta) 封装 — 拉站内流量/事件数据
# 通用版：供「新站上线五环节」使用，property/凭证从环境传入，不硬编码
#
# 用法:
#   GA4_PROPERTY_ID=123456789 bash ga4-api.sh overview
#   bash ga4-api.sh {overview|pages|events|sources|realtime}
#
# 凭证: <项目>/.secrets/*.json (service account JSON key，SA 需已在 GA4 property 加为查看者)
# 文档: https://developers.google.com/analytics/devguides/reporting/data/v1

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -n "${GA4_KEY_FILE:-}" ]; then
  KEY_FILE="$GA4_KEY_FILE"
else
  for d in "$SCRIPT_DIR/.." "$SCRIPT_DIR/../.." "$PWD"; do
    F=$(ls "$d"/.secrets/*.json 2>/dev/null | head -1)
    [ -n "$F" ] && KEY_FILE="$F" && break
  done
fi
: "${KEY_FILE:?未找到 service account JSON key（.secrets/ 下），或用 GA4_KEY_FILE 指定}"

: "${GA4_PROPERTY_ID:?需设置 GA4_PROPERTY_ID（GA4 后台地址栏 p 后面那串数字）}"
API="https://analyticsdata.googleapis.com/v1beta"
SCOPE="https://www.googleapis.com/auth/analytics.readonly"
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
const jwt = `${b64({alg:"RS256",typ:"JWT"})}.${b64({iss:key.client_email,scope:process.argv[2],aud:"https://oauth2.googleapis.com/token",iat:now,exp:now+3600})}`;
process.stdout.write(`${jwt}.${crypto.sign("RSA-SHA256", jwt, key.private_key).toString("base64url")}`);
' "$KEY_FILE" "$SCOPE")
  curl -s --max-time 20 -x "http://127.0.0.1:7897" \
    "https://oauth2.googleapis.com/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
    --data-urlencode "assertion=$assertion" | \
    "$NODE_BIN" -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);if(!j.access_token){console.error("TOKEN_ERROR:",JSON.stringify(j));process.exit(1)}console.log(j.access_token)})'
}

ga4_query() {
  local token=$(get_token)
  curl -s --max-time 30 -x "http://127.0.0.1:7897" -X POST "$API/properties/$GA4_PROPERTY_ID:runReport" \
    -H "Authorization: Bearer $token" -H "Content-Type: application/json" \
    --data-raw "$1"
}

date_range() {
  local days="${1:-30}"
  local start=$("$NODE_BIN" -e "const d=new Date(Date.now()-${days}*864e5);console.log(d.toISOString().slice(0,10))")
  local today=$(date +%Y-%m-%d)
  echo "{\"startDate\":\"$start\",\"endDate\":\"$today\"}"
}

fmt_rows() {
  "$NODE_BIN" -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);if(j.error){console.error("API_ERROR:",j.error.message);process.exit(1)}
  const dims=(j.dimensionHeaders||[]).map(h=>h.name), mets=(j.metricHeaders||[]).map(h=>h.name);
  console.log("维度:",dims.join(","),"| 指标:",mets.join(","));
  console.log("-".repeat(60));
  (j.rows||[]).forEach(r=>{const d=r.dimensionValues.map(v=>v.value).join("\t");const m=r.metricValues.map(v=>v.value).join("\t");console.log(d+"\t"+m)});
  if(!(j.rows||[]).length)console.log("(无数据 — 站刚上线，标准报告有 30-60 分钟延迟)");})'
}

case "${1:-}" in
  overview)
    ga4_query "{\"dateRanges\":[$(date_range 30)],\"metrics\":[{\"name\":\"totalUsers\"},{\"name\":\"sessions\"},{\"name\":\"screenPageViews\"},{\"name\":\"eventCount\"},{\"name\":\"engagementRate\"}]}" | fmt_rows
    ;;
  pages)
    ga4_query "{\"dateRanges\":[$(date_range 30)],\"dimensions\":[{\"name\":\"pagePath\"}],\"metrics\":[{\"name\":\"screenPageViews\"},{\"name\":\"totalUsers\"}],\"orderBys\":[{\"metric\":{\"metricName\":\"screenPageViews\"},\"desc\":true}],\"limit\":15}" | fmt_rows
    ;;
  events)
    ga4_query "{\"dateRanges\":[$(date_range 30)],\"dimensions\":[{\"name\":\"eventName\"}],\"metrics\":[{\"name\":\"eventCount\"},{\"name\":\"totalUsers\"}],\"orderBys\":[{\"metric\":{\"metricName\":\"eventCount\"},\"desc\":true}],\"limit\":15}" | fmt_rows
    ;;
  sources)
    ga4_query "{\"dateRanges\":[$(date_range 30)],\"dimensions\":[{\"name\":\"sessionDefaultChannelGroup\"}],\"metrics\":[{\"name\":\"sessions\"},{\"name\":\"totalUsers\"}],\"orderBys\":[{\"metric\":{\"metricName\":\"sessions\"},\"desc\":true}]}" | fmt_rows
    ;;
  realtime)
    token=$(get_token)
    curl -s --max-time 30 -x "http://127.0.0.1:7897" -X POST "$API/properties/$GA4_PROPERTY_ID:runRealtimeReport" \
      -H "Authorization: Bearer $token" -H "Content-Type: application/json" \
      --data-raw '{"dimensions":[{"name":"unifiedScreenName"}],"metrics":[{"name":"activeUsers"}]}' | fmt_rows
    ;;
  *) echo "用法: GA4_PROPERTY_ID=xxx ga4-api.sh {overview|pages|events|sources|realtime}" ;;
esac
