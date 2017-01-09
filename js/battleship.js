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

view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");