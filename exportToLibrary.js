require('dotenv').config();
const fs = require('fs');
const fse = require('fs-extra');
const { globSync } = require('glob');
const yargs = require('yargs');
const path = require('path');
const templateOptions = yargs.argv._;
const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

// paths for blocks
const srcPathJsBlock = `${themePath}/assets/js/blocks/`;
const srcPathScssBlock = `${themePath}/assets/scss/blocks/`;
const srcPathTwigBlock = `${themePath}/views/blocks/`;
const srcPathPhpBlock = `${themePath}/inc/acf-blocks/`;
const srcPathVueBlock = `${themePath}/assets/vue/blocks/`;

// paths for components
const srcPathJsComponent = `${themePath}/assets/js/modules/library-modules`;
const srcPathScssComponent = `${themePath}/assets/scss/modules/library-modules`;
const srcPathTwigComponent = `${themePath}/views/components`;

// paths for fields
const srcPathJsFields = `${themePath}/assets/js/modules/library-modules`;
const srcPathScssFields = `${themePath}/assets/scss/modules/library-modules`;
const srcPathPhpFields = `${themePath}/inc/admin-extras`;
const srcPathTwigFields = `${themePath}/views/components`;

// paths for controller
const srcPathCssController = `${themePath}/assets/css/`;
const srcPathTwigController = `${themePath}/views/components/`;
const srcPathPhpController = `${themePath}/controller/`;

// path for security files
const srcPathPhpSecurity = `${themePath}/inc/security-extras`;

// path for seopress files
const srcPathPhpSeopress = `${themePath}/inc/seo-extras`;

const destPath = path.join(
    __dirname,
    '../../../../../../../../onion-library/components/'
);

const bColors = {
    HEADER: '\033[95m',
    OKBLUE: '\033[94m',
    OKGREEN: '\033[92m',
    WARNING: '\033[93m',
    FAIL: '\033[91m',
    ENDC: '\033[0m',
    BOLD: '\033[1m',
    UNDERLINE: '\033[4m',
    ORANGE: '\033[93m',
    MAGENTA: '\033[95m',
    CYAN: '\033[96m'
};

const icons = {
    SMILE: '\uD83D\uDE00',
    BEER_MUG: '\uD83C\uDF7A',
    BEER_CHEERS: '\uD83C\uDF7B',
    CROWN: '\uD83D\uDC51',
    CLAP_HANDS: '\uD83D\uDC4F',
    CROSS_MARK: '\u274C'
};

if (!fs.existsSync(`${destPath}`)) {
    console.error('❌ Please check the library component path.');
    process.exit(1);
}

templateOptions.forEach((componentName) => {
    let componentType = '';
    let component = '';
    
    if (componentName.startsWith('block-')) {
        componentType = 'block';
        component = componentName.substring(6);
    } else if (componentName.startsWith('component-')) {
        componentType = 'component';
        component = componentName.substring(10);
    } else if (componentName.startsWith('fields-')) {
        componentType = 'fields';
        component = componentName.substring(7);
    } else if (componentName.startsWith('controller-')) {
        componentType = 'controller';
        component = componentName.substring(11);
    } else if (componentName.startsWith('security-')) {
        componentType = 'security';
        component = componentName.substring(9);
    } else if (componentName.startsWith('seopress-')) {
        componentType = 'seopress';
        component = componentName.substring(9);
    } else {
        console.error(`${bColors.FAIL}Invalid component type. Use block-, component- or fields- prefixes.${bColors.ENDC}`);
        process.exit(1);
    }

    let isValid = validateComponentExists(component, componentType);
    if (!isValid) {
        console.log(`${bColors.OKBLUE}${componentName} : ${bColors.FAIL}[INVALID] Component does not exist${bColors.ENDC}`);
        return;
    }

    let success = 0;
    if (componentType === 'block') {
        success = copyBlockContent(`${destPath}block-${component}/`, component);
    } else if (componentType === 'component') {
        success = copyComponentContent(`${destPath}component-${component}/`, component);
    } else if (componentType === 'fields') {
        success = copyFieldsContent(`${destPath}fields-${component}/`, component);
    } else if (componentType === 'controller') {
        success = copyControllerContent(`${destPath}controller-${component}/`, component);
    } else if (componentType === 'security') {
        success = copySecurityContent(`${destPath}security-${component}/`, component);
    } else if (componentType === 'seopress') {
        success = copySeopressContent(`${destPath}seopress-${component}/`,component);
    }

    if (success === 1) {
        console.log(`${bColors.OKBLUE}${componentName} : ${bColors.OKGREEN}[OK]${bColors.ENDC}`);
		console.log(`${bColors.CYAN}` + '---------------------------------------');
		console.log(
			'\x1b[32m',
			`👑 👑 👑 Hurrah!${icons.BEER_CHEERS} You successfully exported all blocks to Library 👑 👑 👑`
		);
    } else {
        console.log(`${bColors.OKBLUE}${componentName} : ${bColors.FAIL}[PARTIAL/FAIL]${bColors.ENDC}`);
    }
});

