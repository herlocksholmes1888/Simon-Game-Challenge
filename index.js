let currentPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let hasStarted = false;
let level = 0;

function nextSequence() {
    level += 1;
    $("#level-title").html("Level " + level);

    let randomColourIndex = Math.floor(Math.random() * buttonColours.length);
    let randomColour = buttonColours[randomColourIndex];
    currentPattern.push(randomColour);

    buttonAnimation(randomColour)
    playSound(randomColour);
}

function userInteraction() {
    $(".btn").on("click", function(){
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        buttonAnimation(userChosenColour);
        playSound(userChosenColour);
    });
}

function playSound(button) {
    new Audio("sounds/" + button + ".mp3").play();
}

function buttonAnimation(button) {
    let clickedButton = $("#" + button);
    clickedButton.addClass("pressed");
    clickedButton.fadeOut(100).fadeIn(100);

    setTimeout(function(){
        clickedButton.removeClass("pressed");
    }, 150);
}

$(document).keypress(function(){
    if (hasStarted === false) {
        nextSequence();
        hasStarted = true;
    }

    userInteraction();
});