# Brewscribejs

Brewscribejs is a Beersmith2 (.bsmx) file parser for node.js. It is based off of cadwallion's ruby version at [cadwallion/brewscribe](https://github.com/cadwallion/brewscribe)

## Installation

``npm install brewscribe``

## Usage

To start, you can import your .bsmx file with `Brewscribe.import(file)`. This will return 
a `Document` object, containing all the parsed information within the file. Currently, 
only `Recipe` objects will be parsed.

By default, Brewscribe will set a text property for each attribute of the recipe, and
if it has a parser object it will attempt to further parse the data.

An example of this is found in `IngredientList`:

```
var Brewscribe = require('brewscribe');

Brewscribe.import(__dirname + '/brewlog.bsmx', function(err, document){
  var recipe = document.recipes[0];
  console.log(recipe.name + ' - ' + recipe.type + ' - ' + recipe.abv);
});
```
