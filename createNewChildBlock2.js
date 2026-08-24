import 'dotenv/config';
import fs from 'node:fs';
import {globSync} from 'glob';
import {exec} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import yaml from 'js-yaml';
import axios from 'axios';
import acfTemplate from './new-block-templates/template-acf-pattern.js';
import acfTemplateScss from './new-block-templates/template-scss-blank.js';
import acfTemplateJs from './new-block-templates/template-js-blank.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

const yamlData = yaml.load(fs.readFileSync('../../../../.lando.yml', 'utf8'));
const siteName = yamlData.config.site;
const parentURL = process.env.DESIGN_MULTIDEV
	? `${process.env.DESIGN_MULTIDEV}/wp-admin/admin-ajax.php`
	: `http://${siteName}.lndo.site/wp-admin/admin-ajax.php`;

const srcPathJs = path.join(__dirname, 'components');
const srcPathScss = path.join(__dirname, 'components');

let projectName = 'Global Theme';
const projectJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
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
	(filePath) => {
		const assetKey = filePath
			.replace('assets/js/blocks/', '')
			.replace('.js', '');
		return assetKey;
	}
);
const newBlockName = process.argv[2]?.toLowerCase();
const patternID = process.argv[3];

if (!newBlockName) {
	console.log('Did you forget to give the new block a name?');
	process.exit(1);
}
if (!patternID) {
	console.log('Did you forget to supply the pattern ID?');
	process.exit(1);
}

fs.writeFileSync(
	`${themePath}/inc/acf-blocks/${newBlockName}.php`,
	acfTemplate(newBlockName, projectName)
);

const blockName = 'group-container-v3';

const fullPath = path.join(srcPathJs, `block-${blockName}`, `${blockName}.js`);

const jsdir = 'Assets/js/blocks/';
const scssdir = 'Assets/scss/blocks/';

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

const data = new FormData();
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
				.replace(/(?<!sub-)group-container-v3/g, `${newBlockName}`);
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
