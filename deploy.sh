#!/bin/bash

# This script deploys the built site to GitHub Pages

# Ensure we're in the project directory
cd "$(dirname "$0")"

# Check if the dist directory exists
if [ ! -d "dist" ]; then
    echo "Error: 'dist' directory not found. Run 'npm run build' first."
    exit 1
fi

# Create a temporary directory
TEMP_DIR=$(mktemp -d)
echo "Created temp directory: $TEMP_DIR"

# Copy the built files to the temporary directory
cp -r dist/* "$TEMP_DIR"
cp .nojekyll "$TEMP_DIR" 2>/dev/null || touch "$TEMP_DIR/.nojekyll"

# Switch to gh-pages branch or create it if it doesn't exist
if git show-ref --quiet refs/heads/gh-pages; then
    git checkout gh-pages
else
    git checkout --orphan gh-pages
    git rm -rf . > /dev/null
    echo "# GitHub Pages Branch" > README.md
    git add README.md
    git commit -m "Initial gh-pages commit"
fi

# Remove all files except .git
find . -maxdepth 1 -not -path "./.git" -not -path "." -exec rm -rf {} \;

# Copy the built files from the temporary directory
cp -r "$TEMP_DIR"/* .
touch .nojekyll

# Add all files and commit
git add .
git commit -m "Deploy website - $(date)"

# Push to GitHub
git push -u origin gh-pages

# Clean up: remove the temporary directory and switch back to main branch
rm -rf "$TEMP_DIR"
git checkout main

echo "Deployment complete!"
