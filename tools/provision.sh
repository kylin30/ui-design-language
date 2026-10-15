#!/usr/bin/env bash
# One-time: needs a Supabase personal access token in ~/.config/ui-feedback/pat (from supabase.com/dashboard/account/tokens).
set -euo pipefail
D=/home/box/.config/ui-feedback; PAT=$(cat $D/pat); A=https://api.supabase.com/v1
H=(-H "Authorization: Bearer $PAT" -H "Content-Type: application/json")
ORG=$(curl -fsS "${H[@]}" $A/organizations | jq -r '.[0].id')
if [ ! -s $D/ref ]; then
  PW=$(openssl rand -hex 16); echo "$PW" > $D/dbpass
  curl -fsS "${H[@]}" $A/projects -d "{\"name\":\"ui-feedback\",\"organization_id\":\"$ORG\",\"region\":\"ap-southeast-1\",\"db_pass\":\"$PW\"}" | jq -r .id > $D/ref
fi
REF=$(cat $D/ref)
until [ "$(curl -fsS "${H[@]}" $A/projects/$REF | jq -r .status)" = ACTIVE_HEALTHY ]; do sleep 10; done
curl -fsS "${H[@]}" $A/projects/$REF/database/query -d "$(jq -Rs '{query:.}' "$(dirname "$0")/schema.sql")" >/dev/null
KEYS=$(curl -fsS "${H[@]}" $A/projects/$REF/api-keys)
echo "https://$REF.supabase.co" > $D/url
echo "$KEYS" | jq -r '.[]|select(.name=="anon").api_key' > $D/anon
echo "$KEYS" | jq -r '.[]|select(.name=="service_role").api_key' > $D/service
chmod 600 $D/*
printf "window.UIFB_CONFIG={url:'%s',anonKey:'%s'};\n" "$(cat $D/url)" "$(cat $D/anon)" > "$(dirname "$0")/../assets/feedback-config.js"
echo "OK $REF"
