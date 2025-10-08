export default function groupcontainerv3Js(options = {}) {
	try {
		const {block} = options;

		if (document.documentElement.dataset.athenadevelopment == 'true') {
			import(
				'Assets/js/blocks/group-container-v3/group-container-v3-extra.js'
			).then((result) => {
				result.default({block: block});
			});
		}
	} catch (error) {
		console.error(error);
	}
}
