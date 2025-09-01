require('dotenv').config();
const fs = require('fs');
const {globSync} = require('glob');
const path = require('path');
const themePath =
	process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

// Create the directory path for the target file
const scssModulePath = path.join(
	'./node_modules/@total_onion/onion-library/public'
);
const scssFilePath = path.join(scssModulePath, 'dynamicBlockScss-v3.scss');

// Create directories if they don't exist
fs.mkdirSync(scssModulePath, {recursive: true});

// Write the initial content to the target file
fs.writeFileSync(scssFilePath, '// This file is auto-generated.\n');

const dynamicEntryPoints = globSync(
	`${themePath}/node_modules/@total_onion/onion-library/components/block-*/*-v3.scss`
).map((path) => {
	const assetPath = path.replace('node_modules', 'NodeModules');
	return assetPath;
});

const stream = fs.createWriteStream(scssFilePath, {flags: 'a'});
dynamicEntryPoints.forEach((entry) => {
	stream.write(`@use '${entry}';\n`);
});
stream.end();