function validateComponentExists(component, type) {
    let exists = false;
    if (type === 'block') {
        exists = fs.existsSync(`${srcPathJsBlock}${component}.js`) ||
            fs.existsSync(`${srcPathScssBlock}${component}.scss`) ||
            fs.existsSync(`${srcPathTwigBlock}${component}.twig`) ||
            fs.existsSync(`${srcPathPhpBlock}${component}.php`) ||
            fs.existsSync(`${srcPathVueBlock}${component}`) ||
            fs.existsSync(`${srcPathVueBlock}${component}.vue`);
    } else if (type === 'component') {
        exists = fs.existsSync(`${srcPathTwigComponent}/${component}.twig`) ||
            fs.existsSync(`${srcPathScssComponent}/${component}/${component}.scss`) ||
            fs.existsSync(`${srcPathJsComponent}/${component}/${component}.js`);
    } else if (type === 'fields') {
        exists = fs.existsSync(`${srcPathPhpFields}/${component}.php`) ||
            fs.existsSync(`${srcPathJsFields}/${component}/${component}.js`) ||
            fs.existsSync(`${srcPathTwigFields}/${component}.twig`) ||
            fs.existsSync(`${srcPathScssFields}/${component}/${component}.scss`);
    } else if (type === 'controller') {
        exists = fs.existsSync(`${srcPathCssController}${component}.css`) ||
                 fs.existsSync(`${srcPathPhpController}${component}.php`) ||
                 fs.existsSync(`${srcPathTwigController}${component}.twig`);
    } else if (type === 'security') {
        exists = fs.existsSync(`${srcPathPhpSecurity}/${component}.php`);
    } else if (type === 'seopress') {
        exists = fs.existsSync(`${srcPathPhpSeopress}/${component}.php`);
    }
    
    const acfJsonFiles = globSync(`${themePath}/acf-json/*.json`);
    const acfJsonExists = acfJsonFiles.some((file) => {
        let rawdata = fs.readFileSync(file);
        let blockData = JSON.parse(rawdata);
        const title = blockData.title
            .replace(/(Block: |Component: |Fields: |Options: )/, '')
            .replace(' - Library', '')
            .replaceAll(' ', '-')
            .toLowerCase();
        return title === component;
    });

    return exists || acfJsonExists;
}

