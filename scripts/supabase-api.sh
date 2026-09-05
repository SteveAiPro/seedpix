#!/bin/zsh
# Supabase Management API 封装 — 项目/数据库/Auth 运维走 API，不再点浏览器
# 用法: source 本文件后调用 sb_* 函数，或直接 bash supabase-api.sh <cmd>
#
# 凭证来源: .env.local 的 SUPABASE_PAT（Personal Access Token，sbp_ 开头）
# 文档: https://supabase.com/docs/reference/api/introduction

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env.local"

if [ -f "$ENV_FILE" ]; then
  export SUPABASE_PAT=$(grep "^SUPABASE_PAT=" "$ENV_FILE" | cut -d= -f2-)
fi

: "${SUPABASE_PAT:?请在 .env.local 设置 SUPABASE_PAT}"

BASE="https://api.supabase.com/v1"
PROJECT_REF="${SUPABASE_PROJECT_REF:-phozsgaqapencopamfhk}"

sb_curl() {
  curl -s --max-time 30 "$BASE$1" \
    -H "Authorization: Bearer $SUPABASE_PAT" \
    ${2:+-X "$2"} ${3:+--data "$3"} ${4:+-H "Content-Type: application/json"}
}

# 项目列表
sb_projects() {
  sb_curl "/projects"
}

# 项目详情
sb_project() {
  sb_curl "/projects/$PROJECT_REF"
}

# 执行 SQL（schema.sql / 迁移）
# 用法: sb_sql "$(cat supabase/schema.sql)"
sb_sql() {
  local sql="$1"
  local payload="{\"query\":$(/Users/crazy/.workbuddy/binaries/node/versions/22.22.2-2/bin/node -e "console.log(JSON.stringify(process.argv[1]))" "$sql")}"
  sb_curl "/projects/$PROJECT_REF/database/migrations" POST "$payload"
}

# Auth URL 配置（Site URL + Redirect URLs）
sb_auth_url_config() {
  sb_curl "/projects/$PROJECT_REF/config/auth"
}

# 查询表数据（需 service_role，走 REST）— 便捷包装
sb_query() {
  local table="$1"
  local sr=$(grep "^SUPABASE_SERVICE_ROLE_KEY=" "$ENV_FILE" | cut -d= -f2-)
  local url=$(grep "^NEXT_PUBLIC_SUPABASE_URL=" "$ENV_FILE" | cut -d= -f2-)
  curl -s --max-time 15 "$url/rest/v1/$table?select=*&limit=10" \
    -H "apikey: $sr" -H "Authorization: Bearer $sr"
}

case "${1:-}" in
  projects) sb_projects ;;
  project) sb_project ;;
  sql) sb_sql "$2" ;;
  auth-url) sb_auth_url_config ;;
  query) sb_query "$2" ;;
  *) echo "用法: supabase-api.sh {projects|project|sql '<sql>'|auth-url|query <table>}" ;;
esac
