var K_ESC = 27;
var MONTH_NAMES = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

function Calendar(_calendarId, _date, element, _completionHandler) {

  if ($("#" + _calendarId).length)
    return null;
  
  var frame = $(" \
    <div id='" + _calendarId + "' class='calendar' tabindex='0'> \
      <div id='calendar_current'> \
      </div> \
      <div id='calendar_nav'> \
        <span id='calendar_nav_left'>◄</span> \
        <span id='calendar_nav_title'></span> \
        <span id='calendar_nav_right'>►</span> \
      </div> \
    </div> \
  ");
  
  var pos = element.position();
  frame.css("left", pos.left + "px");
  frame.css("top", (pos.top + element.height()) + "px");
  
  $("body").append(frame);
  
  var current = $("#" + _calendarId + " #calendar_current");
  current.text(_date.toDateString());

  var context = {
    calendarId: _calendarId,
    curDate: _date,
    date: _date,
    completionHandler: _completionHandler,
    calendar: $("#" + _calendarId),
    nav: $("#" + _calendarId + " #calendar_nav"),
    navLeft: $("#" + _calendarId + " #calendar_nav_left"),
    navRight: $("#" + _calendarId + " #calendar_nav_right"),
    navTitle: $("#" + _calendarId + " #calendar_nav_title"),
  };

  current.hover(function() {
      $(this).css("text-decoration", "underline");
    }, function() {
      $(this).css("text-decoration", "none");
  });
  
  current.click(close);
  
  context.navLeft.hover(function() {
      $(this).css("color", "blue");
    }, function() {
      $(this).css("color", "black");
  });
  
  context.navLeft.click(function(event) {
    var monthSelector = $("#" + context.calendarId + " .month");
    if (monthSelector.is(":animated"))
      return;
    monthSelector.removeClass("month");
    monthSelector.addClass("movingleft");
    monthSelector.animate({"margin-left": "-110%"}, "fast", function() {
      $(this).remove();
    });
    context.date = prevMonth(context.date);
    fillMonth(context, -1);
  });

  context.navRight.hover(function() {
      $(this).css("color", "blue");
    }, function() {
      $(this).css("color", "black");
  });

  context.navRight.click(function(event) {
    var monthSelector = $("#" + context.calendarId + " .month");
    if (monthSelector.is(":animated"))
      return;
    monthSelector.removeClass("month");
    monthSelector.addClass("movingright");
    monthSelector.animate({"margin-right": "-110%"}, "fast", function() {
      $(this).remove();
    });
    context.date = nextMonth(context.date);
    fillMonth(context, 1);
  });

  context.navTitle.hover(function() {
      $(this).css("color", "blue");
    }, function() {
      $(this).css("color", "black");
  });

  context.calendar.keydown(function(event) {
    if (event.which == K_ESC) {
      close();
    }
  });
  
  fillMonth(context, 0);
  
  context.calendar.focus();

  var width = context.calendar.width();
  var height = context.calendar.height();
  
  context.calendar.css("width", "0");
  context.calendar.css("height", "0");
  context.calendar.animate({"width": width, "height": height}, "fast");
  
  function close() {
    context.calendar.animate({"width": 0, "height": 0}, "fast", function() {
      context.calendar.remove();
      context.completionHandler(false, context.curDate);
    });
  }
}
