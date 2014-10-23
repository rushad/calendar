if (typeof module !== "undefined")
{
  Util = require("./util.js");
}

function Year(container, date, initialDate, completionHandler)
{
  if (!container || !container.is || !container.is(".ru_rushad_calendar_view"))
    throw "Year: wrong container element";

  if (!date || !(date instanceof Date))
    throw "Year: wrong date";

  if (!initialDate || !(initialDate instanceof Date))
    throw "Year: wrong initial date";

  if ($("#" + container.attr("id") + " .ru_rushad_calendar_year").length)
    throw "Year: already exists";

  var year = {
    id: Util.UUID(),
    container: container,
    date: new Date(date.getTime()),
    initialDate: new Date(initialDate.getTime()),
    completionHandler: completionHandler,

    init: function(){
      var frame = $(" \
        <div id='" + this.id + "' class='ru_rushad_calendar_year'> \
          <table> \
            <tbody> \
              <tr><td id='jan' month='0'>Jan<td id='feb' month='1'>Feb<td id='mar' month='2'>Mar<td id='apr' month='3'>Apr</tr> \
              <tr><td id='may' month='4'>May<td id='jun' month='5'>Jun<td id='jul' month='6'>Jul<td id='aug' month='7'>Aug</tr> \
              <tr><td id='sep' month='8'>Sep<td id='oct' month='9'>Oct<td id='nov' month='10'>Nov<td id='dec' month='11'>Dec</tr> \
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
        self.date.setMonth($(this).attr("month"));
        self.close();
        self.completionHandler(true, self.date);
      });
    },

    title: function(){
      return this.date.getFullYear();
    },

    jqYear: function(){
      return $("#" + this.id);
    },

    close: function(){
      this.jqYear().remove();
    },

    prev: function(date){
      var newDate = new Date(date.getTime());
      newDate.setDate(1);
      newDate.setMonth(0);
      newDate.setTime(newDate.getTime() - 1*24*60*60*1000);
      return newDate;
    },

    next: function(date){
      var newDate = new Date(date.getTime());
      newDate.setDate(1);
      newDate.setMonth(11);
      newDate.setTime(newDate.getTime() + 31*24*60*60*1000);
      return newDate;
    }
  };

  year.init();

  return year;
}

if (typeof module !== "undefined")
  module.exports = Year;

