if (typeof module !== "undefined")
{
  Util = require("./util.js");
  View = require("./view.js");
}

function Calendar(x, y, _date, completionHandler){

  var date = (_date ? _date : new Date());

  var calendar = {
    id: Util.UUID(),
    x: x,
    y: y,
    initialDate: date,
    date: date,
    completionHandler: completionHandler,
    view: null,

    jqCalendar: function(){
      return $("#" + this.id);
    },

    jqView: function(){
      return $("#" + this.id + " .ru_rushad_calendar_view");
    },

    jqInitialDate: function(){
      return $("#" + this.id + " #ru_rushad_calendar_initial_date");
    },

    jqLeft: function(){
      return $("#" + this.id + " #ru_rushad_calendar_left");
    },

    jqRight: function(){
      return $("#" + this.id + " #ru_rushad_calendar_right");
    },

    jqTitle: function(){
      return $("#" + this.id + " #ru_rushad_calendar_title");
    },

    init: function(){
      var frame = $(" \
        <div id='" + this.id + "' class='ru_rushad_calendar' tabindex='0'> \
          <div id='ru_rushad_calendar_initial_date'></div> \
          <div> \
            <span id='ru_rushad_calendar_left'>◄</span> \
            <span id='ru_rushad_calendar_title'></span> \
            <span id='ru_rushad_calendar_right'>►</span> \
          </div> \
          <div id='" + this.id + "' class='ru_rushad_calendar_view'></div> \
        </div> \
      ");

      frame.css("left", this.x + "px");
      frame.css("top", this.y + "px");

      $("body").append(frame);

      this.jqInitialDate().text(this.initialDate.toDateString());
      this.jqInitialDate().hover(function(){
        $(this).css("text-decoration", "underline");
      }, function(){
        $(this).css("text-decoration", "none");
      });

      var navigation = this.jqLeft().add(this.jqRight()).add(this.jqTitle());
      navigation.hover(function(){
        $(this).css("color", "blue");
      }, function(){
        $(this).css("color", "black");
      });

      var self = this;

      this.jqLeft().click(function(){
        self.date = self.view.goPrev();
      });

      this.jqRight().click(function(){
        self.date = self.view.goNext();
      });

      this.jqTitle().click(function(){
        self.view.goUp();
      });

      this.jqInitialDate().click(function(event){
        self.close();
      });

      this.jqCalendar().keydown(function(event){
        if (event.which == Util.Key.ESC)
          self.close();
        else if(event.which == Util.Key.LEFT)
          self.date = self.view.goPrev();
        else if(event.which == Util.Key.RIGHT)
          self.date = self.view.goNext();
        else if(event.which == Util.Key.UP)
          self.view.goUp();
        else if(event.which == Util.Key.DOWN)
          self.view.goDown();
      });

      this.view = new View(Util.ViewType.MONTH, this.jqView(), this.jqTitle(), this.date, this.initialDate,
        function(date){
          self.jqCalendar().remove();
          if (self.completionHandler)
            self.completionHandler(true, date);
        });

      this.jqCalendar().focus();

      this.jqCalendar().css("width", this.jqCalendar().width());
      this.jqCalendar().css("height", this.jqCalendar().height());
      this.jqView().css("width", this.jqView().width());
      this.jqView().css("height", this.jqView().height());
    },

    close: function(){
      if (this.completionHandler)
        this.completionHandler(false, this.initialDate);
      this.jqCalendar().remove();
    }

  };

  calendar.init();

  return calendar;
}

if (typeof module !== "undefined")
  module.exports = Calendar;
