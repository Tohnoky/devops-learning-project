#!/bin/bash
set -e

BASE_URL="http://localhost:3000"

echo "=== Testing API Endpoints ==="
echo ""

echo "1. Testing GET /"
curl -s "$BASE_URL/" | jq
echo ""

echo "2. Testing GET /health"
curl -s "$BASE_URL/health" | jq
echo ""

echo "3. Testing GET /api/info"
curl -s "$BASE_URL/api/info" | jq
echo ""

echo "4. Testing non-existent endpoint (should return 404)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/nonexistent")
echo "Status code: $STATUS"
if [[ "$STATUS" == "404" ]]; then
    echo "✓ Correctly returns 404"
else
    echo "✗ Expected 404, got $STATUS"
fi
echo ""

echo "=== All tests completed ==="
