function addDays(theDate, days) {
  return new Date(theDate.getTime() + days*24*60*60*1000);
}

function prevMonth(date)
{
  var newDate = new Date(date.getTime());
  newDate.setDate(1);
  newDate.setTime(newDate.getTime() - 1*24*60*60*1000);
  return newDate;
}

function nextMonth(date)
{
  var newDate = new Date(date.getTime());
  newDate.setDate(1);
  newDate.setTime(newDate.getTime() + 31*24*60*60*1000);
  return newDate;
}

function fillMonth(context, move)
{
  context.navTitle.text(MONTH_NAMES[context.date.getMonth()] + ", " + context.date.getFullYear());
  
  var frame = $(" \
    <div class='month'> \
      <table> \
        <thead> \
          <th>Mo<th>Tu<th>We<th>Th<th>Fr<th>Sa<th>Su \
        </thead> \
        <tbody> \
          <tr><td id='11'><td id='12'><td id='13'><td id='14'><td id='15'><td id='16'><td id='17'></tr> \
          <tr><td id='21'><td id='22'><td id='23'><td id='24'><td id='25'><td id='26'><td id='27'></tr> \
          <tr><td id='31'><td id='32'><td id='33'><td id='34'><td id='35'><td id='36'><td id='37'></tr> \
          <tr><td id='41'><td id='42'><td id='43'><td id='44'><td id='45'><td id='46'><td id='47'></tr> \
          <tr><td id='51'><td id='52'><td id='53'><td id='54'><td id='55'><td id='56'><td id='57'></tr> \
          <tr><td id='61'><td id='62'><td id='63'><td id='64'><td id='65'><td id='66'><td id='67'></tr> \
        </tbody> \
      </table> \
    </div> \
  ");

  if (move < 0)
    frame.css("margin-left", "110%");
  else if (move > 0)
    frame.css("margin-left", "-110%");
  
  context.calendar.append(frame);
  
  var daystosubtract = [ 6, 7, 1, 2, 3, 4, 5 ];
  var dateIterator = new Date(context.date.getTime());
  dateIterator.setDate(1);
  dateIterator = addDays(dateIterator, -daystosubtract[dateIterator.getDay()]);
  for (var y = 1; y <= 6; y++)
  {
    for (var x = 1; x <= 7; x++)
    {
      var daySelector = $("#" + context.calendarId + " #" + y.toString() + x.toString());
      daySelector.text(dateIterator.getDate());
      daySelector.attr("date", dateIterator.getTime());
      daySelector.css("cursor", "pointer");
      if (dateIterator.getMonth() != context.date.getMonth())
      {
        daySelector.css("color", "lightgray");
      }
      if (dateIterator.getTime() == context.curDate.getTime())
      {
        daySelector.css("color", "blue");
        daySelector.css("font-weight", "bold");
      }
      daySelector.click(function() {
        context.calendar.remove();
        var selDate = new Date();
        selDate.setTime($(this).attr("date"));
        context.completionHandler(true, new Date(parseInt($(this).attr("date"))));
      });
      daySelector.hover(function() {
          $(this).css("box-shadow", "2px 2px 5px #888888");
          $(this).css("background-color", "white");
        }, function() {
          $(this).css("box-shadow", "none");
          $(this).css("background-color", "whitesmoke");
      });
      dateIterator = addDays(dateIterator, 1);
    }
  }
  
  if (move)
    frame.animate({"margin-left": "0%"}, "fast");
}
