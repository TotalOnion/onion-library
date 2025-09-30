require('dotenv').config();
const fs = require('fs');
const {globSync} = require('glob');
const {exec} = require('child_process');
const acfTemplate = require('./new-block-templates/template-acf-pattern');
const acfTemplateScss = require('@total_onion/onion-library/new-block-templates/template-scss-blank');
const acfTemplateJs = require('@total_onion/onion-library/new-block-templates/template-js-blank');
const yaml = require('js-yaml');
const axios = require('axios');

const themePath =
	process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

const yamlData = yaml.load(fs.readFileSync('../../../../.lando.yml', 'utf8'));
const siteName = yamlData.config.site;
const parentURL = process.env.DESIGN_MULTIDEV
	? `${process.env.DESIGN_MULTIDEV}/wp-admin/admin-ajax.php`
	: `http://${siteName}.lndo.site/wp-admin/admin-ajax.php`;

const srcPathJs = `${__dirname}/components`;
const srcPathScss = `${__dirname}/components`;

let projectName = 'Global Theme';
const projectJson = JSON.parse(fs.readFileSync('./package.json'));
if (projectJson) {
	projectName = projectJson.name;
	if (projectName.slice(0, 3) === 'the') {
		const prefix =
			projectName.slice(0, 3).charAt(0).toUpperCase() +
			projectName.slice(0, 3).slice(1);
		projectName = `${prefix} ${
			projectName.slice(3).charAt(0).toUpperCase() +
			projectName.slice(3).slice(1)
		}`;
	} else {
		projectName = `${
			projectName.charAt(0).toUpperCase() + projectName.slice(1)
		}`;
	}
}

const dynamicEntryPoints = globSync(`${themePath}/assets/js/blocks/*.js`).map(
	(path) => {
		const assetKey = path
			.replace('assets/js/blocks/', '')
			.replace('.js', '');
		return assetKey;
	}
);
const newBlockName = process.argv[2]?.toLowerCase();
const patternID = process.argv[3];

if (!newBlockName) {
	return console.log('Did you forget to give the new block a name?');
}
if (!patternID) {
	return console.log('Did you forget to supply the pattern ID?');
}
// if (dynamicEntryPoints.indexOf(newBlockName) !== -1) {
// 	return console.log(
// 		`Alas! There is already a block called ${newBlockName} :( You'll have to try something else..`
// 	);
// }

fs.writeFileSync(
	`${themePath}/inc/acf-blocks/${newBlockName}.php`,
	acfTemplate(newBlockName, projectName)
);

const blockName = 'group-container-v3';

// console.log(`${srcPathJs}/block-${blockName}/${blockName}.js`);
// console.log('__dirname:', __dirname);
// console.log('process.cwd():', process.cwd());

const fullPath = `${srcPathJs}/block-${blockName}/${blockName}.js`;

const jsdir = `Assets/js/blocks/`;
// if (!fs.existsSync(jsdir)) {
// 	fs.mkdirSync(jsdir, 0o744);
// }
const scssdir = `Assets/scss/blocks/`;
// if (!fs.existsSync(scssdir)) {
// 	fs.mkdirSync(scssdir, 0o744);
// }

if (!fs.existsSync(`${jsdir}/${newBlockName}.js`)) {
	fs.writeFileSync(
		`${jsdir}/${newBlockName}.js`,
		acfTemplateJs(newBlockName)
	);
	console.log(`👑👑\x1b[32m Successfully created the js file! 👑👑`);
}

if (!fs.existsSync(`${scssdir}/${newBlockName}.scss`)) {
	fs.writeFileSync(
		`${scssdir}/${newBlockName}.scss`,
		acfTemplateScss(newBlockName)
	);
	console.log(`👑👑\x1b[32m Successfully created the scss file! 👑👑`);
}

let data = new FormData();
data.append('action', 'get_pattern_block');
data.append('postID', patternID);

const headers = {
	headers: {
		'user-agent':
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
	}
};

axios.post(parentURL, data, headers).then(function (response) {
	fs.writeFileSync(
		`${themePath}/views/blocks/${newBlockName}.twig`,
		response.data.html
	);
	fs.readFile(
		`${themePath}/views/blocks/${newBlockName}.twig`,
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
					`${newBlockName.toLowerCase().replaceAll(/( |-)/g, '')}`
				)
				.replaceAll(`group-container-v3`, `${newBlockName}`);
			fs.writeFile(
				`${themePath}/views/blocks/${newBlockName}.twig`,
				replaced,
				'utf-8',
				function (err) {
					if (err) throw err;
					console.log(
						`👑👑\x1b[32m Successfully did searcha and replace on the twig file! 👑👑`
					);
					console.log(
						`👑 👑 👑 Hurrah! You made a new child block called ${newBlockName} 👑 👑 👑`
					);
				}
			);
		}
	);
});
