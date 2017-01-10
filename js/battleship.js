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
      }
};
var controller = {
        guesses: 0,
  processGuesee: function(guess) {
    
  }
}