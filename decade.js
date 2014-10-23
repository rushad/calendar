if (typeof module !== "undefined")
{
  Util = require("./util.js");
}

function Decade(container, date, initialDate, completionHandler)
{
  if (!container || !container.is || !container.is(".ru_rushad_calendar_view"))
    throw "Decade: wrong container element";

  if (!date || !(date instanceof Date))
    throw "Decade: wrong date";

  if (!initialDate || !(initialDate instanceof Date))
    throw "Decade: wrong initial date";

  if ($("#" + container.attr("id") + " .ru_rushad_calendar_decade").length)
    throw "Decade: already exists";

  var decade = {
    id: Util.UUID(),
    container: container,
    date: new Date(date.getTime()),
    initialDate: new Date(initialDate.getTime()),
    completionHandler: completionHandler,

    init: function(){
      var frame = $(" \
        <div id='" + this.id + "' class='ru_rushad_calendar_decade'> \
          <table> \
            <tbody> \
              <tr><td id='td01'>2009<td id='td02'>2010<td id='td03'>2011<td id='td04'>2012</tr> \
              <tr><td id='td05'>2013<td id='td06'>2014<td id='td07'>2015<td id='td08'>2016</tr> \
              <tr><td id='td09'>2017<td id='td10'>2018<td id='td11'>2019<td id='td12'>2020</tr> \
            </tbody> \
          </table> \
        </div> \
      ");

      this.container.append(frame);

      $("#" + this.id + " td").hover(function(){
        $(this).css("box-shadow", Util.Style.BoxShadow.Hover);
        $(this).css("background-color", Util.Style.BackgroundColor.Hover);
      }, function() {
        $(this).css("box-shadow", Util.Style.BoxShadow.Normal);
        $(this).css("background-color", Util.Style.BackgroundColor.Normal);
      });

      $("#" + this.id + " td").click(this, function(e){
        var self = e.data;
//        self.date.setMonth($(this).attr("month"));
        self.close();
        self.completionHandler(true, self.date);
      });
    },

    title: function(){
      var begin = Math.floor(this.date.getFullYear()/10)*10;
      return begin + "-" + (begin + 9);
    },

    jqDecade: function(){
      return $("#" + this.id);
    },

    close: function(){
      this.jqDecade().remove();
    },

    prev: function(date){
      var newDate = new Date(date.getTime());
/*      newDate.setDate(1);
      newDate.setMonth(0);
      newDate.setTime(newDate.getTime() - 1*24*60*60*1000);*/
      return newDate;
    },

    next: function(date){
      var newDate = new Date(date.getTime());
/*      newDate.setDate(1);
      newDate.setMonth(11);
      newDate.setTime(newDate.getTime() + 31*24*60*60*1000);*/
      return newDate;
    }
  };

  decade.init();

  return decade;
}

if (typeof module !== "undefined")
  module.exports = Decade;

