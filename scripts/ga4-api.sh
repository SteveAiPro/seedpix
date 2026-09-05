#!/bin/bash
# GA4 (Google Analytics Data API v1beta) 封装 — 拉站内流量/事件数据，不再点浏览器
# 用法: bash ga4-api.sh {overview|pages|events|sources|realtime}
#
# 凭证: seedpix/.secrets/*.json (service account JSON key，需已在 GA4 property 授权)
# 文档: https://developers.google.com/analytics/devguides/reporting/data/v1

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
KEY_FILE=$(ls "$SCRIPT_DIR"/../.secrets/silken-vial-*.json 2>/dev/null | head -1)
: "${KEY_FILE:?未找到 .secrets/ 下的 service account JSON key}"

# GA4 property（seedpix = 552878947，whitebg = 549208290）
PROPERTY_ID="${GA4_PROPERTY_ID:-552878947}"
API="https://analyticsdata.googleapis.com/v1beta"
SCOPE="https://www.googleapis.com/auth/analytics.readonly"

get_token() {
  local assertion
  assertion=$(/Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e '
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
    /Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);if(!j.access_token){console.error("TOKEN_ERROR:",JSON.stringify(j));process.exit(1)}console.log(j.access_token)})'
}

ga4_query() {
  local token=$(get_token)
  local body="$1"
  curl -s --max-time 30 -x "http://127.0.0.1:7897" -X POST "$API/properties/$PROPERTY_ID:runReport" \
    -H "Authorization: Bearer $token" -H "Content-Type: application/json" \
    --data-raw "$body"
}

date_range() {
  local days="${1:-30}"
  local start=$(/Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e "const d=new Date(Date.now()-${days}*864e5);console.log(d.toISOString().slice(0,10))")
  local today=$(date +%Y-%m-%d)
  echo "{\"startDate\":\"$start\",\"endDate\":\"$today\"}"
}

fmt_rows() {
  /Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);if(j.error){console.error("API_ERROR:",j.error.message);process.exit(1)}
  const dims=(j.dimensionHeaders||[]).map(h=>h.name), mets=(j.metricHeaders||[]).map(h=>h.name);
  console.log("维度:",dims.join(","),"| 指标:",mets.join(","));
  console.log("-".repeat(60));
  (j.rows||[]).forEach(r=>{const d=r.dimensionValues.map(v=>v.value).join("\t");const m=r.metricValues.map(v=>v.value).join("\t");console.log(d+"\t"+m)});
  if(!(j.rows||[]).length)console.log("(无数据 — 站刚上线或还没埋点生效)");})'
}

case "${1:-}" in
  # 总览：用户/会话/浏览/事件数
  overview)
    ga4_query "{\"dateRanges\":[$(date_range 30)],\"metrics\":[{\"name\":\"totalUsers\"},{\"name\":\"sessions\"},{\"name\":\"screenPageViews\"},{\"name\":\"eventCount\"},{\"name\":\"engagementRate\"}]}" | fmt_rows
    ;;
  # 热门页面
  pages)
    ga4_query "{\"dateRanges\":[$(date_range 30)],\"dimensions\":[{\"name\":\"pagePath\"}],\"metrics\":[{\"name\":\"screenPageViews\"},{\"name\":\"totalUsers\"}],\"orderBys\":[{\"metric\":{\"metricName\":\"screenPageViews\"},\"desc\":true}],\"limit\":15}" | fmt_rows
    ;;
  # 事件统计
  events)
    ga4_query "{\"dateRanges\":[$(date_range 30)],\"dimensions\":[{\"name\":\"eventName\"}],\"metrics\":[{\"name\":\"eventCount\"},{\"name\":\"totalUsers\"}],\"orderBys\":[{\"metric\":{\"metricName\":\"eventCount\"},\"desc\":true}],\"limit\":15}" | fmt_rows
    ;;
  # 流量来源
  sources)
    ga4_query "{\"dateRanges\":[$(date_range 30)],\"dimensions\":[{\"name\":\"sessionDefaultChannelGroup\"}],\"metrics\":[{\"name\":\"sessions\"},{\"name\":\"totalUsers\"}],\"orderBys\":[{\"metric\":{\"metricName\":\"sessions\"},\"desc\":true}]}" | fmt_rows
    ;;
  # 实时（最近 30 分钟活跃用户）
  realtime)
    token=$(get_token)
    curl -s --max-time 30 -x "http://127.0.0.1:7897" -X POST "$API/properties/$PROPERTY_ID:runRealtimeReport" \
      -H "Authorization: Bearer $token" -H "Content-Type: application/json" \
      --data-raw '{"dimensions":[{"name":"unifiedScreenName"}],"metrics":[{"name":"activeUsers"}]}' | fmt_rows
    ;;
  *) echo "用法: ga4-api.sh {overview|pages|events|sources|realtime}" ;;
esac
