if (typeof module !== "undefined")
{
  Util = require("./util.js");
}

function Month(container, date, initialDate, prepend, completionHandler)
{
  var MONTH_NAMES = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

  if (!container || !container.is || !container.is(".ru_rushad_calendar_view"))
    throw "Month: wrong container element";

  if (!date || !(date instanceof Date))
    throw "Month: wrong date";

  if (!initialDate || !(initialDate instanceof Date))
    throw "Month: wrong initial date";

  if ($("#" + container.attr("id") + " .ru_rushad_calendar_month").length)
    throw "Month: already exists";

  var month = {
    id: Util.UUID(),
    container: container,
    date: new Date(date.getTime()),
    initialDate: new Date(initialDate.getTime()),
    completionHandler: completionHandler,

    init: function(){
      var frame = $(" \
        <div id='" + this.id + "' class='ru_rushad_calendar_month'> \
          <table> \
            <thead> \
              <th>Mo<th>Tu<th>We<th>Th<th>Fr<th>Sa<th>Su \
            </thead> \
            <tbody> \
              <tr><td id='td11'><td id='td12'><td id='td13'><td id='td14'><td id='td15'><td id='td16'><td id='td17'></tr> \
              <tr><td id='td21'><td id='td22'><td id='td23'><td id='td24'><td id='td25'><td id='td26'><td id='td27'></tr> \
              <tr><td id='td31'><td id='td32'><td id='td33'><td id='td34'><td id='td35'><td id='td36'><td id='td37'></tr> \
              <tr><td id='td41'><td id='td42'><td id='td43'><td id='td44'><td id='td45'><td id='td46'><td id='td47'></tr> \
              <tr><td id='td51'><td id='td52'><td id='td53'><td id='td54'><td id='td55'><td id='td56'><td id='td57'></tr> \
              <tr><td id='td61'><td id='td62'><td id='td63'><td id='td64'><td id='td65'><td id='td66'><td id='td67'></tr> \
            </tbody> \
          </table> \
        </div> \
      ");
      if (prepend)
        this.container.prepend(frame);
      else
        this.container.append(frame);
      this.fill();
    },

    title: function(){
      return (MONTH_NAMES[this.date.getMonth()] + ", " + this.date.getFullYear());
    },

    jqMonth: function(){
      return $("#" + this.id);
    },

    ﻿addDays: function(date, days) {
      return new Date(date.getTime() + days*24*60*60*1000);
    },

    fill: function(){
      var daysToSubtract = [ 6, 7, 1, 2, 3, 4, 5 ];
      var dateIterator = new Date(this.date.getTime());
      dateIterator.setDate(1);
      dateIterator = this.addDays(dateIterator, -daysToSubtract[dateIterator.getDay()]);
      for (var y = 1; y <= 6; y++){
        for (var x = 1; x <= 7; x++){
          var daySelector = $("#" + this.id + " #td" + y.toString() + x.toString());
          daySelector.text(dateIterator.getDate());
          daySelector.attr("date", dateIterator.getTime());
          if (dateIterator.getMonth() != this.date.getMonth()){
            daySelector.css("color", Util.Style.Color.DateOutOfPeriod);
          }
          if (dateIterator.getTime() == this.initialDate.getTime()){
            daySelector.css("color", Util.Style.Color.InitialDay);
            daySelector.css("font-weight", Util.Style.FontWeight.InitialDay);
          }
          daySelector.click(this, function(event){
            var selDate = new Date();
            selDate.setTime($(this).attr("date"));
            event.data.completionHandler(selDate);
          });
          daySelector.hover(function(){
            $(this).css("box-shadow", Util.Style.BoxShadow.Hover);
            $(this).css("background-color", Util.Style.BackgroundColor.Hover);
          }, function() {
            $(this).css("box-shadow", Util.Style.BoxShadow.Normal);
            $(this).css("background-color", Util.Style.BackgroundColor.Normal);
          });
          dateIterator = this.addDays(dateIterator, 1);
        }
      }
    },

    close: function(){
      this.jqMonth().remove();
    },

    prev: function(date){
      var newDate = new Date(date.getTime());
      newDate.setDate(1);
      newDate.setTime(newDate.getTime() - 1*24*60*60*1000);
      return newDate;
    },

    next: function(date){
      var newDate = new Date(date.getTime());
      newDate.setDate(1);
      newDate.setTime(newDate.getTime() + 31*24*60*60*1000);
      return newDate;
    },

    rectInPeriod: function(){
      var rect = {};
      rect.left = Math.floor(this.date.getMonth() % 4) * 25 + "%";
      rect.top = Math.floor(this.date.getMonth() / 4) * 25 + "%";
      rect.width = "25%";
      rect.height = "25%";
      return rect;
    }
  };

  month.init(date);

  return month;
}

if (typeof module !== "undefined")
  module.exports = Month;
