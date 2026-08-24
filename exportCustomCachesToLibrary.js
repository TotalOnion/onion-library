import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {globSync} from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';
const srcPathCustomCaches = `${themePath}/inc/custom-caches`;

const bColors = {
	HEADER: '\u001b[95m',
	OKBLUE: '\u001b[94m',
	OKGREEN: '\u001b[92m',
	WARNING: '\u001b[93m',
	FAIL: '\u001b[91m',
	ENDC: '\u001b[0m',
	BOLD: '\u001b[1m',
	UNDERLINE: '\u001b[4m',
	ORANGE: '\u001b[93m',
	MAGENTA: '\u001b[95m',
	CYAN: '\u001b[96m'
};

const icons = {
	SMILE: '\uD83D\uDE00',
	BEER_MUG: '\uD83C\uDF7A',
	BEER_CHEERS: '\uD83C\uDF7B',
	CROWN: '\uD83D\uDC51',
	CLAP_HANDS: '\uD83D\uDC4F',
	CROSS_MARK: '\u274C'
};

if (!fs.existsSync(`${srcPathCustomCaches}`)) {
	console.error(`${icons.CROSS_MARK} Please check the library component path.`);
	process.exit(1);
}

function getCustomCacheFiles(){
	const customCacheFiles = [];
  globSync(`${themePath}/inc/custom-caches/*.php`)
    .map((path) => {
      const assetKey = path
        .replace('inc/custom-caches/', '')
        .replace('.php', '');
      customCacheFiles.push(assetKey);
  });
  return customCacheFiles
}
const customCacheList = getCustomCacheFiles()

customCacheList.forEach(customCache => {
  const destPathCustomCaches = path.join(__dirname, `../../../../../../../../onion-library/components/${customCache}`);
  const customCacheSrcFile = path.join(srcPathCustomCaches, `${customCache}.php`);
  const customCacheDestFile = path.join(destPathCustomCaches, `${customCache}.php`);
  copyCustomCache(customCacheSrcFile, customCacheDestFile, customCache, destPathCustomCaches)
})

function copyCustomCache(customCacheSrcFile, customCacheDestFile, customCache, destPathCustomCaches) {
  if(fs.existsSync(customCacheSrcFile)){
    try {
      if(!fs.existsSync(destPathCustomCaches)){
        fs.mkdirSync(destPathCustomCaches, {recursive: true})
        fs.copyFileSync(customCacheSrcFile, customCacheDestFile)
        console.log(`${icons.SMILE} Successfully created and copied custom cache file: ${customCache}.php`);
      } else {
        fs.copyFileSync(customCacheSrcFile, customCacheDestFile)
        console.log(`${icons.SMILE} Successfully copied custom cache file: ${customCache}.php`);
      }
    } catch (error) {
      console.error(`${icons.CROSS_MARK} Error copying custom cache file: ${error.message}`);
    }
  } else {
    console.error(`${icons.CROSS_MARK} Custom cache file does not exist: ${customCacheSrcFile}`);
  }
}
