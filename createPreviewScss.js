require('dotenv').config();
const fs = require('fs');
const {globSync} = require('glob');
const path = require('path');
const themePath =
	process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

// Create the directory path for the target file
const scssModulePath = path.join(themePath, 'assets/scss/modules');
const scssFilePath = path.join(scssModulePath, 'dynamicBlocksPreview.scss');

// Create directories if they don't exist
fs.mkdirSync(scssModulePath, {recursive: true});

// Write the initial content to the target file
fs.writeFileSync(
	scssFilePath,
	'// This file is auto-generated. To include assets for the lazyloader, just add your .scss file to Assets/scss/blocks/ and it will be included here.\n'
);

const dynamicEntryPoints = globSync(
	`${themePath}/assets/scss/blocks/*.scss`
).map((path) => {
	const assetPath = path.replace(
		'assets/scss/blocks/',
		'Assets/scss/blocks/'
	);
	return assetPath;
});

const stream = fs.createWriteStream(scssFilePath, {flags: 'a'});
dynamicEntryPoints.forEach((entry) => {
	stream.write(`@use '${entry}';\n`);
});
stream.end();
