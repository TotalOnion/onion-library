import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import {globSync} from 'glob';
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

const dynamicEntryPoints = globSync(`${themePath}/assets/js/blocks/*.js`)
	.map((path) => {
		const assetKey = path
			.replace('assets/js/blocks/', '')
			.replace('.js', '');
		return assetKey;
	});
const assetArray = dynamicEntryPoints.map((entry) => {
	return { assetKey: entry };
});

const jsAssetsFilePath = path.join(themePath, 'assets/js/modules/jsAssets.js'); // Create the absolute path to the destination file

// Create directories if they don't exist
const dirPath = path.dirname(jsAssetsFilePath);
fs.mkdirSync(dirPath, { recursive: true });

const data = `// This file is auto-generated. To include assets for the lazyloader, just add your .js file to Assets/js/blocks/ and it will be included here.
const dynamicAssets = ${JSON.stringify(assetArray)};
const api = {
    dynamicAssets,
};
export default api;`;

fs.writeFileSync(jsAssetsFilePath, data);