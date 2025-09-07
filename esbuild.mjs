import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import assets from "./public/assetList.mjs";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

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
	entryPoints: assets,
	bundle: false,
	outdir: "./public/",
});
