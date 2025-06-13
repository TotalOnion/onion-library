require('dotenv').config();
const fs = require('fs');
const { globSync } = require('glob');
const yargs = require('yargs');
const path = require('path');
const compressing = require('compressing');
const templateOptions = yargs.argv._;
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';
const srcPathJs = `${themePath}/assets/js/blocks/`;
const srcPathScss = `${themePath}/assets/scss/blocks/`;
const srcPathTwig = `${themePath}/views/blocks/`;
const srcPathPhp = `${themePath}/inc/acf-blocks/`;
const srcPathVue = `${themePath}/assets/vue/blocks/`;
const destPath = path.join(__dirname, '../../../exported-blocks/');
const component_list_file = path.join(__dirname, '../../../project-components-list.json');
const destinationProject = templateOptions[0];
let blocks = [];

try {
	blocks = JSON.parse(fs.readFileSync(component_list_file, 'utf8'));
} catch (e) {
	console.error("Component list file error : " + e);
	return;
}

const dynamicEntryPointsJs = globSync(`${themePath}/assets/js/blocks/*.js`)
	.map((path) => {
		const assetKey = path
			.replace('assets/js/blocks/', '')
			.replace('.js', '');
		return assetKey;
	});

const compressDone = (name) => {
	if (!destinationProject) {
		return;
	}
	fs.rmSync(`../../../exported-blocks/${name}`, { recursive: true });
	if (fs.existsSync(`../${destinationProject}/exported-blocks/`)) {
		fs.copyFileSync(
			path.join(__dirname, `../../../exported-blocks/${name}.zip`),
			path.join(__dirname, `.../../.././${destinationProject}/exported-blocks/${name}.zip`)
		);
	} else {
		console.log('the destination does not exist!');
	}
};

function copyBlockJson(name) {
	const existingAcfFiles = globSync(`${themePath}/acf-json/*.json`)
		.map((path) => {
			const assetKey = path
				.replace('assets/js/blocks/', '');
			return assetKey;
		});

	existingAcfFiles.forEach((file, index) => {
		let rawdata = fs.readFileSync(file);
		let blockData = JSON.parse(rawdata);
		const title = blockData.title
			.replace('Block: ', '')
			.replace(' - Library', '')
			.replaceAll(' ', '-')
			.toLowerCase();
		if (title === name) {
			const fileName = existingAcfFiles[index].replace(
				`${themePath}/acf-json/`,
				''
			);
			fs.copyFileSync(
				existingAcfFiles[index],
				path.join(__dirname, `../../../exported-blocks/${name}/${fileName}`)
			);
			return;
		}
	});
}

const handleError = (err) => console.error(err);
// const blockName = templateOptions[0];

blocks.block.forEach((blockName) => {
	if (dynamicEntryPointsJs.includes(blockName)) {
		const dir = path.join(__dirname, `../../../exported-blocks/${blockName}/`);

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
			fs.copyFileSync(`${srcPathJs}${blockName}.js`, `${dir}${blockName}.js`);
			fs.copyFileSync(
				`${srcPathScss}${blockName}.scss`,
				`${dir}${blockName}.scss`
			);
			fs.copyFileSync(
				`${srcPathTwig}${blockName}.twig`,
				`${dir}${blockName}.twig`
			);
			fs.copyFileSync(
				`${srcPathPhp}${blockName}.php`,
				`${dir}${blockName}.php`
			);
			if (fs.existsSync(`${srcPathVue}${blockName}.vue`)) {
				fs.copyFileSync(
					`${srcPathVue}${blockName}.vue`,
					`${dir}${blockName}.vue`
				);
			}
			copyBlockJson(blockName);
			compressing.zip
				.compressDir(
					path.join(__dirname, `../../../exported-blocks/${blockName}`),
					path.join(__dirname, `../../../exported-blocks/${blockName}.zip`)
				)
				.then(compressDone(blockName))
				.catch(handleError);
		} else {
			console.log(
				`Did not export as there was a zip file called ${blockName} already present in exported-blocks folder`
			);
		}
	}
});