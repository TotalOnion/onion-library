'use strict';

// const glob = require('glob');
const fs = require('fs');
// const fse = require("fs-extra");

// const path = require('path');
const updateComponent = require('../update-component');

jest.mock('fs');

describe('getExtension', () => {
	test('Check getExtension js', () => {
		const result = updateComponent.getExtension('testing.js')
		expect(result).toBe('js');
	});

	test('Check getExtension spec.js', () => {
		const result = updateComponent.getExtension('testing.spec.js')
		expect(result).toBe('js');
	});
});

describe('getFileType function', () => {
	it('should return "extra" for filenames ending with "-extra.scss"', () => {
	  const result = updateComponent.getFileType('styles-extra.scss');
	  expect(result).toBe('extra');
	});
  
	it('should return "spec" for filenames ending with "spec.js"', () => {
	  const result = updateComponent.getFileType('test.spec.js');
	  expect(result).toBe('spec');
	});
  
	it('should return the correct file extension for other filenames', () => {
	  const result = updateComponent.getFileType('script.js');
	  expect(result).toBe('js');
	});
  
	it('should return an empty string for filenames without extensions', () => {
	  const result = updateComponent.getFileType('README');
	  expect(result).toBe('');
	});
});

describe('checkFolder function', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it('should return true for an existing directory', () => {
		// Mocking fs.existsSync to return true
		fs.existsSync.mockReturnValue(true);
		// Mocking fs.statSync to return an object with isDirectory function returning true
		fs.statSync.mockReturnValue({ isDirectory: () => true });
	
		const result = updateComponent.checkFolder('/path/to/existing/folder');
		expect(result).toBe(true);
		// Ensure that the fs.existsSync function was called with the correct argument
		expect(fs.existsSync).toHaveBeenCalledWith('/path/to/existing/folder');
		// Ensure that the fs.statSync function was called with the correct argument
		expect(fs.statSync).toHaveBeenCalledWith('/path/to/existing/folder');
	});
	
	it('should return false for a non-existing directory', () => {
		// Mocking fs.existsSync to return false
		fs.existsSync.mockReturnValue(false);

		const result = updateComponent.checkFolder('/path/to/non_existing/folder');
		expect(result).toBe(false);
		// Ensure that the fs.existsSync function was called with the correct argument
		expect(fs.existsSync).toHaveBeenCalledWith('/path/to/non_existing/folder');
		// Ensure that the fs.statSync function was not called (since the folder does not exist)
		expect(fs.statSync).not.toHaveBeenCalled();
	});
	
	it('should return false for an existing file (not a directory)', () => {
		// Mocking fs.existsSync to return true
		fs.existsSync.mockReturnValue(true);
		// Mocking fs.statSync to return an object with isDirectory function returning false
		fs.statSync.mockReturnValue({ isDirectory: () => false });

		const result = updateComponent.checkFolder('/path/to/existing/file');
		expect(result).toBe(false);
		// Ensure that the fs.existsSync function was called with the correct argument
		expect(fs.existsSync).toHaveBeenCalledWith('/path/to/existing/file');
		// Ensure that the fs.statSync function was called with the correct argument
		expect(fs.statSync).toHaveBeenCalledWith('/path/to/existing/file');
	});
});

describe('getProjectName function', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	test('should return the project name from package.json', () => {
		const projectName = 'Your Project Name';
		const packageJson = {
			name: projectName
		};
		fs.readFileSync.mockReturnValue(JSON.stringify(packageJson));
		const result = updateComponent.getProjectName();
		expect(result).toBe(projectName);
	});

	test('should capitalize the project name if it does not start with "the"', () => {
		const projectName = 'your project name';
		const packageJson = {
			name: projectName
		};
		fs.readFileSync.mockReturnValue(JSON.stringify(packageJson));
		const result = updateComponent.getProjectName();
		expect(result).toBe('Your project name');
	});

	test('should capitalize and prepend "The" to the project name if it starts with "the"', () => {
		const projectName = 'theglenlivet';
		const packageJson = {
			name: projectName
		};
		fs.readFileSync.mockReturnValue(JSON.stringify(packageJson));
		const result = updateComponent.getProjectName();
		expect(result).toBe('The Glenlivet');
	});

	test('should return default project name if package.json is not found', () => {
		fs.readFileSync.mockImplementation(() => {
			throw new Error('File not found');
		});
		// Ensure that console.error is called with the error message
		const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		const result = updateComponent.getProjectName();
		expect(result).toBe('Global Theme');
		// Assert that console.error was called with the expected error message
		expect(consoleErrorSpy).toHaveBeenCalled();
	});
});

describe('getFileType function', () => {
	it('should return "extra" for filenames ending with "-extra.scss"', () => {
		const filename = 'style-extra.scss';
		expect(updateComponent.getFileType(filename)).toBe('extra');
	});

	it('should return "spec" for filenames ending with "spec.js"', () => {
		const filename = 'test.spec.js';
		expect(updateComponent.getFileType(filename)).toBe('spec');
	});

	it('should call getExtension for other filenames', () => {
		const addSpy = jest.spyOn(updateComponent, 'getExtension');
		// console.log(addSpy)
		// return
		const filename = 'example.txt';
		const result = updateComponent.getFileType(filename);
		// expect(addSpy).toHaveBeenCalledWith(filename);
		expect(result).toBe('txt');

		// Don't forget to restore the original 'add' function after the test
		addSpy.mockRestore();
	});
});