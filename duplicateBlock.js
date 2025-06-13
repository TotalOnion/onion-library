require('dotenv').config();
const fs = require('fs');
const { globSync } = require('glob');
const yargs = require('yargs');
const compressing = require('compressing');
const { log } = require('console');
const templateOptions = yargs.argv._;
const themePath =
	process.env.THEME_PATH || 'web/wp-content/themes/global-theme';
const srcPathJs = `${themePath}/assets/js/blocks`;
const srcPathScss = `${themePath}/assets/scss/blocks`;
const srcPathTwig = `${themePath}/views/blocks`;
const srcPathPhp = `${themePath}/inc/acf-blocks`;
const srcPathVue = `${themePath}/assets/vue/blocks`;
const destPath = '../../../../exported-blocks';
const newName = templateOptions[1];

const exisitingBlockNames = globSync(`${themePath}/assets/js/blocks/*.js`)
	.map((path) => {
		const assetKey = path
			.replace('assets/js/blocks/', '')
			.replace('.js', '');
		return assetKey;
	});

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
		fs.readFile(
			`${srcPathJs}/${blockName}.js`,
			'utf-8',
			(err, contents) => {
				if (err) throw err;
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
				fs.writeFile(
					`${dir}/${newName}.js`,
					replaced,
					'utf-8',
					function (err) {
						if (err) throw err;
						console.log(
							`👑👑\x1b[32m Successfully duplicated the js file! 👑👑`
						);
					}
				);
			}
		);
	}
	if (fs.existsSync(`${srcPathScss}/${blockName}.scss`)) {
		fs.readFile(
			`${srcPathScss}/${blockName}.scss`,
			'utf-8',
			(err, contents) => {
				if (err) throw err;
				const replaced = contents.replaceAll(
					`${blockName}`,
					`${newName}`
				);
				fs.writeFile(
					`${dir}/${newName}.scss`,
					replaced,
					'utf-8',
					function (err) {
						if (err) throw err;
						console.log(
							`👑👑\x1b[32m Successfully duplicated the scss file! 👑👑`
						);
					}
				);
			}
		);
	}
	if (fs.existsSync(`${srcPathTwig}/${blockName}.twig`)) {
		fs.readFile(
			`${srcPathTwig}/${blockName}.twig`,
			'utf-8',
			(err, contents) => {
				if (err) throw err;
				const regEx = RegExp(String.raw`(\"${blockName}) `, 'gi');
				const replaced = contents.replaceAll(regEx, `"${newName} `);
				const regEx2 = RegExp(
					String.raw`([\"|\']${blockName}[\"|\'])`,
					'gi'
				);
				const replaced2 = replaced.replaceAll(regEx2, `"${newName}"`);
				fs.writeFile(
					`${dir}/${newName}.twig`,
					replaced2,
					'utf-8',
					function (err) {
						if (err) throw err;
						console.log(
							`👑👑\x1b[32m Successfully duplicated the twig file! 👑👑`
						);
					}
				);
			}
		);
	}
	if (fs.existsSync(`${srcPathPhp}/${blockName}.php`)) {
		fs.readFile(
			`${srcPathPhp}/${blockName}.php`,
			'utf-8',
			(err, contents) => {
				if (err) throw err;
				const replaced = contents.replaceAll(
					`${blockName}`,
					`${newName}`
				);
				const regEx = RegExp(
					String.raw`${blockName.replaceAll('-', ' ')}`,
					'gi'
				);
				const replaced2 = replaced.replaceAll(
					regEx,
					`${newName.slice(0, 1).toUpperCase()}${newName
						.replaceAll('-', ' ')
						.slice(1)}`
				);
				const regEx2 = RegExp(
					String.raw`${blockName.replaceAll('-', '_')}`,
					'gi'
				);
				const replaced3 = replaced2.replaceAll(
					regEx2,
					`${newName.replaceAll('-', '_')}`
				);
				fs.writeFile(
					`${dir}/${newName}.php`,
					replaced3,
					'utf-8',
					function (err) {
						if (err) throw err;
						console.log(
							`👑👑\x1b[32m Successfully duplicated the php file! 👑👑`
						);
					}
				);
			}
		);
	}
	if (fs.existsSync(`${srcPathVue}/${blockName}.vue`)) {
		fs.readFile(
			`${srcPathVue}/${blockName}.vue`,
			'utf-8',
			(err, contents) => {
				if (err) throw err;
				const replaced = contents.replaceAll(
					`${blockName}`,
					`${newName}`
				);
				fs.writeFile(
					`${dir}/${newName}.vue`,
					replaced,
					'utf-8',
					function (err) {
						if (err) throw err;
						console.log(
							`👑👑\x1b[32m Successfully duplicated the vue file! 👑👑`
						);
					}
				);
			}
		);
	}
	const handleError = (err) => console.error(err);
	const compressDone = () => {
		fs.rmSync(`../../../../exported-blocks/${newName}`, {recursive: true});
	};

	setTimeout(() => {
		compressing.zip
			.compressDir(`${dir}`, `${dir}.zip`)
			.then(compressDone)
			.catch(handleError);
	}, 100);
}
