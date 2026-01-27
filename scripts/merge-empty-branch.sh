#!/usr/bin/env bash
set -euo pipefail

EMPTY_BRANCH=${1:-}
TARGET_BRANCH=${2:-main}

if [[ -z "$EMPTY_BRANCH" ]]; then
  echo "Usage: $0 <empty-branch> [target-branch]"
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: not inside a git repository."
  exit 1
fi

git fetch --all --prune >/dev/null 2>&1 || true

if ! git show-ref --verify --quiet "refs/heads/${EMPTY_BRANCH}"; then
  if git show-ref --verify --quiet "refs/remotes/origin/${EMPTY_BRANCH}"; then
    git checkout -b "${EMPTY_BRANCH}" "origin/${EMPTY_BRANCH}"
  else
    echo "Error: branch '${EMPTY_BRANCH}' not found."
    exit 1
  fi
else
  git checkout "${EMPTY_BRANCH}"
fi

if ! git rev-parse --verify "${EMPTY_BRANCH}^{commit}" >/dev/null 2>&1; then
  git commit --allow-empty -m "chore: seed empty branch for merge"
fi

if git show-ref --verify --quiet "refs/heads/${TARGET_BRANCH}"; then
  git checkout "${TARGET_BRANCH}"
else
  if git show-ref --verify --quiet "refs/remotes/origin/${TARGET_BRANCH}"; then
    git checkout -b "${TARGET_BRANCH}" "origin/${TARGET_BRANCH}"
  else
    echo "Error: target branch '${TARGET_BRANCH}' not found."
    exit 1
  fi
fi

if git merge-base --is-ancestor "${EMPTY_BRANCH}" "${TARGET_BRANCH}" >/dev/null 2>&1; then
  git checkout "${EMPTY_BRANCH}"
  git commit --allow-empty -m "chore: placeholder commit to enable merge"
  git checkout "${TARGET_BRANCH}"
fi

if git merge --no-ff --allow-unrelated-histories "${EMPTY_BRANCH}"; then
  echo "Merged '${EMPTY_BRANCH}' into '${TARGET_BRANCH}'."
else
  echo "Merge failed; resolve conflicts then commit."
  exit 1
fi
