var ball; //set the ball element to this
var ballShadow; //set the ball shadow element to this
var goalie; //set the goalie to this
var shotTime; //set the time from ball kick to landing in the net
var ballTarget; //set the horizontal target for the ball
var goalieOffset; //set to either -1 or +1 when the goalie jumps to tween left or right
var shotDelay; //slightly random wait for the kick
var shotAngle; //use as a reference for the angle of the shot to calculate rebound angle
var goaliePos = 0; //set the goalie original position to 0 so we have a value to check against if the goalie doesn't jump
var saveCounter = 0; //amount of saves counted, start on 0
var goalCounter = 0; //amount of goals counted, start on 0
var currentShotCount = 1; //current shot for counter, start on 1
var totalShots = 3; //total amount of shots


function startGame(){
    //set up the references to the elements
    ball = document.getElementById("ball");
    ballShadow = document.getElementById("ballShadow");
    goalie = document.getElementById("goalie");
    gameText = document.getElementById("gameText");
    btnReplay = document.getElementById("btnReplay");
    btnReplay.addEventListener("click", btnReplay_clickHandler, false);
    btnReplay.addEventListener("mouseover", btnReplay_overHandler, false);
    btnReplay.addEventListener("mouseout", btnReplay_outHandler, false);
    TweenLite.killTweensOf(titleAnimation);
    TweenLite.to(startText, 0.5, {opacity:0, delay:2.5});
    showShootOut();
}

function showShootOut() {
    //reset location of elements after each shot
    TweenLite.set([ball,ballShadow,goalie], {y:0, x:0});
    goaliePos = 0;
    btnReplay.style.display = "none";
    gameText.innerHTML = 'READY';
    shoot();
    TweenLite.delayedCall(4, checkShotCount);
}

function shoot(){

    shotDelay = 3 + Math.random(3); //calculate a random delay before the kick

    shotTime = 1.5; //currently the shot time is 1 second, but can add a random component to this
    ballTarget = -100 + (Math.random()*200); //calculates a horizontal ball target between -100 and +100 of the start position

    shotAngle = (-1 * ballTarget) / 250; //calculate a rough shot offset ratio we can use for the rebound if the goalie catches it

    //kick the ball and ballshadow. they are different tweens as the ballshadow tweens slightly more to the right to give the impression of lift
    TweenLite.to(ball, shotTime,{y:250,x:ballTarget, delay:shotDelay,onUpdate:ballPos,onUpdateParams:[ball]}); //when this tween starts it starts looping to check ball position
    TweenLite.to(ballShadow, shotTime,{y:250,x:ballTarget + 5, delay:shotDelay});
}


//function called on every frame of the ball kick tween to check when ball reaches goalie and then if it has been saved
function ballPos(whichObj){
    //if the ball has reached the goalie
    if(whichObj._gsTransform.y > 135){
        //and if the ball horizontal position is within the goalie reach
        if(whichObj._gsTransform.y < 150 && whichObj._gsTransform.x > goaliePos - 20 && whichObj._gsTransform.x < goaliePos + 20){
            //it's been saved, so kill the kick tween on the ball and shadow, and fire a rebound
            console.log('SAVED!!!');
            gameText.innerHTML = 'SAVED!!!';
            TweenLite.killTweensOf([ball,ballShadow]);
            TweenLite.to([ball,ballShadow],1,{y:100, x: 100 * (shotAngle), ease:Sine.easeOut});
            saveCounter++;
            console.log('saves: ' + saveCounter);
            if(saveCounter < 2){
                saveCounterText.innerHTML = saveCounter + ' SAVE';
            }
            else{
                saveCounterText.innerHTML = saveCounter + ' SAVES';
            }
        }
        //otherwise the ball passes the goalie for a goal
        if(whichObj._gsTransform.y > 200){
            gameText.innerHTML = 'GOAL!!!';
            console.log('GGOOOOOAAAAALLLLLLLL!!!');
            TweenLite.killTweensOf([ball,ballShadow]);
            goalCounter++;
            console.log('goals: ' + goalCounter);
            if(goalCounter < 2){
                goalCounterText.innerHTML = goalCounter + ' GOAL';
            }
            else{
                goalCounterText.innerHTML = goalCounter + ' GOALS';
            }
        }
    }
}

