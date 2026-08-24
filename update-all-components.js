import fs from 'node:fs';
import path from 'node:path';
import {exec} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import * as glob from 'glob';

const libraryPath = './node_modules/@total_onion/onion-library';

const getComponentsList = () => {
	let finalList = [];

	if (fs.existsSync('./project-components-list.json')) {
		const componentsList = glob.sync(`${libraryPath}/components/*`);
		const listJson = fs.readFileSync('./project-components-list.json');
		const componentsListObject = JSON.parse(listJson);

		componentsList.forEach((componentPath) => {
			const component = path.basename(componentPath);
			const [prefix, ...nameParts] = component.split('-');
			const name = nameParts.join('-');

			if (
				!componentsListObject[prefix] ||
				(componentsListObject[prefix] &&
					!componentsListObject[prefix].includes(name))
			) {
				finalList.push(component);
			}
		});
	} else {
		finalList = glob
			.sync(`${libraryPath}/components/*`)
			.map((componentPath) => path.basename(componentPath));
	}

	return finalList;
};

const updateAllComponents = () => {
	const componentsList = getComponentsList();
	console.log('updating all Onions');

	if (
		componentsList.includes('admin-core-generic') ||
		componentsList.includes('admin-core-critical')
	) {
		console.log(
			'\x1b[35m',
			'😞 Hmmm that failed.. Have you removed the core components packages from project-component-list.json?'
		);
		process.exit();
	}

	const maxConcurrentUpdates = 2;
	let currentIndex = 0;

	const updateNextComponent = () => {
		if (currentIndex >= componentsList.length) {
			return;
		}

		const component = componentsList[currentIndex++];
		exec(
			`yarn update-onion-template ${component}`,
			(error, stdout, stderr) => {
				if (error) {
					console.error(`Error: ${error.message}`);
				}

				if (stderr) {
					console.error(`stderr: ${stderr}`);
				}

				if (stdout) {
					console.log(`stdout: ${stdout}`);
				}

				updateNextComponent();
			}
		);
	};

	for (
		let i = 0;
		i < Math.min(maxConcurrentUpdates, componentsList.length);
		i++
	) {
		updateNextComponent();
	}
};

export {getComponentsList, updateAllComponents};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	updateAllComponents();
}
