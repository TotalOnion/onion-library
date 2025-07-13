require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';
const srcPathSeoExtras = `${themePath}/inc/seo-extras`;

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

if (!fs.existsSync(`${srcPathSeoExtras}`)) {
	console.error(`${icons.CROSS_MARK} Please check the library component path.`);
	process.exit(1);
}

function getSeoExtraFiles(){
	const seoExtraFiles = [];
  globSync(`${themePath}/inc/seo-extras/*.php`)
    .map((path) => {
      const assetKey = path
        .replace('inc/seo-extras/', '')
        .replace('.php', '');
      seoExtraFiles.push(assetKey);
  });
  return seoExtraFiles
}
const seoFileList = getSeoExtraFiles()

seoFileList.forEach(seoFile => {
  const destPathSeoExtraFiles = path.join(__dirname, `../../../../../../../../onion-library/components/seo-${seoFile}`);
  const seoExtraSrcFile = path.join(srcPathSeoExtras, `${seoFile}.php`);
  const seoExtraDestFile = path.join(destPathSeoExtraFiles, `${seoFile}.php`);
  copySeoExtraFile(seoExtraSrcFile, seoExtraDestFile, seoFile, destPathSeoExtraFiles)
})

function copySeoExtraFile(seoExtraSrcFile, seoExtraDestFile, seoFile, destPathSeoExtraFiles) {
  if(fs.existsSync(seoExtraSrcFile)){
    try {
      if(!fs.existsSync(destPathSeoExtraFiles)){
        fs.mkdirSync(destPathSeoExtraFiles, {recursive: true})
        fs.copyFileSync(seoExtraSrcFile, seoExtraDestFile)
        console.log(`${icons.SMILE} Successfully created and copied SEO Extra file: ${seoFile}.php`);
      } else {
        fs.copyFileSync(seoExtraSrcFile, seoExtraDestFile)
        console.log(`${icons.SMILE} Successfully copied SEO Extra file: ${seoFile}.php`);
      }
    } catch (error) {
      console.error(`${icons.CROSS_MARK} Error copying SEO Extra file: ${error.message}`);
    }
  } else {
    console.error(`${icons.CROSS_MARK} SEO Extra file does not exist: ${seoExtraSrcFile}`);
  }
}
