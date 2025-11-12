// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
export default function backtotopbuttonJs(options = {}) {
	try {
		const {block} = options;
		const button = block.querySelector('.back-to-top-button__button');
		button.addEventListener('click', () =>
			window.scrollTo({top: 0, behavior: 'smooth'})
		);
	} catch (error) {
		console.error(error);
	}
}
