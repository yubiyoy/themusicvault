// Statistics about the repo - Node.js based
// find Java, JS and CSS files and read file size in SLOC and KB

const fs = require('fs');
const path = require('path');
let sumSLOC, sumKB, fileCount;
let blankLines = 0, commentLines = 0;

let basePath = path.join(__dirname, '..', '..', '..', '..');
let files = fs.readdirSync(basePath, { recursive: true }).filter(x => !x.startsWith('target'));
logFormatted();
logFormatted('Java', 'SLOC', 'KB');
files.filter(x => x.endsWith('.java'))
  .map(x => stat(x, x.split('jacobsWebApp/')[1]));
logFormatted();
logFormatted('CSS', 'SLOC', 'KB');
files.filter(x => x.endsWith('.css')).filter(x => !x.includes('/libs/'))
  .map(x => stat(x, x.split('static/css/')[1]));
logFormatted();
logFormatted('JavaScript', 'SLOC', 'KB');
files.filter(x => x.endsWith('.js')).filter(x => !x.includes('/libs/'))
  .map(x => stat(x, x.split('static/js/')[1])).filter(x => x);
logFormatted();

console.log('\nBlank lines', blankLines, 'Comment lines:', commentLines);

function stat(filePath, niceName) {
  let content = fs.readFileSync(path.join(basePath, filePath), 'utf-8');
  if (niceName) {
    logFormatted(niceName, content.split('\n').length, (content.length / 1024).toFixed(1));
  }
  blankLines += content.split('\n').filter(x => !x.trim()).length;
  commentLines += content.split('\n').filter(x =>
    x.trim().startsWith('//') || x.trim().startsWith('/*')).length;
  return niceName;
}

function logFormatted(name = '', locs = '', kb = '') {
  if (!name && sumSLOC) { logFormatted('SUM, ' + fileCount + ' files:', Math.round(sumSLOC), Math.round(sumKB * 10) / 10); }
  if (!name) { sumSLOC = 0, sumKB = 0; fileCount = 0; }
  if (!isNaN(locs)) { sumSLOC += locs / 1; sumKB += kb / 1; fileCount++; }
  console.log(`${name.padEnd(50, ' ')}${(locs + '').padStart(4, ' ')}${(kb + '').padStart(8, ' ')}`);
}