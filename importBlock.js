require('dotenv').config();
const fs = require('fs');
const { globSync } = require('glob');
const yargs = require('yargs');
const compressing = require('compressing');
const templateOptions = yargs.argv._;
const blockName = templateOptions[0];
const exportedFolder = '../../../../exported-blocks';
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

const existingBlocks = globSync(`${themePath}/assets/js/blocks/*.js`)
	.map((path) => {
		const assetKey = path
			.replace('assets/js/blocks/', '')
			.replace('.js', '');
		return assetKey;
	});

const handleError = (err) => console.error(err);

const decompressDone = () => {
	const dirs = {
		js: `${themePath}/assets/js/blocks`,
		scss: `${themePath}/assets/scss/blocks`,
		twig: `${themePath}/views/blocks`,
		php: `${themePath}/inc/acf-blocks`,
		json: `${themePath}/acf-json`,
		vue: `${themePath}/assets/vue/blocks`
	};

	for (const [key, dir] of Object.entries(dirs)) {
		if (key === 'json') {
			const files = fs.readdirSync(`${exportedFolder}/${blockName}`);
			const jsonFile = files.filter((file) => {
				if (file.search(/(.json)+/) !== -1) {
					return true;
				}
				return false;
			});
			if (!fs.existsSync(`${dir}/${jsonFile}`)) {
				console.log(`copying - ${jsonFile}`);
				fs.copyFileSync(
					`${exportedFolder}/${blockName}/${jsonFile}`,
					`${dir}/${jsonFile}`
				);
			} else {
				console.log(
					`Did not copy ${jsonFile} as there was already a json file with that name.`
				);
			}
		}
		if (!fs.existsSync(`${dir}/${blockName}.${key}`)) {
			if (
				fs.existsSync(
					`${exportedFolder}/${blockName}/${blockName}.${key}`
				)
			) {
				console.log(`copying - ${blockName}.${key}`);
				fs.copyFileSync(
					`${exportedFolder}/${blockName}/${blockName}.${key}`,
					`${dir}/${blockName}.${key}`
				);
			} else {
				console.log('no source file to copy');
			}
		} else {
			console.log(
				`Did not copy ${blockName}.${key} as there was already a file with that name.`
			);
		}
	}
	fs.rmdirSync(`${exportedFolder}/${blockName}`, {recursive: true});
};

if (!existingBlocks.includes(blockName)) {
	if (!blockName) {
		console.log('Aborting because of bad name!');
		return;
	}
	if (!fs.existsSync(`${exportedFolder}/${blockName}.zip`)) {
		console.log('Aborting as could not find the zip file');
		return;
	}
	compressing.zip
		.uncompress(`${exportedFolder}/${blockName}.zip`, `${exportedFolder}/`)
		.then(decompressDone)
		.catch(handleError);
} else {
	console.log('Aborting as this block was already listed');
}
