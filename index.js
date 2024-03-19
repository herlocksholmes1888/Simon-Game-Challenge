let currentPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let hasStarted = false;
let level = 0;

$(document).keypress(function(){
    function nextSequence() {
        level += 1;
        $("#level-title").html("Level " + level);

        // Reset userClickedPattern each new sequence
        userClickedPattern = [];
    
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

            checkAnswer();
        });
    }

    function checkAnswer() {
        /* if (JSON.stringify(currentPattern) === JSON.stringify(userClickedPattern)) {
            if (userClickedPattern.length === currentPattern.length) {
                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
        }*/

        var lastIndex = userClickedPattern.length - 1;
        if (userClickedPattern[lastIndex] !== currentPattern[lastIndex]) {
                new Audio("sounds/wrong.mp3").play();
        } else {
            if (userClickedPattern.length === currentPattern.length) {
                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
        }
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

    if (hasStarted === false) {
        nextSequence();
        hasStarted = true;
    }
    userInteraction();
});