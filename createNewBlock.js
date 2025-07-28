require('dotenv').config();
const fs = require('fs');
const { globSync } = require('glob');
const yargs = require('yargs');
const {exec} = require('child_process');
const swiperTemplates = require('./new-block-templates/template-swiper');
const vueTemplates = require('./new-block-templates/template-vue');
const acfTemplate = require('./new-block-templates/template-acf');
const defaultTemplates = require('./new-block-templates/template-default');

const themePath =
	process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

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

const templateOptions = yargs.argv._;
let swiper = false;
let image = false;
let content = false;
let vue = false;
templateOptions.forEach((option) => {
	switch (option) {
		case 'swiper':
			swiper = true;
			break;
		case 'image':
			image = true;
			break;
		case 'content':
			content = true;
			break;
		case 'vue':
			vue = true;
			break;

		default:
			break;
	}
});

const dynamicEntryPoints = globSync(`${themePath}/assets/js/blocks/*.js`)
	.map((path) => {
		const assetKey = path
			.replace('assets/js/blocks/', '')
			.replace('.js', '');
		return assetKey;
	});
const newBlockName = process.argv[2]?.toLowerCase();
const blockType = process.argv[3];

if (!newBlockName) {
	return console.log('Did you forget to give the new block a name?');
}
if (dynamicEntryPoints.indexOf(newBlockName) !== -1) {
	return console.log(
		`Alas! There is already a block called ${newBlockName} :( You'll have to try something else..`
	);
}

const imageTemplate = `
{{ include("components/responsive-image.twig", {fields : fields, block : block, blockClassName: blockClassName}, with_context = false) }}
`;

const contentContainerTemplate = `
<div class="${newBlockName}__content-container">
	<h1 class="${newBlockName}__title">${newBlockName} title!</h1>
</div>
`;

const templateData = `
{% set blockClassName = "${newBlockName}" %}
{% set classNameEntryPoint = include('entry-points/entry-point-classes.twig', { fields: fields, block: block }, with_context = false) %}
{% set htmlEntryPoint = include('entry-points/entry-point-html-v3.twig', { fields: fields, block: block, blockClassName, blockClassName }, with_context = false) %}
{% set dataAttributeEntryPoint = include('entry-points/entry-point-data-attribute.twig', { fields: fields, block: block }, with_context = false) %}
{% set styleEntryPoint = include('entry-points/entry-point-style.twig', { fields: fields, block: block, is_preview }, with_context = false) %}
{% set previewEntryPoint = include('entry-points/entry-point-preview-info.twig', { fields, block, displaytype, is_preview }, with_context = false) %}

{% set sectionStyles =  styleEntryPoint %}

{{previewEntryPoint}}
<style>
	.{{blockClassName}}.{{block.id}}{
		{{sectionStyles}}
	}
</style>
<section {{block.anchor ? "id=" ~ block.anchor : ''}} class="{{blockClassName}} {{block.className}} {{classNameEntryPoint}} {{block.id}} lazy-fade" {{dataAttributeEntryPoint}} data-blockid="{{block.id}}" data-assetkey="{{blockClassName}}">
	${swiper ? swiperTemplates.templatetwig(newBlockName) : ''}${
	image ? imageTemplate : ''
}
	${content ? contentContainerTemplate : ''}
	${vue ? vueTemplates.templatetwig(newBlockName) : ''}
	{{htmlEntryPoint}}
</section>`;

let jsData;
if (swiper) {
	jsData = swiperTemplates.templatejs(newBlockName);
} else if (vue) {
	jsData = vueTemplates.templatejs(newBlockName);
} else {
	jsData = defaultTemplates.defaultjs(newBlockName);
}

fs.writeFileSync(`${themePath}/assets/js/blocks/${newBlockName}.js`, jsData);
fs.writeFileSync(
	`${themePath}/assets/scss/blocks/${newBlockName}.scss`,
	defaultTemplates.defaultscss(newBlockName)
);
if (!fs.existsSync(`${themePath}/assets/scss/blocks/${newBlockName}`)) {
	fs.mkdirSync(`${themePath}/assets/scss/blocks/${newBlockName}`);
}
fs.writeFileSync(
	`${themePath}/assets/scss/blocks/${newBlockName}/${newBlockName}-extra.scss`,
	defaultTemplates.defaultextrascss(newBlockName)
);
fs.writeFileSync(
	`${themePath}/views/blocks/${newBlockName}.twig`,
	templateData
);
fs.writeFileSync(
	`${themePath}/inc/acf-blocks/${newBlockName}.php`,
	acfTemplate(newBlockName, projectName)
);
// fs.writeFileSync(
// 	`./cypress/e2e/components/${newBlockName}.cy.js`,
// 	cypressJs(newBlockName)
// );
if (vue) {
	fs.writeFileSync(
		`${themePath}/assets/vue/blocks/${newBlockName}.vue`,
		vueTemplates.templatevuefile(newBlockName)
	);
}

console.log(
	`👑 👑 👑 Hurrah! You made a new block called ${newBlockName} 👑 👑 👑`
);
console.log(`...now running yarn dev...`);

exec('yarn dev', (error, stdout, stderr) => {
	if (error) {
		console.log(`error: ${error.message}`);
		return;
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
		return;
	}
	console.log(`stdout: ${stdout}`);
});
