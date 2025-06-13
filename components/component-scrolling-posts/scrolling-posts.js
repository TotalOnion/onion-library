export default function scrollingpostsJs(options) {
	const {block} = options;
	if (!block) {
		return;
	}

	const scrollerElement = block.querySelector('.scrolling-posts');
	if (!scrollerElement) {
		return;
	}

	import(
		'Assets/scss/modules/library-modules/scrolling-posts/scrolling-posts.scss'
	).then(() => {
	});
}