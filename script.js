const scoreElement = document.querySelector('.score');
const startOverButton = document.querySelector(".start-over-button");

let userAnswer = 0;
let globalScore = 0;
let maxFalafelCount = 10;
let fallenFalafelCount = 0;
let gameStopped = false;

class ArithmeticQuestion {
    constructor(operand1, operand2, operator) {
      this.operand1 = operand1;
      this.operand2 = operand2;
      this.operator = operator;
      this.answer = this.calculateAnswer();
    }
  
    calculateAnswer() {
      let answer;
      switch (this.operator) {
        case '+':
          answer = this.operand1 + this.operand2;
          break;
        case '-':
          answer = this.operand1 - this.operand2;
          break;
        case '*':
          answer = this.operand1 * this.operand2;
          break;
        case '/':
          answer = this.operand1 / this.operand2;
          break;
      }
      return answer;
    }
  
    displayQuestion() {
        return `${this.operand1} ${this.operator} ${this.operand2}`;
      }
}

class FallingItem {
  constructor() {
      this.element = document.createElement('div');
      this.element.classList.add('falling-item');
      this.element.addEventListener('click', this.stopFalling.bind(this));
      document.querySelector('.game-container').appendChild(this.element);
      this.winScreen = document.querySelector(".win-screen");
      this.lostScreen = document.querySelector(".lost-screen");
      this.startOverButton = document.querySelector(".start-over-button");
  
      this.question = this.generateQuestion();
      this.displayQuestion();
      this.startFalling();
      // this.showWinScreen();
      // this.hideWinScreen();
  }
    
  showWinScreen() {
    //winMessage.textContent = "Congratulations! You won!";
    this.winScreen.style.display = "block";
  }

  hideWinScreen() {
    this.winScreen.style.display = "none";
  }

  
  showLostScreen() {
    this.lostScreen.style.display = "flex";
    // this.startOverButton.style.display = "flex";
    startOverButton.addEventListener("click", this.startOver.bind(this));

  }

  hideLostScreen() {
    this.lostScreen.style.display = "none";
  }

  resetGame() {
    //globalScore = 0;
    scoreElement.textContent = `Score: ${globalScore} / ${maxFalafelCount}`;
    this.hideLostScreen();
  }

  generateQuestion() {
      const operand1 = Math.floor(Math.random() * 10) + 1;
      const operand2 = Math.floor(Math.random() * 10) + 1;
      const operators = ['+', '-', '*', '/'];
      const operator = operators[Math.floor(Math.random() * operators.length)];
  
      return new ArithmeticQuestion(operand1, operand2, operator);
    }
  
  displayQuestion() {
    this.element.textContent = this.question.displayQuestion();
  }
  
  startFalling() {
    this.setPosition();
    this.element.style.animation = 'falling-animation 15s linear forwards';
  }
  
  setPosition() {
      const containerWidth = document.querySelector('.game-container').offsetWidth;
      const containerHeight = document.querySelector('.game-container').offsetHeight;
  
      const randomX = Math.floor(Math.random() * (containerWidth - this.element.offsetWidth));
      const randomY = Math.floor(Math.random() * (containerHeight - this.element.offsetHeight - 60));
  
      this.element.style.left = randomX + 'px';
      this.element.style.top = randomY + 'px';
  }
  
  updateScore(scoreChange) {
    if (!gameStopped){
       globalScore += scoreChange;
       scoreElement.textContent = `Score: ${globalScore} / ${maxFalafelCount}`;

      if (scoreChange < 0) {
        fallenFalafelCount++;
        
          if (fallenFalafelCount >= maxFalafelCount) {
            this.stopGame();
            //this.removeFalling();
            this.showLostScreen();
          }
      }
    }
  }

    
  stopGame() {
    gameStopped = true;
  }

    removeFalling() {
      this.element.remove();
      console.log('Falling item removed');
    }

    stopFalling() {
      this.element.style.animation = 'none';
       userAnswer = prompt(`Enter the answer to: ${this.question.operand1} ${this.question.operator} ${this.question.operand2}`);

      if (parseInt(userAnswer) === this.question.answer) {
        // Correct answer
        this.element.classList.add('correct-answer');
        this.updateScore(2); // Increment score by 2 for correct answer

        // this.score += 2; // Increase score by 2 for a correct answer
      } else {
        // Incorrect answer
        this.element.classList.add('incorrect-answer');
        //this.element.classList.remove('hiddeמ');
        this.updateScore(-1); // Decrement score by 1 for incorrect answer
        console.log(this.score);

      }
  
      // Check if the maximum falafel count has been reached
      if (globalScore >= maxFalafelCount) {
        this.removeFalling();
        this.showWinScreen();
      } else if (this.element===10) {
        this.removeFalling();
        this.showLostScreen();
      } else {
        this.hideWinScreen();
        this.hideLostScreen();
      } 
    }

  startOver() {
    fallenFalafelCount = 0;
    globalScore = 0;
    scoreElement.textContent = `Score: ${globalScore} / ${maxFalafelCount}`;
    lostScreen.style.display = "none";
    gameStopped = false;
  }
}
  //   startOverButton.addEventListener("click", () => {
  //     const fallingItems = document.querySelectorAll(".falling-item");
  //     fallingItems.forEach((item) => item.remove());
  //     new FallingItem(); 
  // });

  
  setInterval(() => {
    if (!gameStopped && globalScore < maxFalafelCount){
    new FallingItem();
    }
  }, 1500);
  
  
