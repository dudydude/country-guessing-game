function GuessingGame(country, difficulty, pos) {
  //set up the game
  this.country = country;
  this.difficulty = country.difficulty;
  this.pos = country.pos;
  // gameplay
  this.countryPicked = {};
  this.countryAlreadyUsed = [];
  // follow the score
  this.score = 0;
  this.lifeLeft = 3;
  this.turnLeft = 15;
}

var randomCountry = this.country[
  Math.floor(Math.random() * this.country.length)
];

// map.setCenter a utilisé pour modifier la position

// Set up the game

// FEATURE #1
// Ajouter des joueurs + nom == > GuessingGame.prototype.setPlayers = functione () {};

// G A M E P L A Y

// ==+> erreur ren

GuessingGame.prototype.randomPick = function() {
  this.countryPicked = this.country[
    Math.floor(Math.random() * this.country.length)
  ];
  if (this.countryAlreadyUsed.indexOf(this.countryPick) === -1) {
    this.countryAlreadyUsed.push(this.countryPick);
  } else {
    return this.countryPicked.push(randomPick);
  }
  //var randomPick = this.country[Math.floor(Math.random() * this.country.length)];
};

// Fonction dédiée à check country

// GuessingGame.prototype.alreadyChecked = function(country) {
//   if (this.countryAlreadyUsed.indexOf(country) === -1) {
//     this.countryAlreadyUsed.push(country);
//     return true;
//   } else {
//     return false;
//   }
// };

GuessingGame.prototype.checkIfRight = function(countryPicked, countryUser) {
  if (this.countryPicked.name === this.countryUser.name) {
    this.score++;
  }
  return this.score;
};

GuessingGame.prototype.checkIfWrong = function(countryPicked, countryUser) {
  if (this.countryPicked.name !== this.countryUser.name) {
    var lifeLeft = this.lifeLeft - 1;
  }
  return this.lifeLeft;
};

// METHODE USELESS ?

// GuessingGame.prototype.gameScoreUpdate = function() {
//   if (checkIfRight === true) {
//     var score = score + 1;
//   }
// };

// How the game end

GuessingGame.prototype.noMoreLives = function() {
  if (lifeLeft === O) {
    return true;
  } else {
    return false;
  }
};

GuessingGame.prototype.gameFinish = function() {
  if (turnLeft === O) {
    return true;
  } else {
    return false;
  }
};

// IF TWO PLAYER //

//GuessingGame.prototype.andTheWisnnerIs = function() {};

// and after ?

//GuessingGame.prototype.reset = function() {};

// FEATURE #
// Leaderboard
// Submit new category via @mail:to button
// MultiPlayer (2 or +) => initializing players name & make them play one after one
