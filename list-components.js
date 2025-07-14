const glob = require('glob');
const libraryPath =
  './node_modules/@total_onion/onion-library'

const componentsList = glob.sync(`${libraryPath}/components/*`).map((path) => {
	const assetKey = path.replace(`${libraryPath}/components/`, '');
	return assetKey;
});
console.log('The list of available components is', componentsList);
