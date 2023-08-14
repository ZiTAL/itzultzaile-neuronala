#!/bin/bash
git pull
cp ./src/img/github.png ./dist/github.png
npx tailwindcss -i ./src/styles/main.scss -o ./dist/style.css
npm run build