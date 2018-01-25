var country = [
  {
    name: "france",
    countryCapital: "paris",
    pos: { lat: 48.8, lng: 2.3 },
    difficulty: 3
  },
  {
    name: "china",
    countryCapital: "pekin",
    pos: { lat: 39.9, lng: 116.3 },
    difficulty: 1
  },
  {
    name: "japan",
    countryCapital: "tokyo",
    pos: { lat: 35.6, lng: 139.6 },
    difficulty: 2
  },
  {
    name: "russia",
    countryCapital: "moscow",
    pos: { lat: 55, lng: 37 },
    difficulty: 1
  },
  {
    name: "united states",
    countryCapital: "washington dc",
    pos: { lat: 38.5, lng: 77 },
    difficulty: 1
  },
  {
    name: "belgium",
    countryCapital: "bruxelles",
    pos: { lat: 50.8, lng: 4.3 },
    difficulty: 1
  },
  {
    name: "brazil",
    countryCapital: "brasilia",
    pos: { lat: -15.4, lng: -47.5 },
    difficulty: 1
  },
  {
    name: "afghanistan",
    countryCapital: "kabul",
    pos: { lat: 34.5, lng: 69.1 },
    difficulty: 2
  },
  {
    name: "rwanda",
    countryCapital: "kigali",
    pos: { lat: -1.5, lng: 30.3 },
    difficulty: 3
  },
  {
    name: "denmark",
    countryCapital: "copenhagen",
    pos: { lat: 55, lng: 12 },
    difficulty: 1
  },
  {
    name: "ecuador",
    countryCapital: "quito",
    pos: { lat: -0.13, lng: -78.3 },
    difficulty: 3
  }
];
//pour récupérer les pays + capitale https://www.countries-ofthe-world.com/capitals-of-the-world.html
// map.setCenter a utilisé pour modifier la position
var map;
var marker;

$(document).ready(function() {
  $(window).resize(function() {
    google.maps.event.trigger(map, "resize");
  });
  function newLocation(newLat, newLng) {
    map.setCenter({
      lat: newLat,
      lng: newLng
    });
  }
  var guessingGame = new GuessingGame(country);
  var turn = guessingGame.randomPick().pos;
  var newCenter = { lat: turn.lat, lng: turn.lng };

  // Map initialisation + style
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: newCenter,
    mapTypeId: "terrain",
    mapTypeControl: false,
    disableDefaultUI: true,
    styles: [
      {
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.country",
        stylers: [
          {
            color: "#1d1b07"
          },
          {
            weight: 1
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.neighborhood",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }
    ]
  });
  marker = new google.maps.Marker({
    position: newCenter,
    map: map
  });

  // Fonctione reset game

  function reset() {
    $("input[type=text], textarea").val("");
    guessingGame = new GuessingGame(country);
    guessingGame.randomPick();
    $(".heart-off")
      .removeClass("heart-off")
      .addClass("heart-on");
    $("#last-screen").css({ display: "none" });
    $("#game-board").css({ display: "flex" });
    google.maps.event.trigger(map, "resize");
    // $("#map").html("<h2>" + map + "</h2>");
    $("#map").html(map.setCenter(newCenter));
  }

  // Start new game with Click

  $("#click").click(function() {
    $("#home-game").css({ display: "none" });
    $("#rules").css({ display: "flex" });
  });

  // After reading the rules ==> let's play

  $("#letsplay").click(function() {
    $("#rules").css({ display: "none" });
    $("#choose-difficulty").css({ display: "flex" });
  });
  // use to set difficulty - check comment appeler le bon deck correspondant

  $("#easy").click(function() {
    $("#choose-difficulty").css({ display: "none" });
    $("#game-board").css({ display: "flex" });
    google.maps.event.trigger(map, "resize");
    // $("#map").html("<h2>" + map + "</h2>");
    $("#map").html(map.setCenter(newCenter));
    $("#score").html("<p>" + "Score: " + guessingGame.score + "</p>");
  });

  // Check user answer

  $("#user-submit").click(function() {
    var right = guessingGame.checkIfRight();
    if (right === true) {
      $("#score").html("<p>" + "Score: " + guessingGame.score + "</p>");
    } else {
      $(".heart-on:last")
        .removeClass("heart-on")
        .addClass("heart-off");
    }
    // If you have no more lives, or if there is no turn left ==> end of the game
    if (guessingGame.turnLeft === 0 || guessingGame.lifeLeft === 0) {
      $("#game-board").css({ display: "none" });
      $("#last-screen").css({ display: "flex" });
      $("#user-score").html(
        "<h2>" + "Your score is : " + guessingGame.score + "/10" + "</h2>"
      );

      // If your score is above the average (number of turn / 2), you are "winner"
      if (
        guessingGame.lifeLeft === 0 &&
        guessingGame.score < Math.floor(guessingGame.turnLeft / 2)
      ) {
        $("#winner").css({ display: "none" });
      } else {
        $("#looser").css({ display: "none" });
      }

      // If the game is finish, I reset the counter to their initial value

      guessingGame.score = 0;
      guessingGame.lifeLeft = 3;
      guessingGame.turnLeft = 10;
      $("#score").html("<p>" + "Score: " + guessingGame.score + "</p>");
    } else {
      // If not, the map display a new country
      $("input[type=text], textarea").val("");
      turn = guessingGame.randomPick().pos;
      newCenter = { lat: turn.lat, lng: turn.lng };
      $("#map").html(map.setCenter(newCenter));
      $("#map").html(marker.setPosition(newCenter));
    }
  });

  // Restart game

  $("#restart-btn").click(function() {
    reset();
  });
});
