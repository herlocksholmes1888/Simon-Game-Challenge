var currentPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var hasStarted = false;
var level = 0;

$(document).keypress(function(){
    function nextSequence() {
        level += 1;
        userClickedPattern = [];

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

            if (checkAnswer()) {
                playSound(userChosenColour);
            }
    
            buttonAnimation(userChosenColour);
        });
    }

    function checkAnswer() {
        /* if (JSON.stringify(currentPattern) === JSON.stringify(userClickedPattern)) {
            if (userClickedPattern.length === currentPattern.length) {
                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
        } */

        // Compare the last button clicked by the user to the last button chosen randomly
        let lastIndex = userClickedPattern.length - 1;
        if (userClickedPattern[lastIndex] !== currentPattern[lastIndex]) {
                $("#level-title").html("Game Over, Press Any Key to Restart");
                new Audio("sounds/wrong.mp3").play();

                let body = $("body");
                body.addClass("game-over");
                body.fadeIn(100).fadeOut(100).fadeIn(100);
                setTimeout(function(){
                    body.removeClass("game-over");
                }, 150);

                startOver();
                return false;

        } else {
            if (userClickedPattern.length === currentPattern.length) {
                setTimeout(function(){
                    nextSequence();
                }, 1200);
            }
            
            return true;
        }
    }

    function startOver() {
        level = 0; 
        currentPattern = [];
        hasStarted = false;
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