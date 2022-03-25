let numSquares = 4; // 6
let lifePlayer = 3;
let colors = [];
let pickedColor;
 
let squares_div = document.querySelectorAll(".square");
let colorDisplay_span = document.querySelector("#color-display");
let messageDisplay_span = document.querySelector("#message");
let lifePlayerDisplay_span = document.querySelector("#life-player");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let easyButton = document.querySelector(".mode");

init();

function init() {
  colorDisplay_span.textContent = pickedColor;
  setupSquares();
  setupModel();
  reset();
}

resetButton.addEventListener("click", function() {
  reset();
});

function setupSquares() {
  for (let i = 0; i < squares_div.length; i++) {
    squares_div[i].style.backgroundColor = colors[i]; 
    squares_div[i].addEventListener("click", function() {
      let clickedColor = this.style.backgroundColor;
      if (clickedColor == pickedColor) {
        messageDisplay_span.textContent = "Correct";
        resetButton.textContent = "Play Again";
        changeColors(pickedColor);
      } 
      else {
        if (lifePlayer === 1) {
          lifePlayerDisplay_span.textContent = "LIFE : 0";
          messageDisplay_span.textContent = "Game Over";
          for (let i = 0; i < squares_div.length; i++) {
            squares_div[i].style.backgroundColor =  "#232323";
            squares_div[i].style.display = "hidden";
          }
        } else {
          this.style.backgroundColor = "#232323";
          messageDisplay_span.textContent = "Try Again";
          lifePlayer--;
          lifePlayerDisplay_span.textContent = "LIFE : " + lifePlayer;
        }
      }
    }); 
  }
}

function setupModel() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].classList.remove("selected");
      }
      this.classList.add("selected");
      if (this.textContent === "Easy") {
        numSquares = 4;
      } 
      else if (this.textContent === "Normal") {
        numSquares = 6;
      }
      else {
        numSquares = 9;
      }
      reset();
    });
  }
}

function reset() {
  colors = genRandomColors(numSquares);
  pickedColor = chooseColors();
  colorDisplay_span.textContent = pickedColor;
  lifePlayerDisplay_span.textContent = "Life : " + lifePlayer;
  if (lifePlayer < 3) {
    let resetLife = 3;
    lifePlayer = resetLife;
    lifePlayerDisplay_span.textContent = "Life : " + lifePlayer;
  }
  h1.style.backgroundColor = "#2C8E99";
  resetButton.textContent = "New Colors";
  messageDisplay_span.textContent = "";
  for (let i = 0; i < squares_div.length; i++) {
    if (colors[i]) {
      squares_div[i].style.display = "block";
      squares_div[i].style.backgroundColor = colors[i];
    } 
    else {
      squares_div[i].style.display = "none";
    }
  }
}

function changeColors(color) {
  for (let i = 0; i < squares_div.length; i++) {
    squares_div[i].style.backgroundColor = color;
    h1.style.backgroundColor = color;
  }
}

function chooseColors() {
  let random = Math.floor(Math.random() * colors.length);
  // console.log(random);
  // console.log(colors.length);
  // console.log(colors[random]);
  return colors[random];
}

function genRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(makeColor());
  }
  return arr;
}

function makeColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
