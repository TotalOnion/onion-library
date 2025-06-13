# onion-component-library

Front end components for gcms sites

## Installation

Install with npm or yarn..

`npm install --save-dev @total_onion/onion-library`

`yarn add -D @total_onion/onion-library`

If you don't have the scripts already in your package.json you can add these and use them to install and update components.

`"install-component": "node ./node_modules/@total_onion/onion-library/install-component.js", "upgrade-component": "node ./node_modules/@total_onion/onion-library/upgrade-component.js", "list-components": "node ./node_modules/@total_onion/onion-library/list-components.js",`

eg you can list the available components with

`yarn list-components`

and then you can install and component with

`yarn install-component <name-of-component>`

## Run unit tests

Go to the folder

`yarn install`

then, to run unit tests,

`yarn test`
