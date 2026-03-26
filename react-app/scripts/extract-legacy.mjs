import fs from 'node:fs';
import path from 'node:path';

const root = 'c:/Users/ilaya/Desktop/פעמונים/PAAMONIM';
const react = 'c:/Users/ilaya/Desktop/פעמונים/PAAMONIM/react-app';
const content = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
const bodyMatch = content.match(/<body>([\s\S]*?)<script src="\.\/assets\/ikigai-personality\.js"><\/script>/);
const scriptMatch = content.match(/<script src="\.\/assets\/ikigai-personality\.js"><\/script>\s*<script>([\s\S]*?)<\/script>\s*<\/body>/);

fs.mkdirSync(path.join(react, 'public', 'legacy'), { recursive: true });
fs.writeFileSync(path.join(react, 'src', 'legacy.css'), styleMatch?.[1] ?? '', 'utf8');
fs.writeFileSync(path.join(react, 'public', 'legacy', 'markup.html'), bodyMatch?.[1] ?? '', 'utf8');
fs.writeFileSync(path.join(react, 'public', 'legacy', 'legacy-app.js'), scriptMatch?.[1] ?? '', 'utf8');
