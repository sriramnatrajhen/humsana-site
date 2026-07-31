#!/usr/bin/env bash
# publish.sh  push the Humsana site to GitHub (run from inside the humsana-site folder).
set -euo pipefail

REMOTE="git@github.com:sriramnatrajhen/humsana-site.git"   # switch to https://... if you don't use SSH
BRANCH="main"

echo "==> Files that will be published:"
ls -1

if [ ! -d .git ]; then
  git init -q -b "$BRANCH"
  git remote add origin "$REMOTE"
else
  git remote set-url origin "$REMOTE" 2>/dev/null || git remote add origin "$REMOTE"
fi

git add -A
git commit -q -m "Publish Humsana site" || echo "(nothing new to commit)"
git branch -M "$BRANCH"
git push -u origin "$BRANCH"

echo "==> Pushed. Next: GitHub > Settings > Pages > Source: main / root."
