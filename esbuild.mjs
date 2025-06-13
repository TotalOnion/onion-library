import * as esbuild from "esbuild";

// const coreEntrypoints = 

// const coreEntrypoints = globSync(
// 	`./components/js/market-specific/*.js`
// ).reduce((acc, fullPath) => {
// 	const entry = fullPath.replace(`assets/js/market-specific/`, '');
// 	console.log(entry.substring(0, entry.length - 3));
// 	acc[entry.substring(0, entry.length - 3)] = `./${fullPath}`;
// 	return acc;
// }, {});

await esbuild.build({
	entryPoints: ["./components/block-back-to-top-button/back-to-top-button.js","./components/block-divider/divider.js"],
	bundle: false,
	outdir: "./public/",
});
