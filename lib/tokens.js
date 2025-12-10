// tokens.js

import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'tokens.json');

export function saveToken(tokenData) {
  let tokens = [];
  if (fs.existsSync(filePath)) {
    tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  tokens.push(tokenData);
  fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
}

export function getTokens() {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}