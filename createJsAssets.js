const fs = require('fs');
const path = require('path');
const {globSync} = require('glob');

const dynamicEntryPoints = globSync(`./components/block-*/*.js`).map(
	(filePath) => {
		const assetKey = path.basename(filePath, '.js');
		return assetKey;
	}
);
const assetArray = dynamicEntryPoints.map((entry) => {
	return {assetKey: entry};
});

const jsAssetsFilePath = './jsAssets.mjs';

// Create directories if they don't exist
const dirPath = path.dirname(jsAssetsFilePath);
fs.mkdirSync(dirPath, {recursive: true});

const data = `
const dynamicAssets = ${JSON.stringify(assetArray)};
const api = {dynamicAssets};
export default api;
`;

fs.writeFileSync(jsAssetsFilePath, data);
