const fs = require('fs');
const path = require('path');
const {globSync} = require('glob');

const dynamicEntryPoints = globSync(`./components/block-*/*-v{3,4}.js`).map(
	(filePath) => {
		const assetKey = path.basename(filePath, '.js');
		return assetKey;
	}
);
const assetArray = dynamicEntryPoints.map((entry) => {
	return {assetKey: entry};
});

// Create the directory path for the target file
const jsModulePath = path.join('./public');
const jsAssetsFilePath = path.join(jsModulePath, 'jsAssets.mjs');

// Create directories if they don't exist
fs.mkdirSync(jsModulePath, {recursive: true});

// Write the initial content to the target file
fs.writeFileSync(jsAssetsFilePath, '// This file is auto-generated.\n');

// Create directories if they don't exist
const dirPath = path.dirname(jsAssetsFilePath);
fs.mkdirSync(dirPath, {recursive: true});

const data = `
const dynamicAssets = ${JSON.stringify(assetArray)};
const api = {dynamicAssets};
export default api;
`;

fs.writeFileSync(jsAssetsFilePath, data);
