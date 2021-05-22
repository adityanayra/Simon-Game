var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern = [];
var level = 0; // keeping the count of levels
var started = false; // to  know whther game started or not
// detecting keyboard press
$(document).keypress(function(){
    if(!started){
        nextSequence();
        $("#level-title").html("level "+level);
        started = true;
    }
    
});



//      1.detect if any button clicked
$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

})

var playSound = (soundName)=>{
    var audio = new Audio("sounds/"+soundName+".mp3");
    audio.play();
}

var animatePress = (currentColour)=>{
    $("#"+currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

}



// checking user answer against game pattern
var checkAnswer = (currentLevel)=>{
    // console.log(currentLevel);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel] ){
        // console.log("success!");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("failure!");
        playSound("wrong");
        // flashing red for game over
        $("body").addClass("game-over");
        // removeing the blind red if game gets over
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        // game over
        $("#level-title").html("Game over! press any key to restart!");

        // creating a  new game
        startOver();

    }
}
// newgame creation
var startOver=()=>{
    level = 0;
    gamePattern = [];
    started = false;
}



var nextSequence = ()=>{
    // resetting the userclickedpattern
    userClickedPattern =[];
    
    var randomNumber = Math.floor((Math.random()/3)*10);
    var randomChosenColour = buttonColours[randomNumber];
    // increasing level
    level = level+1;
    $("#level-title").text("Level " + level);
   
    
    //console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    
    //1. for flashing animation...
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //2. to add sound to the selected colour
    playSound(randomChosenColour);
}
