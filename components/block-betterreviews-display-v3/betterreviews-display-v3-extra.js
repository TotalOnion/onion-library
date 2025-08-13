export default function (block) {
	const betterReviewsCta = block.querySelector('.better-reviews__cta');
	betterReviewsCta.classList.add(
		'cmpl-cta-style-11',
		'cmpl-cta-animation-style-1'
	);

	const span = document.createElement('span');
	span.className = 'cmpl-cta-span';
	span.textContent = betterReviewsCta.textContent.trim();
	betterReviewsCta.textContent = '';
	betterReviewsCta.appendChild(span);
}
