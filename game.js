var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = true;
var level = 0;

$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    //console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown",function(){
    if(started)
    {
        $("#level-title").text("Level " + level);
        nextsequence();
        started = false;
    }
    
});


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }
    else{
        //console.log("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        var wrongsound = new Audio("sounds/wrong.mp3");
        wrongsound.play();
        startOver();
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = true;
}

function nextsequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}



function playSound(name){
    var buttonAudio = new Audio("sounds/" +name + ".mp3");
    buttonAudio.play();
}



function animatePress(currentColor)
{
    $("#"+ currentColor).addClass("pressed");
    setTimeout(removinganimation,100);
    function removinganimation()
    {
        $("#"+ currentColor).removeClass("pressed");
    }
}