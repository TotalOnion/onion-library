const themePath =
	process.env.THEME_PATH || 'web/wp-content/themes/global-theme'
const fs = require('fs')
const path = require('path')
const libraryPath =
	'./node_modules/@pernod-ricard-global-cms/cbl-component-library'

// Get extension of filename
const getExtension = (filename) => {
  var ext = path.extname(filename || '').split('.')
  return ext[ext.length - 1]
}

const getFileType = (filename) => {
  if (filename.endsWith('-extra.scss')) {
    return 'extra'
  } else if (filename.endsWith('spec.js')) {
    return 'spec'
  } else {
    return getExtension(filename)
  }
}

const getProjectName = () => {
  let projectName = 'Global Theme'

  try {
    const packageFile = fs.readFileSync('./package.json')
    const projectJson = JSON.parse(packageFile)

    if (projectJson) {
      projectName = projectJson.name
      if (projectName.slice(0, 3) === 'the') {
        const prefix =
					projectName.slice(0, 3).charAt(0).toUpperCase() +
					projectName.slice(0, 3).slice(1)
        projectName = `${prefix} ${
          projectName.slice(3).charAt(0).toUpperCase() +
					projectName.slice(3).slice(1)
        }`
      } else {
        projectName = `${
          projectName.charAt(0).toUpperCase() + projectName.slice(1)
        }`
      }
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('The file does not exist.')
    } else {
      console.error('An error occurred while reading the file:')
    }
  }
  return projectName
}

const checkFolder = (srcFolder) => {
  return fs.existsSync(srcFolder) && fs.statSync(srcFolder).isDirectory()
}

const checkComponentName = (srcFolder) => {
  if (!checkFolder(srcFolder)) {
    console.log(
      '\x1b[35m',
      '😞 Hmmm that failed.. Probably you misspelled the component name'
    )
    process.exit()
  }
}

const copyFile = (sourceFilePath, destinationFilePath) => {
  // Check if the destination folder exists, if not, create it
  const destinationFolder = path.dirname(destinationFilePath)
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true })
  }

  fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
    if (err) {
      console.error('Error copying the file:', err)
    }
  })
}

const copyFileKeeping = (sourceFilePath, destinationFilePath) => {
  // Check if the destination folder exists, if not, create it
  const destinationFolder = path.dirname(destinationFilePath)
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true })
  }

  fs.access(destinationFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Copy the file from source to destination if it doesn't exist
      fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
          console.error('Error copying the file:', err)
        }
      })
      return
    }
  })
}

const copySubdirectory = (sourceDir, componentModuleName) => {
  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    const fileType = getFileType(file)
    switch (fileType) {
      case 'vue':
        copyFile(
          `${sourceDir}/${file}`,
          `./assets/vue/blocks/${componentModuleName}/${file}`
        )
        break
      case 'twig':
        copyFile(
          `${sourceDir}/${file}`,
          `./views/blocks/${componentModuleName}/${file}`
        )
        break
    }
  })
}

// Copies all the "block" component files
const copyBlockComponent = (componentName) => {
  const componentModuleName = componentName.substring(6)
  const sourceDir = `${libraryPath}/components/${componentName}`
  checkComponentName(`${sourceDir}/`)

  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    if (file === componentModuleName) {
      copySubdirectory(
        `${sourceDir}/${componentModuleName}`,
        componentModuleName
      )
    } else {
      const fileType = getFileType(file)
      switch (fileType) {
        case 'php':
          copyFile(
            `${sourceDir}/${file}`,
            `./inc/acf-blocks/${file}`
          )
          break
        case 'js':
          if (file.includes('-extra.js')) {
            break;
          }
          copyFile(
            `${sourceDir}/${file}`,
            `./assets/js/blocks/${file}`
          )
          
        const extraJsFile = `${componentModuleName}-extra.js`;
        const extraJsSourcePath = `${sourceDir}/${extraJsFile}`;
        const extraJsDestinationPath = `./assets/js/blocks/${componentModuleName}/${extraJsFile}`;

        if (fs.existsSync(extraJsSourcePath)) {
          console.log(`Found extra JS file: ${extraJsFile}`);
          if (!fs.existsSync(`./assets/js/blocks/${componentModuleName}`)) {
            fs.mkdirSync(`./assets/js/blocks/${componentModuleName}`, { recursive: true });
          }
          copyFile(extraJsSourcePath, extraJsDestinationPath);
        }
        break;

        case 'scss':
          copyFile(
            `${sourceDir}/${file}`,
            `./assets/scss/blocks/${file}`
          )
          break
        case 'json':
          copyFile(`${sourceDir}/${file}`, `./acf-json/${file}`)
          break
        case 'twig':
          copyFile(`${sourceDir}/${file}`, `./views/blocks/${file}`)
          break
        case 'vue':
          copyFile(
            `${sourceDir}/${file}`,
            `./assets/vue/blocks/${file}`
          )
          break
        case 'extra':
          copyFileKeeping(
            `${sourceDir}/${file}`,
            `./assets/scss/blocks/${componentModuleName}/${file}`
          )
          break
        case 'spec':
          break
      }
    }
  })
}

