const foodEatenSound = new Audio('./sounds/foodEatenSound.mp3');
const gameOverSound = new Audio('./sounds/gameWooSound.mp3');
const moveSound = new Audio('./sounds/moveSound.mp3');

const board = document.querySelector('.board');
const scoreBox = document.querySelector('.score');
const buttons = document.querySelector('.buttons');
const upbutton = document.querySelector('.upbutton');
const downbutton = document.querySelector('.downbutton');
const leftbutton = document.querySelector('.leftbutton');
const rightbutton = document.querySelector('.rightbutton');

let foodPosition ={x:10,y:10};
let inputDir = {x:0,y:0};
let snakeArr=[
    {x:12,y:12}
]

let score = 0;

let speed = 5;
let lastRefreshTime = 0;

function main(currTime){
    window.requestAnimationFrame(main);
    // console.log(currTime);
    if((currTime - lastRefreshTime)/1000 < 1/speed){
        return;
    }
    lastRefreshTime = currTime;
    playGame();
}

function makeSnake(){

    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0 ){
         snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    })
   
    
}

function makeFood(){
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    
}



function foodEaten(){
    
    if(foodPosition.x === snakeArr[0].x && foodPosition.y === snakeArr[0].y){
        foodEatenSound.play();
        score+=1;
        scoreBox.innerHTML = "Score :" + score; 
        foodPosition.x = Math.round((Math.random() * 18)+1);
        foodPosition.y = Math.round((Math.random() * 18)+1);
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    }
}

function crashed(){

    //crashed with itself
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y===snakeArr[0].y){
            return true;
        }
    }

    //crash with the wall
    if(snakeArr[0].x<=0 || snakeArr[0].x>20 || snakeArr[0].y<0 || snakeArr[0].y>20){
        return true;
    }
    return false;

}


function playGame(){
    
    //if crashed
    if(crashed()){
        gameOverSound.play();
        alert('GameOver! Your Score is '+ score);
        score=0;
        scoreBox.innerHTML = "Score " + score; 
        foodPosition ={x:10,y:10};
        inputDir = {x:0,y:0};
        snakeArr=[{x:12,y:12}];
    }

    //if food has eaten
    foodEaten();

    
    
    //move the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML="";
    makeSnake();
    makeFood();
    //if eat the food


}



window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    // console.log(e.key);
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})

upbutton.addEventListener('click',e=>{
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = -1;
})

downbutton.addEventListener('click',e=>{
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = 1;
})

leftbutton.addEventListener('click',e=>{
    moveSound.play();
    inputDir.x = -1;
    inputDir.y = 0;
})

rightbutton.addEventListener('click',e=>{
    moveSound.play();
    inputDir.x = 1;
    inputDir.y = 0;
})

