/* eslint-disable no-restricted-syntax */
import lazyloader from '@total_onion/onion-loader/onion-loader';
import(
	'../fields-core-wordpress-block-editor-preview-v3/core-wordpress-block-editor-preview-v3.scss'
);

import jQuery from 'jquery';
const $ = jQuery;

function setPageBgColour(colourType) {
	if (colourType !== 'custom') {
		document
			.querySelector('body')
			.style.setProperty('--page-background-colour', colourType);
	} else {
		requestAnimationFrame(() => {
			const customColour = $(`[data-name=page_background_colour]`).find(
				'input[type=hidden]'
			)[0]?.value;
			document
				.querySelector('body')
				.style.setProperty('--page-background-colour', customColour);
		});
	}
}
$(document).ready(function ($) {
	let colourTypeSelect = $(`[data-name=page_background_colour_type] select`);

	if (colourTypeSelect.length !== 0) {
		let colourType = colourTypeSelect
			.find(':selected')[0]
			.value.replace('__', '');

		colourTypeSelect.on('select2:select', function (event) {
			colourType = colourTypeSelect
				.find(':selected')[0]
				.value.replace('__', '');
			setPageBgColour(colourType);
		});

		setPageBgColour(colourType);
		// return;
	}

	const themeSelectNames = ['page_theme'];
	const colourData = globalThis.colourconfig;
	colourSetup(colourData);
	coreEditorThemeSelect(themeSelectNames);
	wordpressPreviewJs({lazyloaderFilepath: 'js/blocks/'});

	document.documentElement.insertAdjacentHTML('afterbegin', previewvars[0]);
	document.documentElement.insertAdjacentHTML(
		'afterbegin',
		coretypography[0]
	);
	document.documentElement.insertAdjacentHTML(
		'afterbegin',
		corefontmodifiers[0]
	);
	document.documentElement.insertAdjacentHTML('afterbegin', corethemes[0]);
	document.documentElement.insertAdjacentHTML('afterbegin', corecta[0]);

	setTimeout(() => {
		const previewToggle = document.querySelector(
			'.editor-preview-dropdown__toggle'
		);
		previewToggle.addEventListener('click', () => {
			setTimeout(() => {
				const resizeButtons = document.querySelectorAll(
					'.components-menu-item__button'
				);
				resizeButtons.forEach((button) => {
					button.addEventListener('click', () => {
						setTimeout(() => {
							let frame = document.querySelector(
								'.edit-post-visual-editor iframe'
							);
							frame.contentWindow.document.documentElement.insertAdjacentHTML(
								'afterbegin',
								coretypography[0]
							);
							frame.contentWindow.document.documentElement.insertAdjacentHTML(
								'afterbegin',
								previewvars[0]
							);
							frame.contentWindow.document.documentElement.insertAdjacentHTML(
								'afterbegin',
								corefontmodifiers[0]
							);
							frame.contentWindow.document.documentElement.insertAdjacentHTML(
								'afterbegin',
								corecta[0]
							);
							frame.contentWindow.document.documentElement.insertAdjacentHTML(
								'afterbegin',
								corethemes[0]
							);
							let currentTheme =
								document.documentElement.getAttribute(
									'data-currentcolourpalette'
								);
							frame.contentWindow.document.documentElement.setAttribute(
								'data-currentcolourpalette',
								currentTheme
							);
						}, 1000);
					});
				});
			}, 1000);
		});
	}, 2000);
});

