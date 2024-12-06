import {Player} from "./Player";
import {settings as s} from "./settings";

const players = [new Player('js'), new Player('love')]
const scoreElements = Array.from(document.querySelectorAll('.result li'))
const ulElement = document.getElementById(s.appUlId)
const pTimeElement = document.querySelector(s.timeSelector)
let currentPlayer = 0;
const titles = []
const scoreTextContents = scoreElements.map(scoreElement =>scoreElement.textContent)
let remainingTime = s.maxTime;
let timerId = null;

function displayLostForm() {
    document.body.append( document.querySelector(s.lostFormSelector).content)
}

function updateTimer() {
    remainingTime--
    displayRemainingTime()
    if (remainingTime === 0){
        clearInterval(timerId)
        displayLostForm()
    }
}

function play(clickedLi) {
    if (timerId === null){
        timerId = setInterval(()=>{
            updateTimer()
        },1000)
    }
    console.log(clickedLi)
    if (clickedLi.classList.length === 1){
        clickedLi.classList.add(s.tilesBaseClass +"--" +  players[currentPlayer].name);

    }
    players[currentPlayer].score++
    displayScore()
    if (currentPlayer === 0){
        currentPlayer = 1;
    }else {
        currentPlayer = 0;
    }
    previewPlayer()
}

function previewPlayer(){
    ulElement.className = s.appUlClass + " " + players[currentPlayer].name;
}
function displayRemainingTime() {
    pTimeElement.textContent = `${addZero(Math.trunc(remainingTime/ 60))}:${addZero(Math.trunc(remainingTime % 60))}`
}
function displayScore(){
    scoreElements[currentPlayer].textContent = scoreTextContents[currentPlayer] +players[currentPlayer].score

}


function addZero(number){
    if (number < 10){
        return '0' + number
    }
    return number + '';
}

function generateLi() {
    const liElement = document.createElement('li')
    liElement.className = s.tilesBaseClass;
    liElement.addEventListener('click', (e) => {
        play(e.currentTarget);
    })
    ulElement.appendChild(liElement);
    titles.push(liElement)
}

for (let i = 0; i < s.maxTiles; i++) {
    generateLi();

}
previewPlayer()
displayRemainingTime()
document.documentElement.classList.add(s.jsEnabledClass);
