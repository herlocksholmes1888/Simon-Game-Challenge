let currentPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];
let randomColour = Math.floor(Math.random() * buttonColours.length);
currentPattern.push(randomColour);

$("#" + buttonColours[randomColour]).fadeOut(100).fadeIn(100);