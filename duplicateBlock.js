require('dotenv').config();
const fs = require('fs');
const path = require('path');
const {globSync} = require('glob');
const yargs = require('yargs');
const compressing = require('compressing');
const templateOptions = yargs.argv._;
const themePath =
	process.env.THEME_PATH || 'web/wp-content/themes/global-theme';
const srcPathJs = `${themePath}/assets/js/blocks`;
const srcPathScss = `${themePath}/assets/scss/blocks`;
const srcPathTwig = `${themePath}/views/blocks`;
const srcPathBlockJson = `${themePath}/inc/acf-blocks`;
// exported-blocks lives at the project root, relative to cwd (the theme dir)
const destPath =
	process.env.EXPORTED_BLOCKS_PATH ||
	path.resolve(process.cwd(), '../../../../exported-blocks');
const newName = templateOptions[1];

const exisitingBlockNames = [
	...globSync(`${themePath}/assets/js/blocks/*.js`).map((p) =>
		path.basename(p, '.js')
	),
	...globSync(`${themePath}/inc/acf-blocks/*/block.json`).map((p) =>
		path.basename(path.dirname(p))
	)
];

const blockName = templateOptions[0];

if (!blockName) {
	console.log(
		"\x1b[33m 🤔🤔 Hmmm...You dont't seem to have chosen a block to duplicate. 🤔🤔 \x1b[0m"
	);
	return;
}
if (!newName) {
	console.log(
		'\x1b[33m 🤓🤓 Nearly there! Unfortunately you forgot to choose a new name for your duplicate block. 🤓🤓 \x1b[0m'
	);
	return;
}

if (blockName === newName) {
	console.log(
		'\x1b[33m Oh no! 😱😱😱 Your new block name cannot be the same as the original block name! \x1b[0m'
	);
	return;
}

if (exisitingBlockNames.includes(blockName)) {
	const dir = `${destPath}/${newName}`;
	if (fs.existsSync(dir)) {
		console.log('Removing previous duplication...');
		fs.rmSync(dir, {recursive: true, force: true});
		console.log('removed');
	}
	fs.mkdirSync(dir);
	if (fs.existsSync(`${srcPathJs}/${blockName}.js`)) {
		const contents = fs.readFileSync(
			`${srcPathJs}/${blockName}.js`,
			'utf-8'
		);
		const regEx = RegExp(
			String.raw`(${blockName.replaceAll(/( |-)/g, '')})`,
			'gi'
		);
		const replaced = contents
			.replaceAll(
				regEx,
				`${newName.toLowerCase().replaceAll(/( |-)/g, '')}`
			)
			.replaceAll(`blocks/${blockName}`, `blocks/${newName}`);
		fs.writeFileSync(`${dir}/${newName}.js`, replaced, 'utf-8');
		console.log(`👑👑\x1b[32m Successfully duplicated the js file! 👑👑`);
	}
	if (fs.existsSync(`${srcPathScss}/${blockName}.scss`)) {
		const contents = fs.readFileSync(
			`${srcPathScss}/${blockName}.scss`,
			'utf-8'
		);
		const replaced = contents.replaceAll(`${blockName}`, `${newName}`);
		fs.writeFileSync(`${dir}/${newName}.scss`, replaced, 'utf-8');
		console.log(`👑👑\x1b[32m Successfully duplicated the scss file! 👑👑`);
	}
	if (fs.existsSync(`${srcPathTwig}/${blockName}.twig`)) {
		const contents = fs.readFileSync(
			`${srcPathTwig}/${blockName}.twig`,
			'utf-8'
		);
		const regEx = RegExp(String.raw`(\"${blockName}) `, 'gi');
		const replaced = contents.replaceAll(regEx, `"${newName} `);
		const regEx2 = RegExp(String.raw`([\"|\']${blockName}[\"|\'])`, 'gi');
		const replaced2 = replaced.replaceAll(regEx2, `"${newName}"`);
		fs.writeFileSync(`${dir}/${newName}.twig`, replaced2, 'utf-8');
		console.log(`👑👑\x1b[32m Successfully duplicated the twig file! 👑👑`);
	}
	if (fs.existsSync(`${srcPathBlockJson}/${blockName}/block.json`)) {
		const contents = fs.readFileSync(
			`${srcPathBlockJson}/${blockName}/block.json`,
			'utf-8'
		);
		const data = JSON.parse(contents);
		data.name = `acf/${newName}`;
		data.title = newName
			.split('-')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
		if (data.description) {
			data.description = data.description.replaceAll(blockName, newName);
		}
		fs.writeFileSync(
			`${dir}/block.json`,
			JSON.stringify(data, null, '\t'),
			'utf-8'
		);
		console.log(
			`👑👑\x1b[32m Successfully duplicated the block.json file! 👑👑`
		);
	}
	compressing.zip
		.compressDir(`${dir}`, `${dir}.zip`)
		.then(() => {
			fs.rmSync(`${destPath}/${newName}`, {recursive: true});
			console.log(`\x1b[32m 🎉 Zip created at ${dir}.zip \x1b[0m`);
		})
		.catch((err) => console.error(err));
}
