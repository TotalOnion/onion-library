const defaultjs = function (newBlockName) {
	return `export default function ${newBlockName.replaceAll(
			'-',
			''
		)}Js ( options = {} ) {
	try {
		const { block } = options;
	} catch ( error ) {
		console.error( error );
	}
}`;
};

const defaultscss = function (newBlockName) {
	return `// @use 'NodeModules/@total_onion/onion-library/components/fields-core-mixins-v3/core-mixins-v3'; 
// @use 'NodeModules/@total_onion/onion-library/components/fields-core-functions-v3/core-functions-v3';
// @use 'NodeModules/@total_onion/onion-library/breakpoints';
.${newBlockName} {
}`;
};

export default { defaultjs, defaultscss };
export { defaultjs, defaultscss };

