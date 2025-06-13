const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Import the function to be tested
const updateComponent = require('../update-component');

// Promisify the fs functions used in the copyBlockComponent function
const readdirPromisified = promisify(fs.readdir);
const accessPromisified = promisify(fs.access);

// Create a utility function to remove the file (used after each test)
const removeFile = async (filePath) => {
	try {
		await fs.promises.unlink(filePath);
	} catch (err) {
		// If the file doesn't exist, ignore the error
		if (err.code !== 'ENOENT') {
			console.error('Error removing the file:', err);
		}
	}
};

xdescribe('copyBlockComponent function', () => {
	const libraryPath = 'testFiles/library'; // Assuming the libraryPath is defined for the tests
	const componentName = 'TestComponent';

	// Before each test, create the source directory with some test files
	beforeEach(async () => {
		try {
			const sourceDir = path.join(libraryPath, 'components', componentName);
			await fs.promises.mkdir(sourceDir, { recursive: true });
			await fs.promises.writeFile(path.join(sourceDir, 'TestComponent.php'), 'Test PHP content');
			await fs.promises.writeFile(path.join(sourceDir, 'TestComponent.js'), 'Test JS content');
			await fs.promises.writeFile(path.join(sourceDir, 'TestComponent.scss'), 'Test SCSS content');
			await fs.promises.writeFile(path.join(sourceDir, 'TestComponent.json'), 'Test JSON content');
			await fs.promises.writeFile(path.join(sourceDir, 'TestComponent.twig'), 'Test Twig content');
			await fs.promises.writeFile(path.join(sourceDir, 'TestComponent.vue'), 'Test Vue content');
			await fs.promises.writeFile(path.join(sourceDir, 'TestComponent.extra'), 'Test Extra content');
			await fs.promises.writeFile(path.join(sourceDir, 'TestComponent.spec'), 'Test Spec content');
		} catch (err) {
			console.error('Error creating the source directory:', err);
		}
	});

	// After each test, remove the source and destination files
	afterEach(async () => {
		try {
			const sourceDir = path.join(libraryPath, 'components', componentName);
			await fs.promises.rmdir(sourceDir, { recursive: true });
			await removeFile('./inc/acf-blocks/TestComponent.php');
			await removeFile('./assets/js/blocks/TestComponent.js');
			await removeFile('./assets/scss/blocks/TestComponent.scss');
			await removeFile('./acf-json/TestComponent.json');
			await removeFile('./views/blocks/TestComponent.twig');
			await removeFile('./assets/vue/blocks/TestComponent.vue');
			await removeFile('./assets/scss/blocks/TestComponent/TestComponent.extra');
		} catch (err) {
			console.error('Error cleaning up the test files:', err);
		}
	});

	it('should copy files from source to destination based on the file types', async () => {
		// Call the function to be tested
		await updateComponent.copyBlockComponent(componentName);

		// Assert that the destination files exist for each file type
		const destinationFiles = [
			'./inc/acf-blocks/TestComponent.php',
			'./assets/js/blocks/TestComponent.js',
			'./assets/scss/blocks/TestComponent.scss',
			'./acf-json/TestComponent.json',
			'./views/blocks/TestComponent.twig',
			'./assets/vue/blocks/TestComponent.vue',
			'./assets/scss/blocks/TestComponent/TestComponent.extra',
		];

		for (const filePath of destinationFiles) {
			const fileExists = await accessPromisified(filePath)
				.then(() => true)
				.catch(() => false);
				expect(fileExists).toBe(true);
		}

		// Assert that the destination files contain the same content as the source files
		const sourceDir = path.join(libraryPath, 'components', componentName);
		const fileTypes = ['php', 'js', 'scss', 'json', 'twig', 'vue', 'extra'];
		for (const fileType of fileTypes) {
			const sourceContent = await fs.promises.readFile(path.join(sourceDir, `TestComponent.${fileType}`), 'utf-8');
			const destinationContent = await fs.promises.readFile(path.join(`./${fileType === 'extra' ? 'assets/scss/blocks/TestComponent' : fileType}s/TestComponent.${fileType}`), 'utf-8');
			expect(destinationContent).toBe(sourceContent);
		}
	});
});
