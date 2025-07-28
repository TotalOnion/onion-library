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
		return `// @use 'Assets/scss/modules/library-modules/core-mixins-v3/core-mixins-v3'; 
// @use 'Assets/scss/modules/library-modules/core-functions-v3/core-functions-v3';
// @use 'Assets/scss/theme/breakpoints';
@use 'Assets/scss/blocks/${newBlockName}/${newBlockName}-extra';
.${newBlockName} {
	@include ${newBlockName}-extra.additionalStyles();
}`;
	},
	defaultextrascss: function (newBlockName) {
		return `@use 'Assets/scss/modules/library-modules/core-mixins-v3/core-mixins-v3'; 
@use 'Assets/scss/modules/library-modules/core-functions-v3/core-functions-v3';
@use 'Assets/scss/theme/breakpoints';
@mixin additionalStyles() {
	
}`;
	}
};
