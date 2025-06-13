const getComponentsList = () => {
	const path = require('path');
	const glob = require('glob');
	const fs = require('fs');
	const libraryPath =
		'./node_modules/@pernod-ricard-global-cms/cbl-component-library';

	let finalList = [];

	printMemoryUsage('Before checking components list');

	if (fs.existsSync('./project-components-list.json')) {
		// Get core components
		const componentsList = glob.sync(`${libraryPath}/components/*`);

		// Push
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

		// Free up memory
	} else {
		finalList = glob
			.sync(`${libraryPath}/components/*`)
			.map((componentPath) => {
				return path.basename(componentPath);
			});
	}

	printMemoryUsage('After checking components list');

	return finalList;
};

const updateAllComponents = () => {
	const {exec} = require('child_process');
	const componentsList = getComponentsList();

	printMemoryUsage('Before updating components');

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

	// Limit the number of parallel updates
	const maxConcurrentUpdates = 2;
	let currentIndex = 0;

	const updateNextComponent = () => {
		if (currentIndex >= componentsList.length) {
			return;
		}

		const component = componentsList[currentIndex++];
		exec(`yarn update-component ${component}`, (error, stdout, stderr) => {
			if (error) {
			  console.error(`Error: ${error.message}`);
			}
			
			if (stderr) {
			  console.error(`stderr: ${stderr}`);
			}
	
			if (stdout) {
			  console.log(`stdout: ${stdout}`);
			}

			// Recursively update the next component
			updateNextComponent();
		});
	};

	// Start the initial batch of updates
	for (
		let i = 0;
		i < Math.min(maxConcurrentUpdates, componentsList.length);
		i++
	) {
		updateNextComponent();
	}

	printMemoryUsage('After updating components');
};

const printMemoryUsage = (label) => {
	console.log(console.time(label));
	const memoryUsage = process.memoryUsage();
	console.log(`\nMemory Usage - ${label}`);
	console.log(`RSS: ${Math.round(memoryUsage.rss / 1024 / 1024)} MB`);
	console.log(
		`Heap Total: ${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`
	);
	console.log(
		`Heap Used: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`
	);
	console.log(
		`External: ${Math.round(memoryUsage.external / 1024 / 1024)} MB`
	);
	console.log(
		`Array Buffers: ${Math.round(
			memoryUsage.arrayBuffers / 1024 / 1024
		)} MB\n`
	);
};

module.exports = {
	getComponentsList,
	updateAllComponents
};

// It calls the function only if executed through the command line
if (require.main === module) {
	updateAllComponents();
}
