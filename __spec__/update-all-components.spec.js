'use strict';

const glob = require('glob');
const fs = jest.mock('fs');
const updateAllComponents = require('../update-all-components');

describe('getComponentsList', () => {
	afterEach(() => {
		jest.resetModules(); // Reset all mocked modules after each test
	});

	it('returns the correct components list when project-components-list.json is found', () => {
		const projectComponentsList = {
			"block": [
				"accordion",
				"standard-content-v2"
			],
			"fields": [
				"video-standard",
				"responsive-show-hide"
			],
			"admin": [
				"filter-pages-by-block",
				"resizable-editor-sidebar"
			]
		};

		jest.mock('fs', () => ({
			existsSync: jest.fn().mockReturnValue(true),
			readFileSync: jest
				.fn()
				.mockReturnValue(JSON.stringify(projectComponentsList)),
		}));

		const result = updateAllComponents.getComponentsList();

		// random order
		result.map(m => expect([
			"block-accordion",
			"block-standard-content-v2",

			"admin-core-mixins",
			"admin-core-design-system",
			"admin-core-generic",
			"admin-core-critical",
			"admin-core-functions",

			"admin-filter-pages-by-block",
			"admin-resizable-editor-sidebar",
			"fields-video-standard",
			"fields-responsive-show-hide",

			"admin-core-cta",
			"admin-core-root-variables",
			"admin-core-css-sizing-vars",
			"admin-core-colour-data-config",
			"admin-core-wordpress-block-editor-preview",
			"admin-core-editor-cta-style-select",
			"admin-core-gradient-designer",
			"admin-core-typography",
		]).toContain(m));
	});

	it('returns the correct components list when project-components-list.json is not found', () => {
		jest.mock('fs', () => ({
			existsSync: jest.fn().mockReturnValue(false), // Simulate 'project-components-list.json' not existing
		}));

		jest.mock('glob', () => ({
			// mock components in the filesystem
			sync: jest.fn().mockReturnValue([
				`./node_modules/@pernod-ricard-global-cms/cbl-component-library/components/component1`,
				`./node_modules/@pernod-ricard-global-cms/cbl-component-library/components/component2`,
			]),
		}));
		const result = updateAllComponents.getComponentsList();

		// random order
		result.map(m => expect([
			"admin-core-mixins",
			"admin-core-design-system",
			"admin-core-generic",
			"admin-core-critical",
			"admin-core-functions",

			"component1",
			"component2",
			
			"admin-core-cta",
			"admin-core-root-variables",
			"admin-core-css-sizing-vars",
			"admin-core-colour-data-config",
			"admin-core-wordpress-block-editor-preview",
			"admin-core-editor-cta-style-select",
			"admin-core-gradient-designer",
			"admin-core-typography",
		]).toContain(m));
	});
});
