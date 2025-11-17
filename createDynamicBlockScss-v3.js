require('dotenv').config();
const fs = require('fs');
const {globSync} = require('glob');
const path = require('path');

const scssModulePath = path.join('./public');
const scssFilePath = path.join(scssModulePath, 'dynamicBlockScss-v3.scss');

fs.mkdirSync(scssModulePath, {recursive: true});

// Write the initial content to the target file
fs.writeFileSync(scssFilePath, '// This file is auto-generated.\n');

const dynamicEntryPoints = globSync(`./components/block-*/*-v3.scss`).map(
	(path) => {
		console.log('🚀 ~ path:', path);
		const assetPath = path.replace('components/', '../components/');
		return assetPath;
	}
);

const stream = fs.createWriteStream(scssFilePath, {flags: 'a'});
dynamicEntryPoints.forEach((entry) => {
	stream.write(`@use '${entry}';\n`);
});
stream.end();
