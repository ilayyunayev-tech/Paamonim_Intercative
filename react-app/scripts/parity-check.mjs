import fs from 'node:fs';

const root = 'c:/Users/ilaya/Desktop/פעמונים/PAAMONIM';
const src = fs.readFileSync(`${root}/index.html`, 'utf8');
const markup = fs.readFileSync(`${root}/react-app/public/legacy/markup.html`, 'utf8');
const bodyMatch = src.match(/<body>([\s\S]*?)<script src="\.\/assets\/ikigai-personality\.js"><\/script>/);
const body = bodyMatch?.[1] ?? '';

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const words = (s) => (s.match(/\S+/g) || []).length;

console.log('body_chars', body.length);
console.log('markup_chars', markup.length);
console.log('normalized_equal', norm(body) === norm(markup));
console.log('body_words', words(body));
console.log('markup_words', words(markup));
