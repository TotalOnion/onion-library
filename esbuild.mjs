import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import assets from "./public/assetList.mjs";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

// Normalize entry points so anything under a leading "public/" doesn't
// get mirrored as a nested "public/public" in the output. We do this by
// using esbuild's object form of entryPoints to control the output paths.
const entries = assets.reduce((acc, src) => {
	// Remove a leading ./public/ (or public\\) from the output key only
	// and trim any leading ./ so keys are clean relative paths.
	let key = src.replace(/^[.\/\\]*public[\/\\]/, "").replace(/^[.\/\\]+/, "");
	// If the source is an SCSS file, strip the .scss so esbuild doesn't output
	// files like name.scss.css — it will append .css automatically for CSS entries.
	key = key.replace(/\.scss$/i, "");
	acc[key] = src;
	return acc;
}, {});

await esbuild.build({
	plugins: [
		sassPlugin({
			async transform(source, resolveDir) {
				const { css } = await postcss([
					autoprefixer,
					postcssPresetEnv({ stage: 0 }),
				]).process(source);
				return css;
			},
		}),
	],
	entryPoints: entries,
	bundle: false,
	outdir: "./public/",
});
