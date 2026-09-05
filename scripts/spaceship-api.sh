#!/bin/zsh
# Spaceship API 封装 — 域名 / DNS 运维走 API，不再点浏览器
# 用法: source 本文件后调用 ss_* 函数，或直接 bash spaceship-api.sh <cmd>
#
# 凭证来源: .env.local 的 SPACESHIP_API_KEY / SPACESHIP_API_SECRET
# 文档: https://docs.spaceship.dev

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env.local"

if [ -f "$ENV_FILE" ]; then
  export SPACESHIP_API_KEY=$(grep "^SPACESHIP_API_KEY=" "$ENV_FILE" | cut -d= -f2-)
  export SPACESHIP_API_SECRET=$(grep "^SPACESHIP_API_SECRET=" "$ENV_FILE" | cut -d= -f2-)
fi

: "${SPACESHIP_API_KEY:?请在 .env.local 设置 SPACESHIP_API_KEY}"
: "${SPACESHIP_API_SECRET:?请在 .env.local 设置 SPACESHIP_API_SECRET}"

BASE="https://spaceship.dev/api/v1"

ss_curl() {
  curl -s --max-time 30 "$BASE$1" \
    -H "X-Api-Key: $SPACESHIP_API_KEY" \
    -H "X-Api-Secret: $SPACESHIP_API_SECRET" \
    ${2:+-X "$2"} ${3:+--data "$3"}
}

# 域名列表
ss_domains() {
  ss_curl "/domains?take=100&skip=0"
}

# 查单个域名详情（含 nameservers / 到期 / 隐私）
ss_domain() {
  ss_curl "/domains/$1"
}

# 查域名是否可注册
ss_available() {
  ss_curl "/domains/$1/available"
}

# 更新 nameservers（provider: basic/vercel/cloudflare...）
ss_nameservers() {
  ss_curl "/domains/$1/nameservers" PUT "{\"provider\":\"$2\",\"hosts\":$3}"
}

# 更新自动续费
ss_autorenew() {
  ss_curl "/domains/$1/autorenew" PUT "{\"isEnabled\":$2}"
}

# DNS 记录列表（端点待文档确认，权限 dnsrecords:read 已启用）
ss_dns_list() {
  echo "DNS records 端点未公开文档化，暂用 /domains/$1/dns-records 尝试" >&2
  ss_curl "/domains/$1/dns-records?take=100&skip=0"
}

case "${1:-}" in
  domains) ss_domains ;;
  domain) ss_domain "$2" ;;
  available) ss_available "$2" ;;
  nameservers) ss_nameservers "$2" "$3" "$4" ;;
  autorenew) ss_autorenew "$2" "$3" ;;
  dns) ss_dns_list "$2" ;;
  *) echo "用法: spaceship-api.sh {domains|domain <d>|available <d>|nameservers <d> <provider> <hosts-json>|autorenew <d> <true|false>|dns <d>}" ;;
esac
