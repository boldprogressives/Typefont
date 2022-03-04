# Typefont
Typefont is an experimental library that detects the font of a text in a image.

## Usage
Import the main function and invoke it like in the following script.

```javascript
import { Typefont } from "./src/index.js";

Typefont("image.png").then((result) => console.log(result));
```
or
```javascript
import { Typefont } from "./src/index.js";

async function getFontFromImage (source) {
    const fonts = await Typefont(source);
    
    return fonts[0]; // Return the most similar font.
}
```

The first argument of the function can be the `path` or the `base64` of the image. The function returns a Promise that when is resolved returns an array containing each font ordered in descending order (considering the similarity percentage).

## Preview
Text on the cover of a book (the language is different because I live in Italy).
![](http://i.imgur.com/1JnyIC3.jpg)

Text on the cover of another book.
![](http://i.imgur.com/smfr0Kn.jpg)

## Version 2
I'm working on a new version which gets the fonts directly from .ttf files and the Google Fonts database. The comparison is made 
using the [Hausdorff Distance](https://en.wikipedia.org/wiki/Hausdorff_distance) and the
[Shape Context](https://en.wikipedia.org/wiki/Shape_context). If you are interested in a collaboration contact
me (vasile.peste@protonmail.ch). It's difficult to progress since I work and I have many other projects.

## Options
You can pass an object with options to the function as second argument.

Option | Type | Description | Default
--- | --- | --- | ---
`progress` | `Function` | A function that is called every time the comparison with a font is completed. | `undefined`
`minSymbolConfidence` | `Number` | The minimum confidence that a symbol must have to be accepted in the comparison queue (the confidence value is assigned by the OCR engine). | `15`
`analyticComparisonThreshold` | `Number` | The threshold of the analytic comparison. | `0.5`
`analyticComparisonScaleToSameSize` | `Boolean` | Scale the symbols to the same size before the analytic comparison? | `false`
`analyticComparisonSize` | `Number` | Used as dimension when resizing the images to the same size during the analytic comparison. | `128`
`perceptualComparisonSize` | `Number` | Used as dimension when resizing the images to the same size during the perceptual comparison. | `64`
`fontsDirectory` | `String` | The URL of the directory containing the fonts. | `storage/fonts/`
`fontsData` | `String` | The name of the file containing the JSON data of a font. | `data.json`
`fontsIndex` | `String` | The URL of the fonts index JSON file. | `storage/index.json`
`fontRequestTimeout` | `Number` | Font request timeout [ms]. | `2000`
`textRecognitionTimeout` | `Number` | Text recognition timeout [s]. | `60`
`textRecognitionBinarization` | `Boolean` | Binarize the image before the recognition? | `true`

### Example
Example with options.
```javascript
Typefont("restaurant-logo.jpg", {
    minSymbolConfidence: 50,
    analyticComparisonScaleToSameSize: true,
    analyticComparisonSize: 256
}).then(res => console.log(res));
```

## Todo
+ [ ] Store and load fonts directly from `.ttf` files.
+ [ ] Implement the Shape Context algorithm to improve comparison results.
+ [ ] Implement the Hausdorff distance algorithm to improve the comparison results.
+ [ ] Import the Google Fonts database.

## How it works?
Short summary: the input image is passed to the optical character recognition after some filters based on its brightness. The symbols (letters) are extracted from the input image and compared with the symbols of the fonts in the database using a perceptual comparison and a pixel based comparison in order to obtain a percentage of similarity.

## How to add a font
The fonts stored in this database are just a JSON structure with letters as keys and the base64 of the image of the letter of the font as value. If you want to add a new font you must follow this structure.
```javascript
{
    "meta": {
        "name": "name",
        "author": "author",
        "uri": "uri",
        "license": "license",
        "key": "value",
        ...
    },
    "alpha": {
        "a": "base64",
        "b": "base64",
        "c": "base64",
        ...
    }
}
```
Then you have to include your font in the index of fonts by adding the font name to the array.

## License
[MIT License](LICENSE).

## Credits
Author: Vasile Pește (vasile.peste@protonmail.ch).