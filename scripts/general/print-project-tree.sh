#!/bin/zsh
tree -I "$(grep -v '^#' .gitignore | grep -v '^$' | sed 's/^\///; s/\///g' | tr '\n' '|' | sed 's/|$//')" | sed 's/\xC2\xA0/ /g'
