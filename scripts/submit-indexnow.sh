#!/usr/bin/env bash
# 通过 IndexNow 向 Bing / Yandex / Seznam / Yep 提交 seedpix.org 的所有 URL
# 用法: bash scripts/submit-indexnow.sh
# 前置: public/<KEY>.txt 已部署到站点根目录（部署后可通过 https://seedpix.org/<KEY>.txt 访问）
set -euo pipefail

HOST="seedpix.org"
KEY="b0eab65a4812417e85697d303303f6f0"
SITEMAP="https://$HOST/sitemap.xml"
ENDPOINT="https://api.indexnow.org/indexnow"
PROXY="http://127.0.0.1:7897"

# 探测直连是否可达；不可达则走代理
PROXY_FLAG=""
if ! curl -s --max-time 8 -o /dev/null "$SITEMAP" 2>/dev/null; then
  PROXY_FLAG="-x $PROXY"
fi

echo "═══ 拉取 sitemap: $SITEMAP ═══"
SITEMAP_XML=$(curl -s --max-time 30 $PROXY_FLAG "$SITEMAP")
URL_COUNT=$(printf '%s' "$SITEMAP_XML" | grep -o '<loc>' | wc -l | tr -d ' ')
echo "sitemap 中 URL 数: $URL_COUNT"

# 校验 key 文件可访问（IndexNow 提交前必查）
KEY_URL="https://$HOST/$KEY.txt"
KEY_BODY=$(curl -s --max-time 20 $PROXY_FLAG "$KEY_URL")
if [ "$KEY_BODY" = "$KEY" ]; then
  echo "✅ key 文件可访问且匹配: $KEY_URL"
else
  echo "❌ key 文件未就绪（部署可能未完成）: $KEY_URL"
  echo "   期望内容: $KEY | 实际: ${KEY_BODY:0:20}..."
  exit 1
fi

# 组装 urlList JSON（用 python 解析 XML，避免 BSD grep 不支持 -P）
URL_JSON=$(printf '%s' "$SITEMAP_XML" | python3 -c 'import sys,xml.etree.ElementTree as ET,json
try:
    root=ET.fromstring(sys.stdin.read())
except Exception as e:
    print("[]"); sys.exit(0)
ns="{http://www.sitemaps.org/schemas/sitemap/0.9}"
urls=[loc.text.strip() for loc in root.iter(f"{ns}loc") if loc.text]
print(json.dumps(urls))')
PAYLOAD=$(python3 -c "import json,sys; print(json.dumps({'host':'$HOST','key':'$KEY','urlList':json.loads('''$URL_JSON''')}))")

echo "═══ POST 到 IndexNow: $ENDPOINT ═══"
curl -s --max-time 30 $PROXY_FLAG -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  -w "\nHTTP %{http_code}\n"
echo "完成。"
