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
  this.turnLeft = 5;
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
  } else if (Math.random() > 0.001) {
    return this.randomPick();
  }
  return this.countryPicked;
};

// check right

GuessingGame.prototype.checkIfRight = function(countryPicked, countryUser) {
  this.turnLeft = this.turnLeft - 1;
  var countryUser = document.getElementById("user-answer").value;

  if (countryUser.toLowerCase() === this.countryPicked.name) {
    this.score = this.score + 1;
    return true;
  } else {
    this.lifeLeft = this.lifeLeft - 1;
    return false;
  }
};

// How the game end

GuessingGame.prototype.noMoreLives = function() {
  if (this.lifeLeft === O) {
    //return true;
    console.log("sorry bobby, no more lives :(");
  }
};

GuessingGame.prototype.gameFinish = function() {
  if (this.turnLeft === O) {
    //return true;
    console.log("finito bambino");
  }
};
