import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {globSync} from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';
const srcPathSeoExtras = `${themePath}/inc/seo-extras`;

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