function copyBlockContent(destDir, blockName) {
    let SUCCESS = 0;
    if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true, force: true });
    }

    if (!fs.existsSync(destDir)) {
        try {
            fs.mkdirSync(destDir);
            if (fs.existsSync(`${srcPathJsBlock}${blockName}.js`)) {
                fs.copyFileSync(`${srcPathJsBlock}${blockName}.js`, `${destDir}${blockName}.js`);

                const extraJsPath = `${srcPathJsBlock}/${blockName}/${blockName}-extra.js`;
                if(fs.existsSync(extraJsPath)) {
                    fs.copyFileSync(extraJsPath, `${destDir}${blockName}-extra.js`);
                }
            }
            if (fs.existsSync(`${srcPathScssBlock}${blockName}.scss`)) {
                fs.copyFileSync(`${srcPathScssBlock}${blockName}.scss`, `${destDir}${blockName}.scss`);
            }
            if (fs.existsSync(`${srcPathScssBlock}${blockName}/${blockName}-extra.scss`)) {
                fs.copyFileSync(`${srcPathScssBlock}${blockName}/${blockName}-extra.scss`, `${destDir}${blockName}-extra.scss`);
            }
            if (fs.existsSync(`${srcPathTwigBlock}${blockName}.twig`)) {
                fs.copyFileSync(`${srcPathTwigBlock}${blockName}.twig`, `${destDir}${blockName}.twig`);
            }

            const blockSubfolderDir = `${srcPathTwigBlock}${blockName}`;
            const destBlockSubfolderDir = `${destDir}${blockName}`;

            if (fs.existsSync(blockSubfolderDir) && fs.statSync(blockSubfolderDir).isDirectory()) {

                if (!fs.existsSync(destBlockSubfolderDir)) {
                    fs.mkdirSync(destBlockSubfolderDir);
                }

                const blockSubfolderFiles = globSync(`${blockSubfolderDir}/*`);
                blockSubfolderFiles.forEach((file) => {
                    const fileName = path.basename(file);
                    fs.copyFileSync(file, path.join(destBlockSubfolderDir, fileName));
                });
            }
            if (fs.existsSync(`${srcPathPhpBlock}${blockName}.php`)) {
                fs.copyFileSync(`${srcPathPhpBlock}${blockName}.php`, `${destDir}${blockName}.php`);
            }
            if (fs.existsSync(`${srcPathVueBlock}${blockName}`) && fs.statSync(`${srcPathVueBlock}${blockName}`).isDirectory()) {
                fse.copySync(`${srcPathVueBlock}${blockName}`, `${destDir}${blockName}`);
            }
            if (fs.existsSync(`${srcPathVueBlock}${blockName}.vue`)) {
                fs.copyFileSync(`${srcPathVueBlock}${blockName}.vue`, `${destDir}${blockName}.vue`);
            }
            copyBlockJson(blockName, 'block');

            SUCCESS = 1;
        } catch (e) {
            SUCCESS = 0;
            return SUCCESS;
        }
    }

    return SUCCESS;
}

function copyComponentContent(destDir, componentName) {
    let SUCCESS = 0;
    if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true, force: true });
    }

    if (!fs.existsSync(destDir)) {
        try {
            fs.mkdirSync(destDir);

            if (fs.existsSync(`${srcPathTwigComponent}/${componentName}.twig`)) {
                fs.copyFileSync(`${srcPathTwigComponent}/${componentName}.twig`, `${destDir}${componentName}.twig`);
            }

            if (fs.existsSync(`${srcPathScssComponent}/${componentName}/${componentName}.scss`)) {
                fs.copyFileSync(`${srcPathScssComponent}/${componentName}/${componentName}.scss`, `${destDir}${componentName}.scss`);

                // Check and copy the -extra.scss file if it exists
                const extraScssPath = `${srcPathScssComponent}/${componentName}/${componentName}-extra.scss`;
                if (fs.existsSync(extraScssPath)) {
                    fs.copyFileSync(extraScssPath, `${destDir}${componentName}-extra.scss`);
                }
            }

            if (fs.existsSync(`${srcPathJsComponent}/${componentName}/${componentName}.js`)) {
                fs.copyFileSync(`${srcPathJsComponent}/${componentName}/${componentName}.js`, `${destDir}${componentName}.js`);
            }

            copyBlockJson(componentName, 'component');
            SUCCESS = 1;
        } catch (e) {
            SUCCESS = 0;
            return SUCCESS;
        }
    }

    return SUCCESS;
}