//set up the listener for the keypress to launch the goalie jump
window.addEventListener("keyup", keyupHandler, false);
function keyupHandler(e){
    //if the space bar is pressed
    if (e.keyCode == "32") {
        TweenLite.to(titleFrameContainer, 2, {alpha:0});
        TweenLite.to(gameFrameContainer, 2, {alpha:1});
        //shoot!
        startGame();
    }
    //if the right arrow is pressed
    if (e.keyCode == "39"){
        //set the direction multiplier to +1
        goalieOffset = 1;
        //...and jump
        goalieJump(goalieOffset);
    }
    //if the left arrow is pressed
    if (e.keyCode == "37"){
        //set the direction multiplier to -1
        goalieOffset = -1;
        //...and jump
        goalieJump(goalieOffset);
    }

}

function goalieMove(whichGoalie){
    goaliePos = whichGoalie._gsTransform.x;
}

function goalieJump(offset){
    //this tween uses the direction multiplier from the keyuphandler to tween 100px in the appropriate direction,
    //and starts updating the goalie position to be used as a check in the ball tweening function
    TweenLite.to(goalie,0.5,{x:75 * offset, ease:Sine.easeOut, onUpdate:goalieMove,onUpdateParams:[goalie]});
}

//function to restart shots
function checkShotCount(){
    if(currentShotCount < totalShots){
        TweenLite.delayedCall(4, showShootOut);
        currentShotCount++;
    }
    else{
        TweenLite.delayedCall(3, gameOver);
    }
}

function gameOver(){
    btnReplay.style.display = "block";
    gameText.innerHTML = 'GAME OVER';
}

//function for when the replay button is clicked, counter elements need to be reset
function btnReplay_clickHandler(){
    startGame();
    currentShotCount = 1;
    saveCounter = 0;
    goalCounter = 0;
    saveCounterText.innerHTML = saveCounter + ' SAVES';
    goalCounterText.innerHTML = goalCounter + ' GOALS';
}

//functions to rotate replay button
function btnReplay_overHandler(){
    TweenLite.to(btnReplay, 0.4, {rotation:360, delay:0});
}

function btnReplay_outHandler(){
    TweenLite.to(btnReplay, 0.2, {rotation:0, delay:0});
}

//title screen animatons
function titleAnimation(){
    bounceBall();
    pulseSpaceBarText();
    shakeLetters();
}

function bounceBall(){
    TweenLite.from(phantomTitleO, 2.5, { ease: Bounce.easeOut, y:-210 });
}

function pulseSpaceBarText(){
    TweenLite.to(spaceBarTitle, 1.5, {scale:0.75, ease:Sine.easeInOut});
    TweenLite.to(spaceBarTitle, 1.5, {scale:1, ease:Sine.easeInOut, delay:1.4, onComplete: pulseSpaceBarText});
}

function shakeLetters(){
    TweenLite.fromTo([phantomTitleP, phantomTitleH, phantomTitleA, phantomTitleN, phantomTitleT, phantomTitleM], 1.5, {x:-1}, {x:1, ease:RoughEase.ease.config({strength:16, points:30, template:Linear.easeNone, randomize:false}) , clearProps:"x", delay:0.9, onComplete:shakeTitle});
}

function shakeTitle(){
    TweenLite.fromTo(phantomTitle, 1.5, {x:-1}, {x:1, ease:RoughEase.ease.config({strength:16, points:30, template:Linear.easeNone, randomize:false}) , clearProps:"x", delay:4, onComplete:shakeTitle});
}

titleAnimation();

