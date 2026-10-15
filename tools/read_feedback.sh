#!/usr/bin/env bash
# Usage: read_feedback.sh [round|all]   e.g. read_feedback.sh r1
D=/home/box/.config/ui-feedback; U=$(cat $D/url); K=$(cat $D/service)
Q='select=id,round,score,notes,page,created_at&order=created_at.asc'
[ "${1:-all}" != all ] && Q="$Q&round=eq.$1"
curl -fsS "$U/rest/v1/feedback?$Q" -H "apikey: $K" -H "Authorization: Bearer $K" | jq .
