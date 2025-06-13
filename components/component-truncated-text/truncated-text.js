export default function truncatedtextJs(block) {
	try {
		const container = block.querySelector('.truncated-text');
		const toggle = block.querySelector('.truncated-text__toggle');
		const previewText = block.querySelector('.truncated-text__preview');
		const remainderText = block.querySelector(
			'.truncated-text__remainder-text'
		);

		const toggleOpen = () => {
			container.setAttribute('open', '');
			const sectionHeight = remainderText.scrollHeight;
			const speed = 0.5;
			const time = sectionHeight / speed;
			remainderText.animate(
				[
					{height: '0px'},
					{
						height: sectionHeight + 'px'
					}
				],
				{
					fill: 'forwards',
					duration: time,
					easing: 'ease-out'
				}
			);
		};

		const toggleClose = () => {
			container.removeAttribute('open');
			const sectionHeight = remainderText.scrollHeight;
			const speed = 0.5;
			const time = sectionHeight / speed;
			remainderText.animate(
				[
					{
						height: sectionHeight + 'px'
					},
					{height: '0px'}
				],
				{
					fill: 'forwards',
					duration: time,
					easing: 'ease-out'
				}
			);
			returnToTop();
		};

		const returnToTop = () => {
			const viewportHeight = previewText.getBoundingClientRect();
			const viewportHeightBottom = viewportHeight.bottom;
			if (viewportHeightBottom < 0) {
				container.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		};

		const toggleSet = () => {
			if (container.hasAttribute('open')) {
				toggleClose();
			} else {
				toggleOpen();
			}
		};

		toggle.addEventListener('click', () => {
			toggleSet();
		});
	} catch (error) {
		console.error(error);
	}
}
