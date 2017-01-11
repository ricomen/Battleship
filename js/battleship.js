var view = {
  displayMessage: function(msg) {
    var messageArea = document.querySelector(".messageArea");
    if (messageArea) {
    messageArea.innerHTML = msg;
    } else {return "error";}
  },
      displayHit: function(location) {
    var hit = document.getElementById(location);
    hit.classList.add("hit");
  },
     displayMiss: function(location) {
    var miss = document.getElementById(location);
    miss.classList.add("miss");
  }
}
var model = {
   boardSize: 7,
    numShips: 3,
   shipsSunk: 0,
  shipLength: 3,
       ships: [{ locations: ["10", "20", "30"], hits: ["", "", ""] },
               { locations: ["32", "33", "34"], hits: ["", "", ""] },
               { locations: ["63", "64", "65"], hits: ["", "", ""] } ],
        fire: function(guess) {
          for (var i = 0; i < this.numShips; i++) {          
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
              if( index >= 0 ) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                  view.displayMessage("You sunk my battleship!");
                  this.shipsSunk++;
                }
                return true;
              }
            }
            view.displayMiss(guess);
            view.displayMessage("You missed.");
            return false;          
        },
      isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
          if (ship.hits[i] !== "hit") {
            return false;
          }
          return true;
        }
      },
      generateShipLocations: function() {
        var locations;
        for ( var i = 0; i < this.numShips; i++) {
          do {
            locations = this.generateShip();
          } while ( this.collision(locations) );
          this.ships[i].locations = locations;
        }
      },
      generateShip: function() {},
      collision: function () {}
};

var controller = {
        guesses: 0,
  processGuess: function(guess) {
    var location = parseGuess(guess);
    if ( location ) {
      this.guesses++;
      var hit = model.fire(location);
      if ( hit && model.shipsSunk === model.numShips ) {
        view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
      }
    }
  }
}

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if ( guess === null || guess.length !== 2 ) {
    alert("Ups, please enter a letter a nd number on the board");
  } else {
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    if( isNaN(row) || isNaN(column) ) {
      alert("Ups, that isn't on the board.");
    } else if ( row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize ) {
        alert("Ups, that's off the board!");
      } else return row + column;
    }
  return null;
  }

function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

}
function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value.toUpperCase();
  controller.processGuess(guess);
  guessInput.value = "";
}

function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if ( e.keyCode === 13 ) {
    fireButton.click();
    return false;
  }
}
window.onload = init;