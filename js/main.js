var world_geometry;
var map;
var marker;

//pour récupérer les pays + capitale https://www.countries-ofthe-world.com/capitals-of-the-world.html
// map.setCenter a utilisé pour modifier la position

$(document).ready(function() {
  $(window).resize(function() {
    google.maps.event.trigger(map, "resize");
  });

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
  // marker = new google.maps.Marker({
  //   position: newCenter,
  //   map: map
  // });

  var iso = `ISO_2DIGIT IN ('${guessingGame.countryPicked.layer}')`;

  world_geometry = new google.maps.FusionTablesLayer({
    query: {
      select: "geometry",
      from: "1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk",
      where: iso
    },
    map: map,
    suppressInfoWindows: true,

    styles: [
      {
        polygonOptions: {
          fillColor: "#FF0000",
          strokeColor: "#FF0000",
          strokeWeight: "int"
        }
      }
    ]
  });
  // marker = new google.maps.Marker({
  //   position: newCenter,
  //   map: map
  // });

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

  $("#letsplay").click(function() {
    $("#rules").css({ display: "none" });
    $("#game-board").css({ display: "flex" });
    google.maps.event.trigger(map, "resize");
    // $("#map").html("<h2>" + map + "</h2>");
    $("#map").html(map.setCenter(newCenter));
    $("#score").html("<p>" + "Score: " + guessingGame.score + "</p>");
  });

  // After reading the rules ==> let's play

  $("#letsplay").click(function() {
    $("#rules").css({ display: "none" });
    $("#game-board").css({ display: "flex" });
  });
  // use to set difficulty - check comment appeler le bon deck correspondant

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
      if (guessingGame.score < Math.floor(guessingGame.totalTurn / 2)) {
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
      // $("#map").html(marker.setPosition(newCenter));
      // $("map").html(world_geometry.setMap(map));

      // Test Maxence
      world_geometry.setMap(null);
      world_geometry.setQuery({
        select: "geometry",
        from: "1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk",
        where: `ISO_2DIGIT IN ('${guessingGame.countryPicked.layer}')`
      });
      world_geometry.setMap(map);
    }
  });

  // Restart game

  $("#restart-btn").click(function() {
    reset();
  });
});
