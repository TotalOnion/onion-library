const fs = require('fs');
const glob = require('glob');
const yargs = require('yargs');

let projectName = 'Global Theme';
const libraryPath =
	'./node_modules/@pernod-ricard-global-cms/cbl-component-library';
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

const componentName = process.argv[2]?.toLocaleLowerCase();

if (!componentName) {
	console.log(
		'\x1b[35m',
		'Hmmm that failed.. Did you forget to include the component name?'
	);
	process.exit();
}

let componentType = 'block';
let componentModuleName = componentName.substring(6);
if (componentName.split('-')[0] === 'fields') {
	componentType = 'fields';
	componentModuleName = componentName.substring(7);
}
if (componentName.split('-')[0] === 'admin') {
	componentType = 'admin';
	componentModuleName = componentName.substring(6);
}

function globGetFileNames(path, filetype, removeExt = false) {
	const pathPlusExt = `${path}*.${filetype}`;
	const points = glob.sync(pathPlusExt).map((fullPath) => {
		let assetKey = fullPath.replace(path, '');
		if (removeExt === true) {
			assetKey = assetKey.replace(`.${filetype}`, '');
		}
		return assetKey;
	});
	return points;
}

const dynamicEntryPointsJs = globGetFileNames(
	'./web/wp-content/themes/global-theme/assets/js/blocks/',
	'js',
	true
);

const dynamicEntryPointsAcfJson = globGetFileNames(
	'./web/wp-content/themes/global-theme/acf-json/',
	'json'
);

let componentAcf = globGetFileNames(
	`${libraryPath}/components/${componentName}/`,
	'json'
)[0];

if (componentType === 'fields') {
	if (dynamicEntryPointsAcfJson.indexOf(componentAcf) !== -1) {
		console.log(
			'\x1b[33m',
			`Oh oh! It looks like you already have a field group called "${componentName}". If you want to overwrite it with the latest version then try "yarn update-component ${componentName}"`
		);
		process.exit();
	}
} else {
	if (dynamicEntryPointsJs.indexOf(componentName) !== -1) {
		console.log(
			'\x1b[33m',
			`Oh oh! It looks like you already have a block called ${componentName}. If you want to overwrite it with the latest version then try "yarn update-component ${componentName}"`
		);
		process.exit();
	}
}

if (
	fs.existsSync(
		`${libraryPath}/components/${componentName}/${componentModuleName}.js`
	)
) {
	if (componentType === 'fields') {
		if (
			!fs.existsSync(
				`./web/wp-content/themes/global-theme/assets/js/modules/library-modules/${componentModuleName}`
			)
		) {
			console.log('making the folder');
			fs.mkdirSync(
				`./web/wp-content/themes/global-theme/assets/js/modules/library-modules/${componentModuleName}`
			);
		}
		fs.copyFileSync(
			`${libraryPath}/components/${componentName}/${componentModuleName}.js`,
			`./web/wp-content/themes/global-theme/assets/js/modules/library-modules/${componentModuleName}/${componentModuleName}.js`
		);
	} else {
		fs.copyFileSync(
			`${libraryPath}/components/${componentName}/${componentModuleName}.js`,
			`./web/wp-content/themes/global-theme/assets/js/blocks/${componentModuleName}.js`
		);
	}
}

if (
	fs.existsSync(
		`${libraryPath}/components/${componentName}/${componentModuleName}.scss`
	)
) {
	if (componentType === 'fields') {
		if (
			!fs.existsSync(
				`./web/wp-content/themes/global-theme/assets/scss/modules/library-modules/${componentModuleName}`
			)
		) {
			console.log('making the folder');
			fs.mkdirSync(
				`./web/wp-content/themes/global-theme/assets/scss/modules/library-modules/${componentModuleName}`
			);
		}
		fs.copyFileSync(
			`${libraryPath}/components/${componentName}/${componentModuleName}.scss`,
			`./web/wp-content/themes/global-theme/assets/scss/modules/library-modules/${componentModuleName}/${componentModuleName}.scss`
		);
	} else {
		fs.copyFileSync(
			`${libraryPath}/components/${componentName}/${componentModuleName}.scss`,
			`./web/wp-content/themes/global-theme/assets/scss/blocks/${componentModuleName}.scss`
		);
	}
}

if (
	fs.existsSync(
		`${libraryPath}/components/${componentName}/${componentModuleName}.php`
	)
) {
	if (componentType === 'admin' || componentType === 'fields') {
		fs.copyFileSync(
			`${libraryPath}/components/${componentName}/${componentModuleName}.php`,
			`./web/wp-content/themes/global-theme/inc/admin-extras/${componentModuleName}.php`
		);
	} else {
		fs.copyFileSync(
			`${libraryPath}/components/${componentName}/${componentModuleName}.php`,
			`./web/wp-content/themes/global-theme/inc/acf-blocks/${componentModuleName}.php`
		);
	}
}

if (
	fs.existsSync(
		`${libraryPath}/components/${componentName}/${componentModuleName}.vue`
	)
) {
	fs.copyFileSync(
		`${libraryPath}/components/${componentName}/${componentModuleName}.vue`,
		`./web/wp-content/themes/global-theme/views/blocks/${componentModuleName}.vue`
	);
}
if (
	fs.existsSync(
		`${libraryPath}/components/${componentName}/${componentModuleName}.cy.js`
	)
) {
	fs.copyFileSync(
		`${libraryPath}/components/${componentName}/${componentModuleName}.cy.js`,
		`./cypress/e2e/components/${componentModuleName}.cy.js`
	);
}

import('cpy').then((result) => {
	const cpy = result.default;

	cpy(
		`${libraryPath}/components/${componentName}/*.json`,
		`./web/wp-content/themes/global-theme/acf-json/`
	);

	let twigPath = `./web/wp-content/themes/global-theme/views/blocks/`;
	if (componentName.substring(0, 6) === 'fields') {
		twigPath = `./web/wp-content/themes/global-theme/views/components/`;
	}
	cpy(`${libraryPath}/components/${componentName}/*.twig`, twigPath);
});

console.log(
	'\x1b[32m',
	`👑 👑 👑 Hurrah! You installed a component called ${componentName} 👑 👑 👑`
);
