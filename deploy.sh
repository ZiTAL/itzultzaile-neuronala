#!/bin/bash
git pull
npm run build
npx tailwindcss -i ./src/styles/input.scss -o ./dist/style.css