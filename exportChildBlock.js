require('dotenv').config();
const fs = require('fs');
const {globSync} = require('glob');
const yargs = require('yargs');
const compressing = require('compressing');
const templateOptions = yargs.argv._;
const themePath =
	process.env.THEME_PATH || 'web/wp-content/themes/global-theme';
// const srcPathJs = `${themePath}/assets/js/blocks/`;
// const srcPathScss = `${themePath}/assets/scss/blocks/`;
const srcPathTwig = `${themePath}/views/blocks/`;
const srcPathPhp = `${themePath}/inc/acf-blocks/`;
// const srcPathVue = `${themePath}/assets/vue/blocks/`;
const destPath = '../../../../exported-blocks/';
const destinationProject = templateOptions[1];

const dynamicEntryPointsJs = globSync(`${themePath}/assets/js/blocks/*.js`).map(
	(path) => {
		const assetKey = path
			.replace('assets/js/blocks/', '')
			.replace('.js', '');
		return assetKey;
	}
);

const compressDone = () => {
	fs.rmSync(`../../../../exported-blocks/${blockName}`, {recursive: true});
	if (!destinationProject) {
		return;
	}
	if (fs.existsSync(`../${destinationProject}/exported-blocks/`)) {
		fs.copyFileSync(
			`../../../../exported-blocks/${blockName}.zip`,
			`.../../../.././${destinationProject}/exported-blocks/${blockName}.zip`
		);
	} else {
		console.log('the destination does not exist!');
	}
};

function copyBlockJson(blockName) {
	const existingAcfFiles = globSync(`${themePath}/acf-json/*.json`).map(
		(path) => {
			const assetKey = path.replace('assets/js/blocks/', '');
			return assetKey;
		}
	);

	existingAcfFiles.forEach((file, index) => {
		let rawdata = fs.readFileSync(file);
		let blockData = JSON.parse(rawdata);
		const title = blockData.title
			.toLowerCase()
			.replace('pattern block: ', '')
			.replace(' - Library', '')
			.replaceAll(' ', '-');
		if (title === blockName) {
			const fileName = existingAcfFiles[index].replace(`acf-json/`, '');
			fs.copyFileSync(
				existingAcfFiles[index],
				`../../../../exported-blocks/${blockName}/${fileName}`
			);
			return;
		}
	});
}

const handleError = (err) => console.error(err);
const blockName = templateOptions[0];

if (blockName) {
	const dir = `${destPath}${blockName}/`;

	if (fs.existsSync(dir)) {
		fs.rmSync(dir, {recursive: true});
	}
	fs.mkdirSync(dir);
	// fs.copyFileSync(`${srcPathJs}${blockName}.js`, `${dir}${blockName}.js`);
	// fs.copyFileSync(
	// 	`${srcPathScss}${blockName}.scss`,
	// 	`${dir}${blockName}.scss`
	// );
	fs.copyFileSync(
		`${srcPathTwig}${blockName}.twig`,
		`${dir}${blockName}.twig`
	);
	fs.copyFileSync(`${srcPathPhp}${blockName}.php`, `${dir}${blockName}.php`);
	// if (fs.existsSync(`${srcPathVue}${blockName}.vue`)) {
	// 	fs.copyFileSync(
	// 		`${srcPathVue}${blockName}.vue`,
	// 		`${dir}${blockName}.vue`
	// 	);
	// }
	copyBlockJson(blockName);
	compressing.zip
		.compressDir(
			`../../../../exported-blocks/${blockName}`,
			`../../../../exported-blocks/${blockName}.zip`
		)
		.then(compressDone)
		.catch(handleError);
}
