require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';
const srcPathCustomCaches = `${themePath}/inc/custom-caches`;

const bColors = {
	HEADER: '\033[95m',
	OKBLUE: '\033[94m',
	OKGREEN: '\033[92m',
	WARNING: '\033[93m',
	FAIL: '\033[91m',
	ENDC: '\033[0m',
	BOLD: '\033[1m',
	UNDERLINE: '\033[4m',
	ORANGE: '\033[93m',
	MAGENTA: '\033[95m',
	CYAN: '\033[96m'
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
  const destPathCustomCaches = path.join(__dirname, `../../../../../../../../cbl-component-library/components/${customCache}`);
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
