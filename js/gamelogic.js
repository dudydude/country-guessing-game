function GuessingGame(country, difficulty, pos) {
  //set up the game
  this.country = country;
  this.difficulty = difficulty;
  this.pos = pos;
  // gameplay
  this.countryPicked = {};
  this.countryAlreadyUsed = [];
  // follow the score
  this.score = 0;
  this.lifeLeft = 3;
  this.turnLeft = 15;
}

// FEATURE #
// Difficulty
// MultiPlayer (2 or +) => initializing players name & make them play one after one
// Leaderboard
// Submit new category via @mail:to button

// create a new turn

GuessingGame.prototype.randomPick = function() {
  this.countryPicked = this.country[
    Math.floor(Math.random() * this.country.length)
  ];
  if (this.countryAlreadyUsed.indexOf(this.countryPicked) === -1) {
    this.countryAlreadyUsed.push(this.countryPicked);
  } else if (Math.random() > 0.01) {
    return myGame.randomPick();
  }
  return this.countryPicked;
};

// check right

GuessingGame.prototype.checkIfRight = function(countryPicked, countryUser) {
  this.turnLeft = this.turnLeft - 1;
  var countryUser = prompt(
    "To which country refer the following letters : " + this.countryPicked.pos
  );
  if (countryUser.toLowerCase() === this.countryPicked.name) {
    this.score = this.score + 1;
  } else {
    this.lifeLeft = this.lifeLeft - 1;
    console.log("il vous reste " + this.lifeLeft + " vies");
  }
  console.log(this.turnLeft);
  console.log("votre score est de " + this.score + " points");
  return this.score;
};

// How the game end

GuessingGame.prototype.noMoreLives = function(lifeLeft) {
  if (this.lifeLeft === O) {
    //return true;
    console.log("sorry bobby, no more lives :(");
  }
};

GuessingGame.prototype.gameFinish = function(turnLeft) {
  if (this.turnLeft === O) {
    //return true;
    console.log("finito bambino");
  }
};
