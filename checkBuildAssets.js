/* eslint-disable global-require */
require('dotenv').config();
const fs = require( 'fs' );
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

const paths = {
	createJsAssets:
		`${themePath}/assets/js/modules/jsAssets.js`,
	createPreviewScss:
	`${themePath}/assets/scss/modules/dynamicBlocksPreview.scss`,
};

Object.keys( paths ).forEach( ( key ) => {
	if ( ! fs.existsSync( paths[ key ] ) ) {
		console.log( `creating missing assets with ${ key }` );
		require( 'child_process' ).fork( `./node_modules/@pernod-ricard-global-cms/jsbuildutils/${ key }.js` );
	}
} );