function wordpressPreviewJs(
	options = {lazyloaderFilepath: '', enableLazyloading: true}
) {
	function launchLazyloader(elements) {
		lazyloader.options.assetArray = [];
		elements.forEach((el) => {
			lazyloader.options.assetArray.push({
				assetKey: el.dataset.assetkey ?? ''
			});
		});
		lazyloader.options.ignoreCss = true; // the css for the preview is all in the preview.scss file
		lazyloader.options.lazy = options.enableLazyloading;
		if (options.lazyloaderFilepath) {
			lazyloader.options.filePath = options.lazyloaderFilepath;
		}
		lazyloader.options.debugLogMessages = false;
		lazyloader.lazyloaderInit();
	}

	function observeContainer(element) {
		const targetNode = element;
		const config = {
			childList: true,
			subtree: true
		};
		let notLoaded = targetNode.querySelectorAll('section:not(.loaded)');
		launchLazyloader(notLoaded);

		const observer = new MutationObserver(() => {
			notLoaded = targetNode.querySelectorAll('section:not(.loaded)');
			if (notLoaded && notLoaded.length > 0) {
				launchLazyloader(notLoaded);
			}
		});
		observer.observe(targetNode, config);
	}

	function waitForContainer() {
		const containerCheck = setInterval(() => {
			const container = document.querySelector(
				'.block-editor-block-list__layout.is-root-container'
			);
			if (container) {
				observeContainer(container);
				clearInterval(containerCheck);
			}
		}, 300);
	}
	waitForContainer();
}

function coreEditorThemeSelect(selectNames) {
	if (typeof acf != 'undefined') {
		acf.addAction(
			'select2_init',
			function ($select, args, settings, field) {
				if (selectNames.find((name) => name === field.data.name)) {
					const selected = $select.find(':selected').val()
						? $select.find(':selected').val().replace('__', '')
						: null;
					$select.val(selected);
				}
			}
		);
	}
}

function colourSetup(colourData) {
	try {
		let paletteSelect = getPaletteSelect(['page_theme']);
		let colourPalette = getColourPalette(paletteSelect, colourData);
		if (!colourPalette) return;
		let acfPaletteFields = [];

		if (typeof acf != 'undefined') {
			// This runs only once when the colour pickers initialize
			acf.add_filter('color_picker_args', function (args, field) {
				acfPaletteFields.push(field);
				args.palettes = colourPalette.colours;
				return args;
			});
		}

		// Listener for when you change palette in the admin
		if (paletteSelect) {
			jQuery(paletteSelect).on('select2:select', function (event) {
				let colourPalette = getColourPalette(paletteSelect, colourData);
				updatePickerInputs(colourPalette, acfPaletteFields);
			});
		}
	} catch (error) {
		console.log(error);
	}

	/**
	 * getPaletteSelect
	 *
	 * @param {array} selectFieldNames An array containing the names of the acf pickers
	 * @returns {HTMLElement} The current picker to listen for changes
	 */
	function getPaletteSelect(selectFieldNames) {
		let selectElement;
		selectFieldNames.forEach((name) => {
			document.querySelector(`[data-name=${name}] select`)
				? (selectElement = document.querySelector(
						`[data-name=${name}] select`
				  ))
				: false;
		});
		return selectElement;
	}

	/**
	 * getColourPalette
	 *
	 * @param {HTMLElement} select
	 * @param {object} paletteData
	 * @returns {array} An array of colours as hex strings.
	 */
	function getColourPalette(select, paletteData) {
		let coloursArray = [];
		const defaultTheme = paletteData['default-theme'];
		if (
			select &&
			select.value &&
			Number(paletteData['enable-custom-theme'] > 0)
		) {
			document.querySelector(
				'html'
			).dataset.currentcolourpalette = `theme-${select.value.replace(
				'__',
				''
			)}`;
			coloursArray =
				paletteData[`theme-${select.value.replace('__', '')}`];
		} else {
			coloursArray = paletteData[`theme-${defaultTheme}`];
			document.querySelector(
				'html'
			).dataset.currentcolourpalette = `theme-${defaultTheme}`;
		}

		return coloursArray;
	}

	/**
	 * updatePickerInputs
	 *
	 * @param {array} colourData The current colour palette to apply to the acf pickers.
	 * @param {array} fields The acf picker elements to apply the palettes to.
	 */
	function updatePickerInputs(colourData = [], fields = []) {
		fields.forEach((field) => {
			jQuery(field).find('input.wp-color-picker').iris({
				palettes: colourData.colours
			});
			jQuery(field).find('input.wp-picker-clear').trigger('click');
		});
	}
}
