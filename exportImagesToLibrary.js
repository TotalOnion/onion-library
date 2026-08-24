import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';

const themePath = process.env.THEME_PATH || 'web/wp-content/themes/global-theme';

const srcPathImages = path.join(themePath, 'assets/images/icon/library-images');
const destPath = '../../../../../onion-library/components/fields-library-images';

const bColors = {
    HEADER: '\u001b[95m',
    OKBLUE: '\u001b[94m',
    OKGREEN: '\u001b[92m',
    WARNING: '\u001b[93m',
    FAIL: '\u001b[91m',
    ENDC: '\u001b[0m',
    BOLD: '\u001b[1m',
    UNDERLINE: '\u001b[4m',
    ORANGE: '\u001b[93m',
    MAGENTA: '\u001b[95m',
    CYAN: '\u001b[96m'
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
    