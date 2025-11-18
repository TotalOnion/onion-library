import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import assets from "./public/assetList.mjs";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
// Simplified build: separate SCSS and JS passes to avoid key collisions and post-build renames.

// Split sources.
const scssSources = assets.filter((a) => a.endsWith(".scss"));
const jsSources = assets.filter((a) => /\.(?:js|mjs)$/.test(a));

// Helper: flatten leading ./, remove leading public/ or components/.
function flattenPath(p) {
	return p
		.replace(/^\.\//, "")
		.replace(/^public\//, "")
		.replace(/^components\//, "");
}

// Create entry maps: drop extension so esbuild appends single correct one.
const scssEntries = scssSources.reduce((acc, src) => {
	acc[flattenPath(src).replace(/\.scss$/i, "")] = src;
	return acc;
}, {});
const jsEntries = jsSources.reduce((acc, src) => {
	acc[flattenPath(src).replace(/\.(?:js|mjs)$/i, "")] = src;
	return acc;
}, {});

// SCSS build (outputs .css files)
await esbuild.build({
	entryPoints: scssEntries,
	plugins: [
		sassPlugin({
			async transform(source) {
				const { css } = await postcss([
					autoprefixer,
					postcssPresetEnv({ stage: 0 }),
				]).process(source);
				return css;
			},
		}),
	],
	bundle: false,
	outdir: "./public",
});

// JS build (outputs .js files)
await esbuild.build({
	entryPoints: jsEntries,
	bundle: false,
	outdir: "./public",
});
