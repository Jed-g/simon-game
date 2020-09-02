$(document).keypress(initializeGame);

let generatedOrderArray = [];
let roundNo = 0;

function initializeGame() {
  $(document).off("keypress");
  $("h1").text("Good Luck :)");
  generatedOrderArray = [];
  roundNo = 0;
  newRound();
}

function newRound() {
  roundNo++;
  generateAndAnimateOrder(roundNo);
  $("h1").text("Round No. " + roundNo);
  setTimeout(expectAnswer, roundNo * 600 + 400);
}

function generateAndAnimateOrder() {
  generatedOrderArray = [];
  for (i = 0; i < roundNo; i++) {
    let randomNumber = Math.floor(Math.random() * 4 + 1);
    switch (randomNumber) {
      case 1:
        generatedOrderArray.push("red");
        break;
      case 2:
        generatedOrderArray.push("blue");
        break;
      case 3:
        generatedOrderArray.push("green");
        break;
      case 4:
        generatedOrderArray.push("yellow");
        break;
      default:
        break;
    }

    let temp = generatedOrderArray[i];
    setTimeout(function() {
      $("." + temp).animate({
        opacity: 0
      }, 300).animate({
        opacity: 1
      }, 300);
      let audio = new Audio("sounds/" + temp + ".mp3");
      audio.play();
    }, i * 600);
  }
}

function expectAnswer() {
  $("h1").text(generatedOrderArray.length + " clicks left...");
  $(".btn").click(buttonClicked);
}

function buttonClicked() {
  $(".btn").off("click");
  if (this.name == generatedOrderArray.shift()) {
    $(this).animate({
      opacity: 0
    }, 300).animate({
      opacity: 1
    }, 300);
    let audio = new Audio("sounds/" + this.name + ".mp3");
    audio.play();
    if (generatedOrderArray.length == 0) {
      setTimeout(newRound, 1400);
      setTimeout(function() {
        $("h1").text("Well done!");
      }, 200);
    } else {
      setTimeout(expectAnswer, 400);
    }
  } else {
    animateWrong(this, 0);
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Wrong :(");
    setTimeout(function() {
      $("h1").text("Press any key to start!");
    }, 2000);
    $(document).keypress(initializeGame);
  }
}

function animateWrong(button, recursiveIndex) {
  if (recursiveIndex % 2 == 0) {
    $(button).addClass("wrong");
  } else {
    $(button).removeClass("wrong");
  }
  recursiveIndex++;
  if (recursiveIndex < 4) {
    setTimeout(function() {
      animateWrong(button, recursiveIndex);
    }, 80);
  }
}
