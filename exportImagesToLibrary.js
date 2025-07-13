require('dotenv').config();
const fs = require('fs');
const path = require('path');

const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

const srcPathImages = path.join(themePath, 'assets/images/icon/library-images');
const destPath = '../../../../../onion-library/components/fields-library-images';

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

console.log(`${bColors.HEADER}Starting the image export process...${bColors.ENDC}`);

    function exportImagesToLibrary() {
        if (!fs.existsSync(srcPathImages)) {
            console.error(`${bColors.FAIL}Source path does not exist: ${srcPathImages}${bColors.ENDC}`);
            return;
        }
    
        if (!fs.existsSync(destPath)) {
            console.log(`${bColors.WARNING}Destination path does not exist.`);
            return;
        }

        fs.readdir(srcPathImages, (err, files) => {
            if (err) {
                console.error(`${bColors.FAIL}Failed to read the source directory: ${err}${bColors.ENDC}`);
                return;
            }
    
            files.forEach(file => {
                const srcFile = path.join(srcPathImages, file);
                const destFile = path.join(destPath, file);
    
                fs.copyFile(srcFile, destFile, (err) => {
                    if (err) {
                        console.error(`${bColors.FAIL}Failed to copy file ${file}: ${err}${bColors.ENDC}`);
                    } else {
                        console.log(`${bColors.OKGREEN}Successfully copied ${file} to component-library.`);
                    }
                });
            });
        });
    }
    
    exportImagesToLibrary();
    