#!/bin/bash

# Exit the script if a command fails
set -e

function info {
    echo "[-] $1"
}

function help {
    info "Usage: $  deploy-doc.sh <commit message>"
    info "Example:"
    info "  $ deploy-doc.sh \"Deploy documentation to gh-pages\""
}

if [ "$1" == "-h" ] ; then
    help
    exit 0
fi

gitmessage="${1:-Deploy documentation to gh-pages}"
cwd=$(pwd)
project_name=${PWD##*/}

info "Deloying the documentation to the GH pages from $cwd (project name is $project_name)"

info "Building documentation..."
npm run demo:build:prod

info "Copying the doc folder to /tmp"
rm -rf /tmp/angular-datatables-demo
cp -r dist/demo /tmp/angular-datatables-demo
cd /tmp/angular-datatables-demo

info "Copying project to /tmp and switch to gh-pages branch"
rm -rf /tmp/$project_name
cp -r $cwd /tmp
cd /tmp/$project_name
git add -A && git stash
git checkout gh-pages
git fetch && git reset --hard origin/gh-pages

info "Remove all files except .git"
rm -rf * .angular .vscode

info "Copy the doc to the gh-pages branch"
cp -r /tmp/angular-datatables-demo/* /tmp/$project_name

info "Commit gh-pages"
cd /tmp/$project_name
git add -A && git commit -m "$gitmessage"

info "Pushing to remote"
git push -u origin gh-pages

info "Removing tmp folders"
rm -rf /tmp/$project_name
rm -rf /tmp/angular-datatables-demo

info "Github Pages deployed SUCCESSFULLY!!!"

exit 0
