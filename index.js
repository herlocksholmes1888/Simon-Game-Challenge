let currentPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

$(document).keypress(function(){
    function nextSequence() {
        let randomColourIndex = Math.floor(Math.random() * buttonColours.length);
        let randomColour = buttonColours[randomColourIndex];
        currentPattern.push(randomColour);

        $("#" + randomColour).fadeOut(100).fadeIn(100);

        playSound(randomColour);
    }

    function playSound(button) {
        new Audio("sounds/" + button + ".mp3").play();
    }

    $(".btn").on("click", function(){;
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push("#" + userChosenColour);

        playSound(userChosenColour);
    });

    nextSequence();
});