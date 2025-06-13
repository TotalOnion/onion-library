require('dotenv').config();
const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
// entry points 
const args = yargs.argv;
const componentOptions = args._;
const entryPointName = componentOptions[0];
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';
const srcPathEntryPoint = `${themePath}/views/entry-points`;
const destPathEntryPoints = path.join(__dirname, `../../../../../../../../cbl-component-library/components/entrypoint-${entryPointName}`);

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

if (componentOptions.length === 0) {
    console.error(`${icons.CROSS_MARK} No entry point specified.`);
    process.exit(1);
}



copySpecifiedEntryPoint(entryPointName);

function copySpecifiedEntryPoint(entryPointName) {
    const entryPointSrcFile = path.join(srcPathEntryPoint, `${entryPointName}.twig`);
    const entryPointDestFile = path.join(destPathEntryPoints, `${entryPointName}.twig`);

    if (fs.existsSync(entryPointSrcFile)) {
        try {
            if (!fs.existsSync(destPathEntryPoints)) {
                fs.mkdirSync(destPathEntryPoints, { recursive: true });
            }
            fs.copyFileSync(entryPointSrcFile, entryPointDestFile);
            console.log(`${icons.SMILE} Successfully copied entry point file: ${entryPointName}.twig`);
        } catch (error) {
            console.error(`${icons.CROSS_MARK} Error copying entry point file: ${error.message}`);
        }
    } else {
        console.error(`${icons.CROSS_MARK} Entry point file does not exist: ${entryPointSrcFile}`);
	}
}