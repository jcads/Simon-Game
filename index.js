const GAME_OVER = "Game Over, Press Any Key to Restart";

var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["green", "yellow", "red", "blue"];
var started = false;
var level = 1;

//chooses a random color to add to the pattern
var nextSequence = () => {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("h1").text("Level " + level++);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
		.fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColor);
    
}

//checks if the button the user clicked is the correct one
// by checking the current index of the gamePattern and userClickePatern
var checkAnswer = index => {
    if (gamePattern[index] === userClickedPattern[index]) {
        console.log("right");
        if (index === gamePattern.length - 1) {
            setTimeout(nextSequence, 1500);
        }
           
    } else {
        gameOver();
    }
}

var gameOver = () => {
    var audio = new Audio("sounds/wrong.mp3");
	audio.play();
	$("body").toggleClass("game-over");
	setTimeout(() => $("body").toggleClass("game-over"), 200);
    $("h1").text(GAME_OVER);
    
    //reset variables
    gamePattern = [];
    started = false;
    level = 1;
}

$(".pad").click((e) => {
    var userClickedColor = e.target.id;
    userClickedPattern.push(userClickedColor);
    playSound(userClickedColor);
    animatePress(userClickedColor);

    checkAnswer(userClickedPattern.length - 1);
});

var playSound = color => {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

var animatePress = (color) => {
    $("#"+color).toggleClass("pressed");
    setTimeout(() => $("#"+color).toggleClass("pressed"), 100);
}

// start game
$(document).keydown( () => {
    // a key is already pressed
    if (!started) {
        nextSequence()
        started = true;
    }
})

   





