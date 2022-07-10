## Color Pirate

🍭 Small library to Grab the color palette from an image. Works in the browser.

### Getting started

The Color Pirate package includes two distribution files one for simple script tag, other one For modern browsers as well as Webpack etc...

Here is the list of all the files in the `/dist` folder and what formats they support:

    colorPirate.es.js (13.24 KiB / gzip: 3.57 KiB) - ES6 module. For modern browsers as well as Webpack and Rollup.
    colorPirate.umd.js (6.24 KiB / gzip: 2.67 KiB) - UMD module. For simple script tag loading that exposes a global variable or for RequireJS AMD support.

### Installing

##### 1. Install

There are multiples ways to install Color Pirate when using it in the browser:

Install as dependency with npm.

```bash
$ npm i --save colorPirate
```

Load from a CDN. The distribution files are hosted on `cdnjs` for quick access.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/colorPirate/1.0.0/colorPirate.umd.js"></script>
```

Download from Github. You can download a zip of the latest release (or any previous one) from the project's Github Releases page.

#### 2. Import and use

##### As a global variable.

```html
<script src="node_modules/colorPirate/dist/colorPirate.umd.js"></script>
<script>
  const colorPalette = await new colorPirate("https://via.placeholder.com/600x400/ad2626/bd3838.jpg", 7).getPalette();
</script>
```

##### As an ES6 module.

```javascript
import colorPirate from "./node_modules/colorPirate/dist/colorPirate.es.js";
const colorPalette = await new colorPirate(
  "https://via.placeholder.com/600x400/ad2626/bd3838.jpg",
  7
).getPalette();
```

### API

_Note: `getPalette` return a `Promise`._

**getPalette()**
<span style="color:orange">Returns: [[Number, Number, Number], ...]</span>

Gets a palette from the image by clustering similar colors. The palette is returned as an array containing colors, each color itself an array of three integers.

## Authors

- [@Omar Chadidi](https://github.com/FxOmar) ❤️
