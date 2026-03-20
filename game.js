const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const match_box = document.getElementById("match-box");
const gamebox = document.getElementById("gamebox");
const hintBoxes = document.querySelectorAll("#match-box .hint-box");
const submit = document.getElementById("submit");
const skip = document.getElementById("skip");
const timer = document.getElementById("timer");
const scorebox = document.getElementById("score");

let colors = [
  "rgb(9, 146, 194)",
  "rgb(66, 122, 67)",
  "rgb(181, 0, 178)",
  "rgb(255, 91, 91)",

  "rgb(246, 128, 72)",
  "rgb(37, 52, 63)",
  "rgb(116, 10, 3)",
  "rgb(228, 255, 48)",

  "rgb(93, 211, 182)",
  "rgb(197, 216, 157)"
];

let answerColors = []

let i = 0
function boxclick(event) {
  if (i == 10) { i = 0 }
  event.target.style.backgroundColor = colors[i];
  i++;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomColor() {
  hintBoxes.forEach(box => {
    let randomnumber = getRandomInt(colors.length);
    box.style.backgroundColor = colors[randomnumber];
  })
}

function createHintBoxes(numBoxes) {
  match_box.innerHTML = "";
  
  for (let i = 0; i < numBoxes; i++) {
    let randomnumber = getRandomInt(colors.length)
    match_box.innerHTML += `<div class="hint-box" style="background-color: ${colors[randomnumber]}"></div>`
    answerColors.push(colors[randomnumber])
  }
  console.log(answerColors)
}

function createBoxes(numBoxes) {
  gamebox.innerHTML = " ";
  
  for (let i = 0; i < numBoxes; i++) {
    let randomnumber = getRandomInt(colors.length);

    //setting up a box
    const box = document.createElement("div");
    box.classList.add("gamebox");
    box.style.backgroundColor = colors[randomnumber];
    box.addEventListener("click", boxclick);

    //Adding it into the document
    gamebox.appendChild(box);
  }
}

function submitted() {
  const box_color_list = document.querySelectorAll(".gamebox")
  let correct = 0
  for (i = 0; i < answerColors.length; i++) {
    let elementStyle = window.getComputedStyle(box_color_list[i]);
    console.log(i)
    if (elementStyle.backgroundColor === answerColors[i]) {
      console.log("correct")
      correct++

    } else {
      console.log("incorrect")
      
    }
  }

  console.log(correct)
  if (correct === boxAmount) {
    console.log("Next Level...")
    level++
    createHintBoxes(boxAmount)
    createBoxes(boxAmount)
    score=score*1000*scoreMultiplier
    scorebox.innerHTML= score;
    // timeRemaining = 30;
    // clearInterval(timerID)
    // setInterval(counter,1000);
  }
}

function counter(){
	if (timeRemaining > 0){
    timer.innerHTML = timeRemaining--;
  }
	else{
    timer.innerHTML="You Lose!";
    timeRemaining = 30;
  }
}

let timeRemaining = 30;
let boxAmount = 2;
let level = 1;
let score = 1;
let scoreMultiplier = 1;
randomColor()
createHintBoxes(boxAmount)
createBoxes(boxAmount)

let timerID = setInterval(counter,1000);

submit.addEventListener("click", submitted)
//skip.addEventListener("click", skipped)