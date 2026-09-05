#!/usr/bin/env bash
# 通过 IndexNow 向 Bing / Yandex / Seznam / Yep 提交 seedpix.org 的所有 URL
# 用法: bash scripts/submit-indexnow.sh
# 前置: public/<KEY>.txt 已部署到站点根目录（部署后可通过 https://seedpix.org/<KEY>.txt 访问）
set -euo pipefail

HOST="seedpix.org"
KEY="b0eab65a4812417e85697d303303f6f0"
SITEMAP="https://$HOST/sitemap.xml"
ENDPOINT="https://api.indexnow.org/indexnow"
PROXY="${HTTP_PROXY:-http://127.0.0.1:7897}"
CURL_PROXY=()
if curl -s --max-time 8 -o /dev/null "$SITEMAP" 2>/dev/null; then :; fi
# 探测是否直连可达，否则走代理
if ! curl -s --max-time 8 -o /dev/null "$SITEMAP" 2>/dev/null; then
  CURL_PROXY=(-x "$PROXY")
fi

echo "═══ 拉取 sitemap: $SITEMAP ═══"
SITEMAP_XML=$(curl -s --max-time 30 "${CURL_PROXY[@]}" "$SITEMAP")
URL_COUNT=$(printf '%s' "$SITEMAP_XML" | grep -o '<loc>' | wc -l | tr -d ' ')
echo "sitemap 中 URL 数: $URL_COUNT"

# 校验 key 文件可访问（IndexNow 提交前必查）
KEY_URL="https://$HOST/$KEY.txt"
KEY_BODY=$(curl -s --max-time 20 "${CURL_PROXY[@]}" "$KEY_URL")
if [ "$KEY_BODY" = "$KEY" ]; then
  echo "✅ key 文件可访问且匹配: $KEY_URL"
else
  echo "❌ key 文件未就绪（部署可能未完成）: $KEY_URL"
  echo "   期望内容: $KEY | 实际: ${KEY_BODY:0:20}..."
  exit 1
fi

# 组装 urlList JSON
URL_JSON=$(printf '%s' "$SITEMAP_XML" | grep -oP '(?<=<loc>)[^<]+' | python3 -c 'import sys,json; print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))')
PAYLOAD=$(python3 -c "import json,sys; print(json.dumps({'host':'$HOST','key':'$KEY','urlList':json.loads('''$URL_JSON''')}))")

echo "═══ POST 到 IndexNow: $ENDPOINT ═══"
curl -s --max-time 30 "${CURL_PROXY[@]}" -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  -w "\nHTTP %{http_code}\n"
echo "完成。"
