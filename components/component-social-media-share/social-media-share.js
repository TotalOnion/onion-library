export default function socialMediaShareJs(block) {
	if (!block) {
		return;
	}
	const socialShareWrap = block.querySelectorAll(
		`.social-media-share-popup dialog .dialog-actions .wrapper-content a.social-media-copylink`
	);
	if (!socialShareWrap) {
		return;
	}

	socialShareWrap.forEach((singleShare) => {
		singleShare.addEventListener(
			'click',
			function (e) {
				handleClick(block, e, this.dataset.url);
			},
			false
		);
	});
	const shareButtons = document.getElementsByClassName(
		'social-media-share-native'
	);

	for (let button of shareButtons) {
		button.addEventListener('click', async function (event) {
			event.preventDefault();

			if (navigator.share) {
				try {
					await navigator.share({
						title: document.title,
						url: window.location.href
					});
				} catch (error) {
					console.error('Error sharing:', error);
				}
			} else {
				navigator.clipboard
					.writeText(window.location.href)
					.then(() => {
						alert('Link copied to clipboard!');
					})
					.catch((err) => {
						console.error('Failed to copy: ', err);
					});
			}
		});
	}
}

async function handleClick(block, e, url) {
	e.preventDefault();
	try {
		navigator.clipboard.writeText(url);
		block.querySelector(
			'.social-media-share-popup dialog .dialog-actions .wrapper-content .social-media-message'
		).style.display = 'flex';
		setTimeout(function () {
			block.querySelector(
				'.social-media-share-popup dialog .dialog-actions .wrapper-content .social-media-message'
			).style.display = 'none';
		}, 2000);
	} catch (err) {
		console.error('Failed to copy!', err);
	}
	console.log('Yay! Copied to clipboard.');
	return false;
}
