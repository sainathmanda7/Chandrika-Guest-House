const fs = require('fs');
const path = require('path');

const srcDir = './components';
const homeDir = './components/home';
const outDir = './components_refactored';

// Read all components
const components = {};

function readFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            readFiles(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            components[file.replace('.tsx', '')] = content;
        }
    }
}
readFiles(srcDir);

fs.writeFileSync('components_dump.json', JSON.stringify(components, null, 2));
console.log('Dumped to components_dump.json');
