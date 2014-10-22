var assert = require("assert");
var jsdom = require("jsdom");
var jquery = require("jQuery");

var Calendar = require("../calendar.js");

describe("Calendar: ", function(){
  beforeEach(function(done){
  document = jsdom.jsdom("");
  window = document.parentWindow;
  $ = jquery(window);
    done();
  });

  it("shouldn't return null", function(){
    var cal = new Calendar();
    assert.notEqual(cal, null);
  });

  it("should generate unique guid", function(){
    var cal1 = new Calendar();
    assert.equal(cal1.id.length, 36);
    var cal2 = new Calendar();
    assert.notEqual(cal1.id, cal2.id);
  });

  it("should store params in object", function(){
    function handler() {}
    var date = new Date();
    var cal = new Calendar(123, 321, date, handler);
    assert.equal(cal.x, 123);
    assert.equal(cal.y, 321);
    assert.equal(cal.initialDate, date);
    assert.equal(cal.completionHandler, handler);
  });

  it("should set default initialDate to current date", function(){
    var cal = new Calendar();
    assert.equal(cal.initialDate.toDateString(), new Date().toDateString());
  });

  it("should create DOM element with generated id", function(){
    var cal = new Calendar();
    assert.notEqual($(".ru_rushad_calendar").length, 0);
    assert.equal($(".ru_rushad_calendar").attr("id"), cal.id);
  });

  it("jqCalendar() should return jQuery selector for calendar frame element", function(){
    var cal1 = new Calendar();
    var cal2 = new Calendar();
    assert.equal(cal1.jqCalendar().is($("#" + cal1.id)), true);
    assert.notEqual(cal1.jqCalendar().is($("#" + cal2.id)), true);
  });

  it("jqInitialDate() should return jQuery selector for initial date element", function(){
    var cal1 = new Calendar();
    var cal2 = new Calendar();
    assert.equal(cal2.jqInitialDate().is($("#" + cal2.id + " #ru_rushad_calendar_initial_date")), true);
    assert.notEqual(cal2.jqInitialDate().is($("#" + cal1.id + " #ru_rushad_calendar_initial_date")), true);
  });

  it("jqLeft() should return jQuery selector for left arrow element", function(){
    var cal1 = new Calendar();
    var cal2 = new Calendar();
    assert.equal(cal1.jqLeft().is($("#" + cal1.id + " #ru_rushad_calendar_left")), true);
    assert.notEqual(cal1.jqLeft().is($("#" + cal2.id + " #ru_rushad_calendar_left")), true);
  });

  it("jqRight() should return jQuery selector for right arrow element", function(){
    var cal1 = new Calendar();
    var cal2 = new Calendar();
    assert.equal(cal2.jqRight().is($("#" + cal2.id + " #ru_rushad_calendar_right")), true);
    assert.notEqual(cal1.jqRight().is($("#" + cal2.id + " #ru_rushad_calendar_right")), true);
  });

  it("jqTitle() should return jQuery selector for title element", function(){
    var cal1 = new Calendar();
    var cal2 = new Calendar();
    assert.equal(cal1.jqTitle().is($("#" + cal1.id + " #ru_rushad_calendar_title")), true);
    assert.notEqual(cal1.jqTitle().is($("#" + cal2.id + " #ru_rushad_calendar_title")), true);
  });

  it("should create frame in given coords", function(){
    var cal = new Calendar(123, 321);
    assert.equal(cal.jqCalendar().css("left"), cal.x + "px");
    assert.equal(cal.jqCalendar().css("top"), cal.y + "px");
  });

  it("should fill initial date in frame", function(){
    var date = new Date();
    var cal = new Calendar(0, 0, date);
    assert.equal(cal.jqInitialDate().text(), date.toDateString());
  });

  it("should be underlined when mouse is over initial date", function(){
    var cal = new Calendar();
    cal.jqInitialDate().mouseenter();
    assert.equal(cal.jqInitialDate().css("text-decoration"), "underline");
    cal.jqInitialDate().mouseleave();
    assert.equal(cal.jqInitialDate().css("text-decoration"), "none");
  });

  it("should be blue when mouse is over navigation elements", function(){
    var cal = new Calendar();

    cal.jqLeft().mouseenter();
    assert.equal(cal.jqLeft().css("color"), "blue");
    cal.jqLeft().mouseleave();
    assert.equal(cal.jqLeft().css("color"), "black");

    cal.jqRight().mouseenter();
    assert.equal(cal.jqRight().css("color"), "blue");
    cal.jqRight().mouseleave();
    assert.equal(cal.jqRight().css("color"), "black");

    cal.jqTitle().mouseenter();
    assert.equal(cal.jqTitle().css("color"), "blue");
    cal.jqTitle().mouseleave();
    assert.equal(cal.jqTitle().css("color"), "black");
  });

  it("should close when initial date element is clicked", function(){
    var cal1 = new Calendar();
    var cal2 = new Calendar();

    cal1.jqInitialDate().click();

    assert.equal(cal1.jqCalendar().length, 0);
    assert.notEqual(cal2.jqCalendar().length, 0);
  });

  it("should close when ESC clicked", function(){
    var cal1 = new Calendar();
    var cal2 = new Calendar();

    var event = $.Event("keydown");
    event.which = 27;
    cal1.jqCalendar().trigger(event);

    assert.equal(cal1.jqCalendar().length, 0);
    assert.notEqual(cal2.jqCalendar().length, 0);
  });

  it("shouldn't throw when completion handler is not set", function(){
    var cal = new Calendar();
    assert.doesNotThrow(function(){
      cal.jqInitialDate().click();
    });
  });

  it("should pass false and initial date to completion handler when initial date element is clicked", function(){
    var date = new Date();
    var res, resDate;
    var cal = new Calendar(0, 0, date, function(r, d){
      res = r;
      resDate = d;
    });

    cal.jqInitialDate().click();

    assert.equal(res, false);
    assert.equal(resDate, date);
  });

  it("should close when day is selected", function(){
    var date = new Date(1972, 4, 8);
    var cal1 = new Calendar(0, 0, new Date());
    var cal2 = new Calendar(0, 0, new Date());

    $("#" + cal1.id + " #td31").click();

    assert.equal(cal1.jqCalendar().length, 0);
    assert.notEqual(cal2.jqCalendar().length, 0);
  });

  it("shouldn't throw when completion handler is not set", function(){
    var cal = new Calendar();
    assert.doesNotThrow(function(){
      $("#" + cal.id + " #td31").click();
    });
  });

  it("should pass true and selected date to completion handler when day is selected", function()
  {
    var date = new Date(1972, 4, 1);
    var result, selectedDate;
    var cal = new Calendar(0, 0, date, function(ok, date){
      result = ok;
      selectedDate = date;
    });

    $("#" + cal.id + " #td31").click();

    assert.equal(result, true);
    assert.equal(selectedDate.getTime(), new Date(1972, 4, 8).getTime());
  });

});
