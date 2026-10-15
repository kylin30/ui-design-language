#!/usr/bin/env bash
# Usage: delete_feedback.sh <id>   (admin; service_role key)
D=/home/box/.config/ui-feedback; U=$(cat $D/url); K=$(cat $D/service)
curl -fsS -X DELETE "$U/rest/v1/feedback?id=eq.$1" -H "apikey: $K" -H "Authorization: Bearer $K" -H "Prefer: return=representation" | jq .
