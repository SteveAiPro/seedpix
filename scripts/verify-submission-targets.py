#!/usr/bin/env python3
"""
验证 SeedPix 外链导航站提交入口的连通性与可用性
"""

import urllib.request
import ssl
import sys

TARGETS = [
    ("Toolify.ai", "https://www.toolify.ai/submit"),
    ("Theres An AI For That", "https://theresanaiforthat.com/submit/"),
    ("Futurepedia", "https://www.futurepedia.io/submit-tool"),
    ("FutureTools", "https://www.futuretools.io/submit-a-tool"),
    ("TopAI.tools", "https://topai.tools/submit"),
    ("SaaSHub", "https://www.saashub.com/submit"),
    ("AI Valley", "https://aivalley.ai/submit"),
    ("Insidr AI", "https://www.insidr.ai/submit-tools/"),
    ("Easy With AI", "https://easywithai.com/submit-tool/"),
    ("BetaList", "https://betalist.com/submit"),
]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

print("=" * 60)
print(" SeedPix Backlink Directory Submission Targets Verification")
print("=" * 60)

for name, url in TARGETS:
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=8, context=ctx) as resp:
            status = resp.status
            print(f"[{status}] OK   - {name.ljust(24)} -> {url}")
    except Exception as e:
        print(f"[ERR] FAIL - {name.ljust(24)} -> {url} ({e})")

print("=" * 60)
print("Verification complete.")
