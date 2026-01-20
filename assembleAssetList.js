const fs = require('fs');
const path = require('path');
const {globSync} = require('glob');

const dynamicEntryPointsJs = globSync(`./components/block-*/*-v3.js`).map(
	(filePath) => {
		const assetKey = path.basename(filePath, '.js');
		return assetKey;
	}
);
const dynamicEntryPointsJsV4 = globSync(`./components/block-*/*-v4.js`).map(
	(filePath) => {
		const assetKey = path.basename(filePath, '.js');
		return assetKey;
	}
);
const dynamicEntryPointsScss = globSync(`./components/block-*/*-v3.scss`).map(
	(filePath) => {
		const assetKey = path.basename(filePath, '.js');
		return assetKey;
	}
);
const dynamicEntryPointsCss = globSync(`./components/block-*/*-v4.css`).map(
	(filePath) => {
		const assetKey = path.basename(filePath, '.js');
		return assetKey;
	}
);
const assetArrayJs = dynamicEntryPointsJs.map((entry) => {
	return `./components/block-${entry}/${entry}.js`;
});
const assetArrayJsV4 = dynamicEntryPointsJsV4.map((entry) => {
	return `./components/block-${entry}/${entry}.js`;
});

const assetArrayScss = dynamicEntryPointsScss.map((entry) => {
	let filename = entry.replace('.scss', '');
	return `./components/block-${filename}/${filename}.scss`;
});
const assetArrayCss = dynamicEntryPointsCss.map((entry) => {
	let filename = entry.replace('.css', '');
	return `./components/block-${filename}/${filename}.css`;
});

// Create the directory path for the target file
const jsModulePath = path.join('./public');
const jsAssetsFilePath = path.join(jsModulePath, 'assetList.mjs');

// Create directories if they don't exist
fs.mkdirSync(jsModulePath, {recursive: true});

// Write the initial content to the target file
fs.writeFileSync(jsAssetsFilePath, '// This file is auto-generated.\n');

// Create directories if they don't exist
const dirPath = path.dirname(jsAssetsFilePath);
fs.mkdirSync(dirPath, {recursive: true});

const data = `
const dynamicAssets = ${JSON.stringify([
	...assetArrayScss,
	...assetArrayCss,
	...assetArrayJs,
	...assetArrayJsV4
])};
export default dynamicAssets;
`;

fs.writeFileSync(jsAssetsFilePath, data);
