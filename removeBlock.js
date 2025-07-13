require('dotenv').config();
const fs = require('fs');
const readline = require('readline');
const { globSync } = require('glob');
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const finalAnswer = {
	yes: `\n🔫 🔫 🔫 ${process.argv[2]} has been eradicated! 🔫 🔫 🔫`,
	no: '\n🍄 🍄 🍄 No deleting took place 🍄 🍄 🍄'
};
let result = 'no';

function deleteBlockFiles(blockName) {
	fs.unlink(
		`${themePath}/assets/js/blocks/${blockName}.js`,
		(err) => {
			if (err) {
				console.error(err);
			}
		}
	);
	fs.unlink(
		`${themePath}/assets/scss/blocks/${blockName}.scss`,
		(err) => {
			if (err) {
				console.error(err);
			}
		}
	);
	if(fs.existsSync(`${themePath}/assets/scss/blocks/${blockName}`)) {
		fs.rmSync(`${themePath}/assets/scss/blocks/${blockName}`, { recursive: true })
	}
	fs.unlink(
		`${themePath}/views/blocks/${blockName}.twig`,
		(err) => {
			if (err) {
				console.error(err);
			}
		}
	);
	fs.unlink(
		`${themePath}/assets/vue/blocks/${blockName}.vue`,
		(err) => {
			if (err) {
				console.error(err);
			}
		}
	);
	if(fs.existsSync(`${themePath}/assets/vue/blocks/${blockName}`)) {
		fs.rmSync(`${themePath}/assets/vue/blocks/${blockName}`, { recursive: true })
	}
	fs.unlink(`./cypress/e2e/components/${blockName}.cy.js`, (err) => {
		if (err) {
			console.error(err);
		}
	});
	fs.unlink(
		`${themePath}/inc/acf-blocks/${blockName}.php`,
		(err) => {
			if (err) {
				console.error(err);
			}
		}
	);
	removeACFJson(blockName);
	rl.close();
}

function removeACFJson(name) {
	const existingAcfFiles = globSync(`${themePath}/acf-json/*.json`)
		.map((path) => {
			const assetKey = path
				.replace('assets/js/blocks/', '');
			return assetKey;
		});

	existingAcfFiles.forEach((file, index) => {
		let rawdata = fs.readFileSync(file);
		let blockData = JSON.parse(rawdata);
		const title = blockData.title
			.replace('Block: ', '')
			.replace(' - Library', '')
			.replaceAll(' ', '-')
			.toLowerCase();
		if (title === name) {
			const fileName = existingAcfFiles[index].replace(
				`${themePath}/acf-json/`,
				''
			);
			fs.unlink(`${themePath}/acf-json/${fileName}`, (err) => {
				if (err) {
					console.error(err);
				}
			});
			return;
		}
	});
}

rl.question(
	`Are you sure you want to completely remove this block - ${process.argv[2]} - type yes or no: `,
	function answer(answer) {
		if (answer !== 'yes') {
			result = 'no';
			rl.close();
		}
		result = 'yes';
		if(process.argv[2].indexOf("block-") === 0) {
			deleteBlockFiles(process.argv[2].split("block-")[1]);
		}
	}
);

rl.on('close', () => {
	console.log(finalAnswer[result]);
	process.exit(0);
});
