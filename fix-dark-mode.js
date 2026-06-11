const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('apps/web/app').concat(walk('apps/web/components'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // Add dark:border-white/10 where border-oxblood/10 is used, if not already present
  newContent = newContent.replace(/border-oxblood\/10(?!\s+dark:border-white\/10)/g, 'border-oxblood/10 dark:border-white/10');
  
  // Add dark:bg-white/5 where bg-white is used, if it's not a CTA button/header element
  newContent = newContent.replace(/bg-white(?!\s+dark:bg-)(?! px-6 py-3 font-bold text-oxblood)/g, 'bg-white dark:bg-white/5');

  // Fix header.tsx specific bg-white issue where it replaced the top level header class
  if (file.endsWith('header.tsx')) {
      newContent = newContent.replace('bg-white dark:bg-white/5/90', 'bg-white/90');
      // Fix mobile menu background
      newContent = newContent.replace('bg-white dark:bg-white/5 dark:bg-ink', 'bg-white dark:bg-ink');
  }

  // Add dark:text-porcelain for text-ink
  // specifically for text-ink without a trailing slash
  newContent = newContent.replace(/text-ink(?!\/)(?!\s+dark:text-porcelain)/g, 'text-ink dark:text-porcelain');
  
  // for text-ink/XX
  newContent = newContent.replace(/text-ink\/(\d+)(?!\s+dark:text-porcelain)/g, 'text-ink/$1 dark:text-porcelain/$1');

  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    console.log('Updated ' + file);
  }
});
