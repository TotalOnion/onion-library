export default function templateJsBlank(newBlockName) {
	return `export default function ${newBlockName.replaceAll(
			'-',
			''
		)}(options = {}) {
	try {
		const {block} = options;
	} catch (error) {
		console.error(error);
	}
}`;
}