// Copies all the "core" component files
const copyCoreComponent = (componentName) => {
  const componentModuleName = componentName.substring(5)
  const sourceDir = `${libraryPath}/components/${componentName}`
  checkComponentName(`${sourceDir}/`)

  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    const fileType = getFileType(file)

    switch (fileType) {
      case 'php':
        copyFile(`${sourceDir}/${file}`, `./inc/admin-extras/${file}`)
        break
      case 'js':
        copyFile(
          `${sourceDir}/${file}`,
          `./assets/js/modules/library-modules/${componentName}/${file}`
        )
        break
      case 'scss':
        copyFile(
          `${sourceDir}/${file}`,
          `./assets/scss/modules/library-modules/${componentName}/${file}`
        )
        break
      case 'json':
        copyFile(`${sourceDir}/${file}`, `./acf-json/${file}`)
        break
      case 'twig':
        break
      case 'vue':
        break
      case 'extra':
        // use copyFileKeeping
        break
      case 'spec':
        break
    }
  })
}

// Copies all the "fields" component files
const copyFieldsComponent = (componentName) => {
  const componentModuleName = componentName.substring(7)
  const sourceDir = `${libraryPath}/components/${componentName}`
  checkComponentName(`${sourceDir}/`)

  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    const fileType = getFileType(file)

    switch (fileType) {
      case 'php':
        copyFile(`${sourceDir}/${file}`, `./inc/admin-extras/${file}`)
        break
      case 'js':
        copyFile(
          `${sourceDir}/${file}`,
          `./assets/js/modules/library-modules/${componentModuleName}/${file}`
        )
        break
      case 'scss':
        copyFile(
          `${sourceDir}/${file}`,
          `./assets/scss/modules/library-modules/${componentModuleName}/${file}`
        )
        break
      case 'json':
        copyFile(`${sourceDir}/${file}`, `./acf-json/${file}`)
        break
      case 'twig':
        copyFile(`${sourceDir}/${file}`, `./views/components/${file}`)
        break
      case 'svg':
      case 'png':
      case 'webp':
      case 'jpeg':
          const destinationFolder = './assets/images/library-images';
          if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
          }
          copyFile(`${sourceDir}/${file}`, `${destinationFolder}/${file}`)
        break
      case 'vue':
        break
      case 'extra':
        // use copyFileKeeping
        break
      case 'spec':
        break
    }
  })
}

// Copies all the "component" component files
const copyComponentComponent = (componentName) => {
  const componentModuleName = componentName.substring(10); 
  const sourceDir = `${libraryPath}/components/${componentName}`;
  checkComponentName(`${sourceDir}/`);
  

  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    const fileType = getFileType(file);

    switch (fileType) {
      case 'php':
        copyFile(`${sourceDir}/${file}`, `./inc/admin-extras/${file}`);
        break;
      case 'js':
        copyFile(
          `${sourceDir}/${file}`,
          `./assets/js/modules/library-modules/${componentModuleName}/${file}`
        );
        break;
      case 'scss':
        copyFile(
          `${sourceDir}/${file}`,
          `./assets/scss/modules/library-modules/${componentModuleName}/${file}`
        );

        const extraScssPath = `${sourceDir}/${componentModuleName}-extra.scss`;
        if (fs.existsSync(extraScssPath)) {
          copyFileKeeping(
            extraScssPath,
            `./assets/scss/modules/library-modules/${componentModuleName}/${componentModuleName}-extra.scss`
          );
        }
        break;
      case 'json':
        copyFile(`${sourceDir}/${file}`, `./acf-json/${file}`);
        break;
      case 'twig':
        copyFile(`${sourceDir}/${file}`, `./views/components/${file}`);
        break;
      case 'svg':
      case 'png':
      case 'webp':
      case 'jpeg':
        const destinationFolder = './assets/images/library-images';
        if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true });
        }
        copyFile(`${sourceDir}/${file}`, `${destinationFolder}/${file}`);
        break;
      case 'vue':
        break;
      case 'extra':
        break;
      case 'spec':
        break;
    }
  });
}

// Copies all the "entrypoint" component files
const copyEntrypointComponent = (componentName) => {
  const componentModuleName = componentName.substring(7)
  const sourceDir = `${libraryPath}/components/${componentName}`
  checkComponentName(`${sourceDir}/`)

  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    const fileType = getFileType(file)

    switch (fileType) {
      case 'twig':
        copyFile(
          `${sourceDir}/${file}`,
          `./views/entry-points/${file}`
        )
        break
    }
  })
}

