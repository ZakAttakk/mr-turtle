var turtle = document.querySelector("#turtle");

var nourishment = document.querySelector("#nourishment");
var energy = document.querySelector("#energy");
var love = document.querySelector("#love");

var foodButton = document.querySelector("#foodButton");
var sleepButton = document.querySelector("#sleepButton");
var loveButton = document.querySelector("#loveButton");

foodButton.addEventListener("click", increaseFood);
sleepButton.addEventListener("click", sleep);
loveButton.addEventListener("click", increaseLove);

var nourishmentLevel = 100;
var energyLevel = 100;
var loveLevel = 100;

function increaseFood(){
    nourishmentLevel += 20;
    if (nourishmentLevel > 100){
        nourishmentLevel = 100;
    }
    nourishment.innerHTML = nourishmentLevel;
    foodButton.classList.add("disabled");
    
    setTimeout(
        function(){
            if(!sleeping){
                foodButton.classList.remove("disabled");
            }
        }
        , 2000);
}

var sleeping = false;
function sleep(){
    sleeping = true;
    energyLevel = 100;
    energy.innerHTML = energyLevel;
    foodButton.classList.add("disabled");
    loveButton.classList.add("disabled");
    sleepButton.classList.add("disabled");
    turtle.src = "images/sleep.png"
    
    setTimeout(function(){ 
        foodButton.classList.remove("disabled");
        loveButton.classList.remove("disabled");
        sleepButton.classList.remove("disabled");
        sleeping = false;
        
        if (nourishmentLevel <= 40 && !sleeping && !gameOver){
            turtle.src = "images/sad.png"
        } 
        else if (loveLevel <= 40 && !sleeping && !gameOver){
            turtle.src = "images/angry.png"
        }
        else if (energyLevel <= 40 && !sleeping && !gameOver){
            turtle.src = "images/tired.png"
        }
        else {
            if (!gameOver){
                turtle.src = "images/happy.png";
            }
        }
        
    }, 4000
    );
}

function increaseLove(){
    loveLevel += 20;
    if (loveLevel > 100){
        loveLevel = 100;
    }
    love.innerHTML = loveLevel;
    loveButton.classList.add("disabled");
    
    setTimeout(
        function(){
            if(!sleeping){
                loveButton.classList.remove("disabled");
            }
        }
        , 3000);
}

var turtleTimer = setInterval(turtleBiometricsCalculator, 3000);
var gameOver = false;

function turtleBiometricsCalculator(){
    if (nourishmentLevel > 0){
        nourishmentLevel -= 15;
    }
    if (nourishmentLevel < 0){
        nourishmentLevel = 0;
    }
    
    if (energyLevel > 0 && !sleeping){
        energyLevel -= 15;
    }
    if (energyLevel < 0){
        energyLevel = 0;
    }
    
    
    if (loveLevel > 0){
        loveLevel -= 15;
    }
    if (loveLevel < 0){
        loveLevel = 0;
    }
    
    
    nourishment.innerHTML = nourishmentLevel;
    energy.innerHTML = energyLevel;
    love.innerHTML = loveLevel;
    
    if (nourishmentLevel <= 40 && !sleeping && !gameOver){
        turtle.src = "images/sad.png"
    } 
    else if (loveLevel <= 40 && !sleeping && !gameOver){
        turtle.src = "images/angry.png"
    }
    else if (energyLevel <= 40 && !sleeping && !gameOver){
        turtle.src = "images/tired.png"
    }
    else {
        if (!sleeping){
            turtle.src = "images/happy.png";
        }
    }
    
    if (nourishmentLevel <= 0 || loveLevel <= 0 || energyLevel <= 0){
        gameOver = true;
        clearInterval(turtleTimer);
        clearInterval(gameTimer);
        turtle.src = "images/dead.png";
        foodButton.classList.add("hide");
        loveButton.classList.add("hide");
        sleepButton.classList.add("hide");
        alert("Mr. Turtle didn't make it...")
    }
}

var gameTimerDisplay = document.querySelector("#gameTimerDisplay");
var gameTime = 120;
var gameTimer = setInterval(gameCountdown, 1000);


function gameCountdown(){
    if (gameTime > 0){
        gameTime -= 1;
        gameTimerDisplay.innerHTML = gameTime;
    }
    else {
        gameOver = true;
        clearInterval(turtleTimer);
        clearInterval(gameTimer);
        turtle.src = "images/very-happy.png";
        foodButton.classList.add("hide");
        loveButton.classList.add("hide");
        sleepButton.classList.add("hide");
        alert("You won!  Mr. Turtle is all grown-up.  He'll take if from here!");
    }
}
