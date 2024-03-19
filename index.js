let currentPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let hasStarted = false;
let level = 0;

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
        var lastIndex = userClickedPattern.length - 1;
        if (userClickedPattern[lastIndex] !== currentPattern[lastIndex]) {
                $("#level-title").html("Game Over");
                new Audio("sounds/wrong.mp3").play();

                var body = $("body");
                body.addClass("game-over");
                body.fadeIn(100).fadeOut(100);
                setTimeout(function(){
                    body.fadeIn(100);
                    body.removeClass("game-over");
                }, 150);

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