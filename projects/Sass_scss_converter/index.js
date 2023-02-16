import { convertScssToSass } from "./convertScssToSass.js";
import { convertSassToScss } from "./convertSassToScss.js";

var convert = document.getElementById("convert");
var input1 = document.getElementById("input1").value;


var output1 = document.getElementById("output1");

convert.addEventListener("click", () => {
  output1.value = convertSassToScss(input1);
});