// Copies all the "cache" component files
const copyCacheComponent = (componentName) => {
  const componentModuleName = componentName.substring(7)
  const sourceDir = `${libraryPath}/components/${componentName}`
  checkComponentName(`${sourceDir}/`)

  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    const fileType = getFileType(file)

    switch (fileType) {
      case 'php':
        copyFile(
          `${sourceDir}/${file}`,
          `./inc/custom-caches/${file}`
        )
        break
    }
  })
}

// Copies all the "admin" component files
const copyAdminComponent = (componentName) => {
  const componentModuleName = componentName.substring(6)
  const sourceDir = `${libraryPath}/components/${componentName}`
  checkComponentName(`${sourceDir}/`)

  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    const fileType = getFileType(file)

    switch (fileType) {
      case 'php':
        copyFile(`${sourceDir}/${file}`, `./inc/admin-extras/${file}`)
        break
    }
  })
}

// Copies all the "controller" component files
const copyControllerComponent = (componentName) => {
  const componentModuleName = componentName.substring(11);
  const sourceDir = `${libraryPath}/components/${componentName}`;
  checkComponentName(`${sourceDir}/`);

  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    const fileType = getFileType(file);

    switch (fileType) {
      case 'css':
        copyFile(
          `${sourceDir}/${file}`,
          `./assets/css/${file}`
        );
        break;
      case 'twig':
        copyFile(
          `${sourceDir}/${file}`,
          `./views/components/${file}`
        );
        break;
      case 'php':
        copyFile(
          `${sourceDir}/${file}`,
          `./controller/${file}`
        );
        break;
    }
  });
};

// Copies all the "security" component files
const copySecurityComponent = (componentName) => {
  const componentModuleName = componentName.substring(9);
  const sourceDir = `${libraryPath}/components/${componentName}`;
  checkComponentName(`${sourceDir}/`);

  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    if (getFileType(file) === 'php') {
      copyFile(
        `${sourceDir}/${file}`,
        `./inc/security-extras/${file}`
      );
    }
  });
};

// Copies all the "seopress" component files
const copySeopressComponent = (componentName) => {
  const componentModuleName = componentName.substring(9);
  const sourceDir = `${libraryPath}/components/${componentName}`;
  checkComponentName(`${sourceDir}/`);

  fs.readdirSync(`${sourceDir}/`).forEach((file) => {
    if (getFileType(file) === 'php') {
      copyFile(
        `${sourceDir}/${file}`,
        `./inc/seo-extras/${file}`
      );
    }
  });
};


const updateComponent = () => {
  const libraryPath =
		'./node_modules/@pernod-ricard-global-cms/cbl-component-library'

  projectName = getProjectName()

  const componentName = process.argv[2]?.toLocaleLowerCase()

  if (!componentName) {
    console.log(
      '\x1b[35m',
      '😞 Hmmm that failed.. Did you forget to include the component name?'
    )
    process.exit()
  }

  if (componentName.split('-')[0] === 'block') {
    copyBlockComponent(componentName)
  } else if (componentName.split('-')[0] === 'core') {
    copyCoreComponent(componentName)
  } else if (componentName.split('-')[0] === 'fields') {
    copyFieldsComponent(componentName)
  } else if (componentName.split('-')[0] === 'component') {
    copyComponentComponent(componentName)
  } else if (componentName.split('-')[0] === 'admin') {
    copyAdminComponent(componentName)
  } else if (componentName.split('-')[0] === 'entrypoint') {
    copyEntrypointComponent(componentName)
  } else if (componentName.split('-')[0] === 'cache') {
    copyCacheComponent(componentName)
  } else if (componentName.split('-')[0] === 'controller') {
    copyControllerComponent(componentName)
  } else if (componentName.split('-')[0] === 'security') {
    copySecurityComponent(componentName)
  } else if (componentName.split('-')[0] === 'seopress') {
    copySeopressComponent(componentName)

  } else {
    console.error(
      '\x1b[35m',
      `😞 Hmmm that failed.. ${componentName} Has the wrong component prefix (block, admin, core, fields, entrypoint, cache, component)`
    )
    process.exit()
  }

  console.log(
    '\x1b[32m',
    `👑 👑 👑 Hurrah! You successfully updated ${componentName} 👑 👑 👑`
  )
}

module.exports = {
  getExtension,
  getFileType,
  checkFolder,
  copyFile,
  copyFileKeeping,
  getProjectName,
  copyBlockComponent,
  copyCoreComponent,
  copyFieldsComponent,
  copyComponentComponent,
  copyAdminComponent,
  updateComponent
}

// It calls the function only if executed through the command line
if (require.main === module) {
  updateComponent()
}
