export default function contentContainerJs(block) {
	if (!block) {
		return;
	}
	const blockClassName = block.dataset.assetkey;
	const formContainerElement = block.querySelector('.form-container');
	const modalFormContainerElement = block.querySelector(
		'.form-container__modal'
	);
	const countdownElement = block.querySelector('.countdowndate');
	const socialMediaElement = block.querySelector('.social-media-share-popup');
	// const accordionV3Element = block.querySelector(
	// 	'.standard-content-v2__accordion-v3'
	// );

	// if (formContainerElement || modalFormContainerElement) {
	// 	import(
	// 		'Assets/js/modules/library-modules/form-selection/form-selection.js'
	// 	).then((module) => {
	// 		module.default(block);
	// 	});
	// }

	// if (countdownElement) {
	// 	import('Assets/js/modules/library-modules/countdown/countdown.js').then(
	// 		(module) => {
	// 			module.default(block);
	// 		}
	// 	);
	// }

	// if (socialMediaElement) {
	// 	import(
	// 		'Assets/js/modules/library-modules/social-media-share/social-media-share.js'
	// 	).then((module) => {
	// 		module.default(block);
	// 	});
	// }
}
