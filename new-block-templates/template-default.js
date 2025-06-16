module.exports = {
	defaultjs: function (newBlockName) {
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
	},
	defaultscss: function (newBlockName) {
		return `// @use '../fields-core-mixins/core-mixins'; 
// @use '../fields-core-functions/core-functions';
// @use '../component-breakpoints/breakpoints';
@use 'Assets/scss/blocks/${newBlockName}/${newBlockName}-extra';
.${newBlockName} {
	@include ${newBlockName}-extra.additionalStyles();
}`;
	},
	defaultextrascss: function (newBlockName) {
		return `@use '../fields-core-mixins/core-mixins'; 
@use '../fields-core-functions/core-functions';
@use '../component-breakpoints/breakpoints';
@mixin additionalStyles() {
	
}`;
	}
};
