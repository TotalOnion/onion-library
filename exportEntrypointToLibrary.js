import 'dotenv/config';
import fs from 'node:fs';
import yargs from 'yargs/yargs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// entry points
const args = yargs(process.argv.slice(2)).argv;
const componentOptions = args._;
const entryPointName = componentOptions[0];
const themePath =
	process.env.THEME_PATH || 'web/wp-content/themes/global-theme';
const srcPathEntryPoint = `${themePath}/views/entry-points`;
const destPathEntryPoints = path.join(
	__dirname,
	`../../../../../../../../onion-library/components/entrypoint-${entryPointName}`
);

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

if (componentOptions.length === 0) {
	console.error(`${icons.CROSS_MARK} No entry point specified.`);
	process.exit(1);
}

copySpecifiedEntryPoint(entryPointName);

function copySpecifiedEntryPoint(entryPointName) {
	const entryPointSrcFile = path.join(
		srcPathEntryPoint,
		`${entryPointName}.twig`
	);
	const entryPointDestFile = path.join(
		destPathEntryPoints,
		`${entryPointName}.twig`
	);

	if (fs.existsSync(entryPointSrcFile)) {
		try {
			if (!fs.existsSync(destPathEntryPoints)) {
				fs.mkdirSync(destPathEntryPoints, {recursive: true});
			}
			fs.copyFileSync(entryPointSrcFile, entryPointDestFile);
			console.log(
				`${icons.SMILE} Successfully copied entry point file: ${entryPointName}.twig`
			);
		} catch (error) {
			console.error(
				`${icons.CROSS_MARK} Error copying entry point file: ${error.message}`
			);
		}
	} else {
		console.error(
			`${icons.CROSS_MARK} Entry point file does not exist: ${entryPointSrcFile}`
		);
	}
}
