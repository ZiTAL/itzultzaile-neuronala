#!/bin/bash
git pull
npm run build
cp ./src/img/github.png ./dist/github.png
npx tailwindcss -i ./src/styles/main.scss -o ./dist/style.css