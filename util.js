var Util = {
  UUID: function(){
    function S4(){
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-"
      + S4() + S4() + S4()).toLowerCase();
  },

  ViewType: {
    MONTH: 1,
    YEAR: 2,
    DECADE: 3,
    CENTURY: 4
  },

  Key: {
    ESC: 27, 
    LEFT: 37, 
    UP: 38, 
    RIGHT: 39,
    DOWN: 40
  },

  Style: {
    BackgroundColor: {
      Hover: "white",
      Normal: "whitesmoke"
    },
    BoxShadow: {
      Hover: "2px 2px 5px #888888",
      Normal: "none"
    },
    Color: {
      DateOutOfPeriod: "silver",
      InitialDay: "blue"
    },
    FontWeight: {
      InitialDay: "bold"
    }
  }
  
}

if (typeof module !== "undefined")
  module.exports = Util;
