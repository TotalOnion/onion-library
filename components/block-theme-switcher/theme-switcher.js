export default function themeswitcherJs(options = {}) {
	try {
		const {block} = options;
		const themeSwitches = block.querySelectorAll('.theme-switch');
		themeSwitches.forEach((themeSwitch) => {
			themeSwitch.addEventListener('click', () => {
				const theme = themeSwitch.getAttribute('data-themenumber');
				document.documentElement.setAttribute(
					'data-currentcolourpalette',
					`theme-${theme}`
				);
			});
		});
	} catch (error) {
		console.error(error);
	}
}