function copyFieldsContent(destDir, fieldsName) {
    let SUCCESS = 0;
    if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true, force: true });
    }

    if (!fs.existsSync(destDir)) {
        try {
            fs.mkdirSync(destDir);

            if (fs.existsSync(`${srcPathJsFields}/${fieldsName}/${fieldsName}.js`)) {
                fs.copyFileSync(`${srcPathJsFields}/${fieldsName}/${fieldsName}.js`, `${destDir}${fieldsName}.js`);
            }

            if (fs.existsSync(`${srcPathPhpFields}/${fieldsName}.php`)) {
                fs.copyFileSync(`${srcPathPhpFields}/${fieldsName}.php`, `${destDir}${fieldsName}.php`);
            }

            if (fs.existsSync(`${srcPathTwigFields}/${fieldsName}.twig`)) {
                fs.copyFileSync(`${srcPathTwigFields}/${fieldsName}.twig`, `${destDir}${fieldsName}.twig`);
            }

            if (fs.existsSync(`${srcPathScssFields}/${fieldsName}/${fieldsName}.scss`)) {
                fs.copyFileSync(`${srcPathScssFields}/${fieldsName}/${fieldsName}.scss`, `${destDir}${fieldsName}.scss`);
            }
            
            copyBlockJson(fieldsName, 'fields');
            SUCCESS = 1;
        } catch (e) {
            SUCCESS = 0;
            return SUCCESS;
        }
    }

    return SUCCESS;
}

function copyControllerContent(destDir, controllerName) {
    let SUCCESS = 0;
    if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true, force: true });
    }

    if (!fs.existsSync(destDir)) {
        try {
            fs.mkdirSync(destDir);

            if (fs.existsSync(`${srcPathCssController}${controllerName}.css`)) {
                fs.copyFileSync(
                    `${srcPathCssController}${controllerName}.css`,
                    `${destDir}${controllerName}.css`
                );
            }

            if (fs.existsSync(`${srcPathPhpController}${controllerName}.php`)) {
                fs.copyFileSync(
                    `${srcPathPhpController}${controllerName}.php`,
                    `${destDir}${controllerName}.php`
                );
            }

            if (fs.existsSync(`${srcPathTwigController}${controllerName}.twig`)) {
                fs.copyFileSync(
                    `${srcPathTwigController}${controllerName}.twig`,
                    `${destDir}${controllerName}.twig`
                );
            }

            SUCCESS = 1;
        } catch (e) {
            console.error(e);
            SUCCESS = 0;
        }
    }

    return SUCCESS;
}

function copySecurityContent(destDir, securityName) {
    let SUCCESS = 0;
    if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true, force: true });
    }

    if (!fs.existsSync(destDir)) {
        try {
            fs.mkdirSync(destDir);

            if (fs.existsSync(`${srcPathPhpSecurity}/${securityName}.php`)) {
                fs.copyFileSync(
                    `${srcPathPhpSecurity}/${securityName}.php`,
                    `${destDir}${securityName}.php`
                );
            }

            SUCCESS = 1;
        } catch (e) {
            console.error(e);
            SUCCESS = 0;
        }
    }

    return SUCCESS;
}

function copySeopressContent(destDir, seopressName) {
    let SUCCESS = 0;
    if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true, force: true });
    }

    if (!fs.existsSync(destDir)) {
        try {
            fs.mkdirSync(destDir);

            if (fs.existsSync(`${srcPathPhpSeopress}/${seopressName}.php`)) {
                fs.copyFileSync(
                    `${srcPathPhpSeopress}/${seopressName}.php`,
                    `${destDir}${seopressName}.php`
                );
            }

            SUCCESS = 1;
        } catch (e) {
            console.error(e);
            SUCCESS = 0;
        }
    }

    return SUCCESS;
}


function copyBlockJson(name, type) {
    const existingAcfFiles = globSync(`${themePath}/acf-json/*.json`);

    const typeMapping = {
        block: ['Block: '],
        component: ['Component: '],
        fields: ['Fields: ', 'Options: '],
    };

    existingAcfFiles.forEach((file) => {
        let rawdata = fs.readFileSync(file);
        let blockData = JSON.parse(rawdata);
        const title = (typeMapping[type] || []).reduce((acc, replaceValue) => {
            return acc.replace(replaceValue, '');
        }, blockData.title)
        .replace(' - Library', '')
        .replaceAll(' ', '-')
        .toLowerCase();

        if (title === name) {
            const fileName = path.basename(file);
            fs.copyFileSync(
                file,
                `${destPath}${type}-${name}/${fileName}`
            );
        }
    });
}
