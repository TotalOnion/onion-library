import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import assets from "./public/assetList.mjs";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

const scssSources = assets.filter((a) => a.endsWith(".scss"));
const cssSources = assets.filter((a) => a.endsWith(".css"));
const jsSources = assets.filter((a) => /\.(?:js|mjs)$/.test(a));

function flattenPath(p) {
	return p
		.replace(/^\.\//, "")
		.replace(/^public\//, "")
		.replace(/^components\//, "");
}

const scssEntries = scssSources.reduce((acc, src) => {
	acc[flattenPath(src).replace(/\.scss$/i, "")] = src;
	return acc;
}, {});
const cssEntries = cssSources.reduce((acc, src) => {
	acc[flattenPath(src).replace(/\.css$/i, "")] = src;
	return acc;
}, {});
const jsEntries = jsSources.reduce((acc, src) => {
	acc[flattenPath(src).replace(/\.(?:js|mjs)$/i, "")] = src;
	return acc;
}, {});

await esbuild.build({
	entryPoints: ["./public/publicBundleBase.scss"],
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

await esbuild.build({
	entryPoints: scssEntries,
	plugins: [
		sassPlugin({
			async transform(source) {
				const { css } = await postcss([
					autoprefixer,
					postcssPresetEnv({ stage: 0, from: "css" }),
				]).process(source);
				return css;
			},
		}),
	],
	bundle: false,
	outdir: "./public",
});

await esbuild.build({
	entryPoints: cssEntries,
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

await esbuild.build({
	entryPoints: jsEntries,
	bundle: false,
	outdir: "./public",
});
