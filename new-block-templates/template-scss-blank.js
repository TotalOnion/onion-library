module.exports = function (newBlockName, projectName) {
	return `// @use 'NodeModules/@total_onion/onion-library/components/fields-core-mixins-v3/core-mixins-v3'; 
// @use 'NodeModules/@total_onion/onion-library/components/fields-core-functions-v3/core-functions-v3';
// @use 'NodeModules/@total_onion/onion-library/breakpoints';
	.${newBlockName} {}`;
};
