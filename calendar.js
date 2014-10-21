var Month;
if (typeof module !== "undefined")
  Month = require("./month.js");

var K_ESC = 27;

﻿function Calendar(x, y, _date, completionHandler){

  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  var date = (_date ? _date : new Date());

  var calendar = {
    id: (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-"
      + S4() + S4() + S4()).toLowerCase(),
    x: x,
    y: y,
    initialDate: date,
    date: date,
    completionHandler: completionHandler,

    jqCalendar: function(){
      return $("#" + this.id);
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
          <div id='ru_rushad_calendar_initial_date'> \
          </div> \
          <div> \
            <span id='ru_rushad_calendar_left'>◄</span> \
            <span id='ru_rushad_calendar_title'></span> \
            <span id='ru_rushad_calendar_right'>►</span> \
          </div> \
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

      this.jqInitialDate().click(this, function(event){
        var self = event.data;
        self.close();
      });

      this.jqCalendar().keydown(this, function(event){
        if (event.which == K_ESC){
          var self = event.data;
          self.close();
        }
      });

      this.jqCalendar().focus();
    },

    close: function(){
      if (this.completionHandler)
        this.completionHandler(false, this.initialDate);
      this.jqCalendar().remove();
    }

  };

  calendar.init();

  var mon = new Month(calendar.jqCalendar(), calendar.date, calendar.initialDate);
  calendar.jqTitle().text(mon.title());

  return calendar;
}

if (typeof module !== "undefined")
  module.exports = Calendar;
