let currentPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

$(document).keypress(function(){
    //function nextSequence() {
        let randomColourIndex = Math.floor(Math.random() * buttonColours.length);
        let randomColour = buttonColours[randomColourIndex];
        currentPattern.push(randomColour);

        $("#" + randomColour).fadeOut(100).fadeIn(100);

        new Audio("sounds/" + randomColour + ".mp3").play();
    //}

    $(".btn").on("click", function(){
        userClickedPattern.push("#" + $(this).attr("id"));
        console.log(userClickedPattern);
    });
});