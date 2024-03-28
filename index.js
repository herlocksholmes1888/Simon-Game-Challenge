var currentPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var hasStarted = false;
var level = 0;

function simonGame(){
    // Checks whether or not the user has interacted with the game
    if (hasStarted === false) {
        hasStarted = true;
        $("#subtitle").html("");
        nextSequence();
        userInteraction();
    }

    // Associates a randomly generated number to a colour 
    function nextSequence() {
        level += 1;
        userClickedPattern = [];
        $("#level-title").html("Level " + level);

        // After playing the current pattern, add a new color
        setTimeout(function() {
                let randomColourIndex = Math.floor(Math.random() * buttonColours.length);
                let randomColour = buttonColours[randomColourIndex];
                currentPattern.push(randomColour);
                buttonAnimation(randomColour);
                playSound(randomColour);
        }, 600 * currentPattern.length); // Adjust timing as needed
    
        // Loops through the current pattern to play each color
        for (let i = 0; i < currentPattern.length; i++) {
            setTimeout(function() {
                buttonAnimation(currentPattern[i]);
                playSound(currentPattern[i]);
            }, 600 * i); // Adjust timing as needed for button animations and sound duration
        }
    }
    
    // Checks which button the user has clicked
    function userInteraction() {
        $(".btn").on("click", function(){
            let userChosenColour = $(this).attr("id");
            userClickedPattern.push(userChosenColour);

            if (checkAnswer() === true) {
                playSound(userChosenColour);
            }
    
            buttonAnimation(userChosenColour);
        });
    }

    // Verifies whether or not the user has clicked the correct colour in the sequence
    function checkAnswer() {
        /* if (JSON.stringify(currentPattern) === JSON.stringify(userClickedPattern)) {
            if (userClickedPattern.length === currentPattern.length) {
                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
        } */

        // Compares the last button clicked by the user to the last button chosen randomly
        let lastIndex = userClickedPattern.length - 1;
        if (userClickedPattern[lastIndex] !== currentPattern[lastIndex]) {
                $("#level-title").html("Game Over");
                $("#subtitle").html("Press Any Key to Restart");

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

    // Resets the values of the previous game
    function startOver() {
        level = 0; 
        currentPattern = [];
        hasStarted = false;
        $(".btn").off("click");
    }

    // Success sound effects
    function playSound(button) {
        new Audio("sounds/" + button + ".mp3").play();
    }
    
    // Flashes whenever a button is selected
    function buttonAnimation(button) {
        let clickedButton = $("#" + button);
        clickedButton.addClass("pressed");
        clickedButton.fadeOut(100).fadeIn(100);
    
        setTimeout(function(){
            clickedButton.removeClass("pressed");
        }, 150);
    } 
}

$(document).ready(function(){
    $(document).on("keypress touchstart", function(){
        simonGame();
    });
});