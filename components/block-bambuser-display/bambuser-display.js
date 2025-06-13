export default function bambuserdisplayJs(options = {}) {
	try {
		const {block} = options;
		const blockdata = block.dataset;
		let bambuserUrl = '';
		switch (blockdata.location) {
			case 'eu':
				bambuserUrl = 'lcx-embed-eu';

				break;
			case 'global':
				bambuserUrl = 'lcx-embed';

				break;

			default:
				break;
		}
		// Create a new script element
		let script = document.createElement('script');

		// Set the type and src attributes
		script.type = 'text/javascript';
		script.src = `https://${bambuserUrl}.bambuser.com/default/embed.js`;

		// Ensure the script is loaded asynchronously
		script.async = true;

		// Find the footer element
		let footer = document.querySelector('footer');

		// If the footer exists, append the script
		if (footer) {
			footer.appendChild(script);
		} else {
			console.warn('Footer element not found. Script not added.');
		}

		// Call the function to load the script
	} catch (error) {
		console.error(error);
	}
}
