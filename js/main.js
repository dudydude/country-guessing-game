var country = [
  {
    name: "france",
    countryCapital: "paris",
    pos: { lat: 48.8, lng: 2.3 },
    difficulty: 3
  },
  {
    name: "china",
    countryCapital: "peking",
    pos: { lat: 48.8, lng: 2.3 },
    difficulty: 1
  },
  {
    name: "japan",
    countryCapital: "tokyo",
    pos: { lat: 48.8, lng: 2.3 },
    difficulty: 2
  },
  {
    name: "russia",
    countryCapital: "moscow",
    pos: { lat: 48.8, lng: 2.3 },
    difficulty: 1
  },
  {
    name: "united states",
    countryCapital: "washington dc",
    pos: { lat: 48.8, lng: 2.3 },
    difficulty: 1
  },
  {
    name: "belgium",
    countryCapital: "bruxelles",
    pos: { lat: 48.8, lng: 2.3 },
    difficulty: 1
  },
  {
    name: "brazil",
    countryCapital: "brasilia",
    pos: { lat: 52, lng: 23.3 },
    difficulty: 1
  },
  {
    name: "afghanistan",
    countryCapital: "kabul",
    pos: { lat: 28.8, lng: 2.3 },
    difficulty: 2
  },
  {
    name: "rwanda",
    countryCapital: "kigali",
    pos: { lat: 48.8, lng: 2.3 },
    difficulty: 3
  },
  {
    name: "denmark",
    countryCapital: "copenhagen",
    pos: { lat: 48.8, lng: 2.3 },
    difficulty: 1
  },
  {
    name: "ecuador",
    countryCapital: "quito",
    pos: { lat: 48.8, lng: 2.3 },
    difficulty: 3
  }
];
//pour récupérer les pays + capitale https://www.countries-ofthe-world.com/capitals-of-the-world.html
// map.setCenter a utilisé pour modifier la position
var map;

$(document).ready(function() {
  // TEMP
  var guessingGame = new GuessingGame(country);

  var turn = guessingGame.randomPick().pos;

  var newCenter = { lat: turn.lat, lng: turn.lng };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: newCenter,
    mapTypeId: "terrain"
  });

  $("#click").click(function() {
    $("#home-game").css({ display: "none" });
    $("#game-board").css({ display: "flex" });
    // $("#map").html("<h2>" + map + "</h2>");
    $("#map").html(map.setCenter(map));
  });

  $("#user-submit").click(function() {
    var right = guessingGame.checkIfRight();
    if (right === true) {
      $("#score").html("<h2>" + guessingGame.score + "</h2>");
    } else {
      $(".heart-on:last")
        .removeClass("heart-on")
        .addClass("heart-off");
      // $(".heart-off")
      //   .last()
      //   .css({ display: "flex" });
    }
    if (guessingGame.turnLeft === 0 || guessingGame.lifeLeft === 0) {
      $("#game-board").css({ display: "none" });
      $("#last-screen").css({ display: "flex" });
      if (guessingGame.lifeLeft === 0) {
        $("#winner").css({ display: "none" });
      } else {
        $("#looser").css({ display: "none" });
      }
    } else {
      $("input[type=text], textarea").val("");
      guessingGame.randomPick();
      $("#map").html(map.setCenter(map));
    }
  });
});
