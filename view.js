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
    fromRect: null,
    toRect: null,
    mouseX: null,

    init: function(type, toRight){
      this.type = type;
      switch(this.type){
        case Util.ViewType.MONTH:
          if (this.fromRect)
            this.explodeAnimation();
          this.view = new Month(this.container, this.date, this.initialDate, toRight, this.completionHandler);
          break;
        case Util.ViewType.YEAR:
          if (this.fromRect)
            this.explodeAnimation();
          var self = this;
          this.view = new Year(this.container, this.date, this.initialDate, toRight, function(ok, date, rect){
            if (ok)
              self.date = date;
            self.fromRect = rect;
            self.init(Util.ViewType.MONTH);
          });
          break;
        case Util.ViewType.DECADE:
          var self = this;
          this.view = new Decade(this.container, this.date, this.initialDate, toRight, function(ok, date,rect){
            if (ok)
              self.date = date;
            self.fromRect = rect;
            self.init(Util.ViewType.YEAR);
          });
          break;
      }
      this.title.text(this.view.title());
    },

    explodeAnimation: function(){
      var width = this.container.css("width");
      var height = this.container.css("height");
      this.container.css({
        "background-color": Util.Style.BackgroundColor.Hover,
        "box-shadow": Util.Style.BoxShadow.Hover,
        left: this.fromRect.left,
        top: this.fromRect.top,
        width: this.fromRect.width,
        height: this.fromRect.height
      });
      this.container.animate({left: 0, top: 0, width: width, height: height}, "fast", function(){
        this.container.css({
          "background-color": Util.Style.BackgroundColor.Normal,
          "box-shadow": Util.Style.BoxShadow.Normal,
        });
        this.fromRect = null;
      }.bind(this));
    },

    collapseAnimation: function(completionHandler)
    {
      var width = this.container.css("width");
      var height = this.container.css("height");
      this.container.css({
        "background-color": Util.Style.BackgroundColor.Hover,
        "box-shadow": Util.Style.BoxShadow.Hover
      });
      this.container.animate(this.toRect, "fast", function(){
        this.container.css({
          "background-color": Util.Style.BackgroundColor.Normal,
          "box-shadow": Util.Style.BoxShadow.Normal,
          left: 0,
          top: 0,
          width: width,
          height: height
        });
        this.toRect = null;
        completionHandler();
      }.bind(this));
    },

    goPrev: function(){
      this.date = this.view.prev(this.date);
      var view = this.view;
      $("#" + view.id).removeClass($("#" + view.id).attr("class"));
      $("#" + view.id).addClass("ru_rushad_calendar_moving");

      this.container.css("margin-left", -this.container.width());
      this.container.animate({"margin-left": 0}, "fast", function() {
        view.close();
      });
      this.init(this.type, true);
      
      return this.date;
    },

    goNext: function(){
      this.date = this.view.next(this.date);
      var view = this.view;
      $("#" + view.id).removeClass($("#" + view.id).attr("class"));
      $("#" + view.id).addClass("ru_rushad_calendar_moving");

      this.container.animate({"margin-left": "-" + $("#" + view.id).width()}, "fast", function() {
        view.close();
        $(this).css("margin-left", "0");
      });
      this.init(this.type, false);

      return this.date;
    },

    goUp: function(){
      if (this.type == Util.ViewType.DECADE)
        return;
      this.toRect = this.view.rectInPeriod();
      this.collapseAnimation(function(){
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
      }.bind(this));
    },

    goDown: function(){
      this.view.close();
      var type = this.type;
      switch(this.type){
        case Util.ViewType.YEAR:
          type = Util.ViewType.MONTH;
          break;
        case Util.ViewType.DECADE:
          type = Util.ViewType.YEAR;
          break;
      }
      this.init(type);
    }
  };

  view.init(type);

  $(view.container).mousedown(function(e){
    this.mouseX = e.clientX;
  }.bind(view));
  $(view.container).mouseup(function(e){
    if (e.clientX - this.mouseX > 50)
      this.goPrev();
    else if (e.clientX - this.mouseX < -50)
      this.goNext();
  }.bind(view));

  return view;
}

if (typeof module !== "undefined")
  module.exports = View;
