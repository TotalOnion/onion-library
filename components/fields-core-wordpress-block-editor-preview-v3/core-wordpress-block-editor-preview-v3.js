// import wppreview from '@pernod-ricard-global-cms/wordpresspreview';
import colourPalettes from '@pernod-ricard-global-cms/cblcolourpalettes';
// import ctaStyles from 'Assets/js/modules/library-modules/core-editor-cta-style-select/core-editor-cta-style-select.js';
// import themeNames from 'Assets/js/modules/library-modules/core-editor-theme-select/core-editor-theme-select.js';
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

	const ctaSelectNames = [
		'cta_style',
		'load_more_button_style',
		'category_button_style',
		'active_category_button_style',
		'top_level_category_button_style',
		'show_all_button_style',
		'toggle_filter_button_style'
	];
	const themeSelectNames = ['page_theme'];
	const colourData = globalThis.colourconfig;
	colourPalettes(colourData);
	// ctaStyles(ctaSelectNames);
	// themeNames(themeSelectNames);
	wppreview({lazyloaderFilepath: 'js/blocks/'});

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
