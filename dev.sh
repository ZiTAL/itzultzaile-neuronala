#!/bin/bash
git pull
npx tailwindcss -i ./src/styles/input.scss -o ./dist/style.css
cp ./src/img/github.png ./dist/github.png
npm run dev