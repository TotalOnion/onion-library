'use strict';

const fs = require('fs');
const path = require('path');
const updateComponent = require('../update-component');


describe('copyFile function', () => {
	const sourceFilePath = './__spec__/files/source.txt';
	const destinationFilePath = './__spec__/files/destination.txt';

	// Helper function to delete a file if it exists
	const deleteFileIfExists = (filePath) => {
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(destinationFilePath);
		}
	};

	beforeEach(() => {
		deleteFileIfExists(destinationFilePath);
		jest.resetModules();
		jest.clearAllMocks();
	});
	afterEach(() => {
		deleteFileIfExists(destinationFilePath);
	});


	// Test case 1: Ensure the file is copied when destination does not exists
	test('copies file if it does not exist', async () => {
		await updateComponent.copyFile(sourceFilePath, destinationFilePath);

		// Wait for a short delay to allow the asynchronous operation to complete
		await new Promise((resolve) => setTimeout(resolve, 150)); // Adjust the delay time as needed

		expect(fs.existsSync(destinationFilePath)).toBe(true);
	});

	// Test case 2: Ensure the file is copied even if the destination exists
	test('overwrite file when destination file already exists', async () => {
		// Create a dummy destination file to simulate an existing file
		fs.writeFileSync(destinationFilePath, 'Dummy content Newer');

		await updateComponent.copyFile(sourceFilePath, destinationFilePath);
		// Wait for a short delay to allow the asynchronous operation to complete
		await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust the delay time as needed

		// Assert that the destination file still exists after the function call
		expect(fs.existsSync(destinationFilePath)).toBe(true);

		// get file content
		const destinationContent = fs.readFileSync(destinationFilePath, 'utf8');

		// content should be 
		expect(destinationContent).toBe('Dummy content');
	});

	// Test case 3: Ensure the function handles errors properly
	test('handles errors when copying the file', async () => {
		// Create a dummy destination file to simulate an existing file
		// fs.writeFileSync(destinationFilePath, 'Dummy content');
		const sourceFilePath = './__spec__/nonexistent_source.txt';

		// Ensure that console.error is called with the error message
		const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
		
		await updateComponent.copyFileKeeping(sourceFilePath, destinationFilePath);
		// Wait for a short delay to allow the asynchronous operation to complete
		await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust the delay time as needed

		// Assert that console.error was called with the expected error message
		expect(consoleErrorSpy).toHaveBeenCalled();

		// Restore the original console.error function
		consoleErrorSpy.mockRestore();
	});

});
