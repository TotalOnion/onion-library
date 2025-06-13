const glob = require('glob');
const libraryPath =
	'./node_modules/@pernod-ricard-global-cms/cbl-component-library';

const componentsList = glob.sync(`${libraryPath}/components/*`).map((path) => {
	const assetKey = path.replace(`${libraryPath}/components/`, '');
	return assetKey;
});
console.log('The list of available components is', componentsList);
