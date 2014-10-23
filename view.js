if (typeof module !== "undefined")
{
  Month = require("./month.js");
  Year = require("./year.js");
  Decade = require("./decade.js");
  Util = require("./util.js");
}

function View(type, container, title, date, initialDate, completionHandler)
{
  var view = {
    type: null,
    container: container,
    title: title,
    date: new Date(date.getTime()),
    initialDate: new Date(initialDate.getTime()),
    completionHandler: completionHandler,
    view: null,

    init: function(type){
      this.type = type;
      switch(this.type){
        case Util.ViewType.MONTH:
          this.view = new Month(this.container, this.date, this.initialDate, this.completionHandler);
          break;
        case Util.ViewType.YEAR:
          var self = this;
          this.view = new Year(this.container, this.date, this.initialDate, function(ok, date){
            if (ok)
              self.date = date;
            self.init(Util.ViewType.MONTH);
          });
          break;
        case Util.ViewType.DECADE:
          var self = this;
          this.view = new Decade(this.container, this.date, this.initialDate, function(ok, date){
            if (ok)
              self.date = date;
            self.init(Util.ViewType.YEAR);
          });
          break;
      }
      this.title.text(this.view.title());
    },

    goPrev: function(){
      this.date = this.view.prev(this.date);
      this.view.close();
      this.init(this.type);
      return this.date;
    },

    goNext: function(){
      this.date = this.view.next(this.date);
      this.view.close();
      this.init(this.type);
      return this.date;
    },

    goUp: function(){
      this.view.close();
      var type = this.type;
      switch(this.type){
        case Util.ViewType.MONTH:
          type = Util.ViewType.YEAR;
          break;
        case Util.ViewType.YEAR:
          type = Util.ViewType.DECADE;
          break;
      }
      this.init(type);
    },

    goDown: function(){
      this.view.close();
      var type = this.type;
      switch(this.type){
        case Util.ViewType.YEAR:
          type = Util.ViewType.MONTH;
          break;
      }
      this.init(type);
    }
  };

  view.init(type);

  return view;
}

if (typeof module !== "undefined")
  module.exports = View;
