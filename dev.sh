#!/bin/bash
git pull
npx tailwindcss -i ./src/styles/input.scss -o ./dist/style.css
npm run dev