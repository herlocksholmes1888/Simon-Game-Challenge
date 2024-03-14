let currentPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

$(document).keypress(function(){
    function nextSequence() {
        let randomColourIndex = Math.floor(Math.random() * buttonColours.length);
        let randomColour = buttonColours[randomColourIndex];
        currentPattern.push(randomColour);

        buttonAnimation(randomColour)
        playSound(randomColour);
    }

    $(".btn").on("click", function(){;
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push("#" + userChosenColour);

        buttonAnimation(userChosenColour);
        playSound(userChosenColour);
    });

    function playSound(button) {
        new Audio("sounds/" + button + ".mp3").play();
    }

    function buttonAnimation(button) {
        let clickedButton = $("#" + button);
        clickedButton.fadeOut(100).fadeIn(100);
        clickedButton.addClass("pressed");

        setTimeout(function(){
            clickedButton.removeClass("pressed");
        }, 150);
    }

    nextSequence();
});