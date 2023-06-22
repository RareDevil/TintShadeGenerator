# TintShadeGenerator
This is a tint and shade generator made in node using value.js

colorsInput.json:  
This should be an array of objects that is like this:  
<code>{  
    "name": "blue", // This is the name of the color   
    "value": "#2196f3"  // This is the hex color to use  
}</code>  
Right now it only supports hex colors, but later there may come output options.

config.json:  
<code>{  
// This supprts three values, "tint", "shade" and "base"  
// "base" means it will not create a tint or shade of the color.
"type": "tint",  
"weight": 95,// How much tint or shade do you want.  
"suffix": "50"// This is used for the outfile.  
}</code> 

The generated code will right now output to colors.css in this format:  
--ColorName-suffix:HexColor;

It will make sure to wrap it all in a :root to use as css variables.
