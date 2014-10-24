if (typeof module !== "undefined")
{
  Util = require("./util.js");
}

function Decade(container, date, initialDate, prepend, completionHandler)
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
              <tr><td id='td1'><td id='td2'><td id='td3'><td id='td4'></tr> \
              <tr><td id='td5'><td id='td6'><td id='td7'><td id='td8'></tr> \
              <tr><td id='td9'><td id='td10'><td id='td11'><td id='td12'></tr> \
            </tbody> \
          </table> \
        </div> \
      ");

      if (prepend)
        this.container.prepend(frame);
      else
        this.container.append(frame);

      var y = Math.floor(this.date.getFullYear() / 10) * 10 - 1;
      for (var i = 1; i <= 12; i++)
        $("#" + this.id + " #td" + i).text(y++);
      $("#" + this.id + " #td1").css("color", Util.Style.Color.DateOutOfPeriod);
      $("#" + this.id + " #td12").css("color", Util.Style.Color.DateOutOfPeriod);

      $("#" + this.id + " td").hover(function(){
        $(this).css("box-shadow", Util.Style.BoxShadow.Hover);
        $(this).css("background-color", Util.Style.BackgroundColor.Hover);
      }, function() {
        $(this).css("box-shadow", Util.Style.BoxShadow.Normal);
        $(this).css("background-color", Util.Style.BackgroundColor.Normal);
      });

      $("#" + this.id + " td").click(this, function(e){
        var self = e.data;
        self.date.setYear($(this).text());
        var rect = {
          left: $(this).position().left,
          top: $(this).position().top,
          width: $(this).css("width"),
          height: $(this).css("height")
        };
        self.close();
        self.completionHandler(true, self.date, rect);
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
      newDate.setDate(1);
      newDate.setMonth(0);
      newDate.setFullYear(Math.floor(date.getFullYear()/10)*10);
      newDate.setTime(newDate.getTime() - 10*(365.2425-1)*24*60*60*1000);
      return newDate;
    },

    next: function(date){
      var newDate = new Date(date.getTime());
      newDate.setDate(1);
      newDate.setMonth(0);
      newDate.setFullYear(Math.floor(date.getFullYear()/10)*10);
      newDate.setTime(newDate.getTime() + 10*(365.2425+1)*24*60*60*1000);
      return newDate;
    }
  };

  decade.init();

  return decade;
}

if (typeof module !== "undefined")
  module.exports = Decade;

