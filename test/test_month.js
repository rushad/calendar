var assert = require("assert");
var jsdom = require("jsdom");
var jquery = require("jQuery");

var Month = require("../month.js");

describe("Month: ", function(){
  var container1, container2;

  beforeEach(function(done){
    document = jsdom.jsdom("");
    window = document.parentWindow;
    $ = jquery(window);
    container1 = $("<div id='id1' class='ru_rushad_calendar_view'></div>");
    container2 = $("<div id='id2' class='ru_rushad_calendar_view'></div>");
    $("body").append(container1);
    $("body").append(container2);
    done();
  });

  it("should throw if parent calendar element is wrong", function(){
    assert.throws(function(){
      new Month(null, new Date(), new Date());
    });
    assert.throws(function(){
      new Month(123, new Date(), new Date());
    });
    assert.throws(function(){
      new Month($("body"), new Date(), new Date());
    });
  });

  it("should throw if dates are wrong", function(){
    assert.throws(function(){
      new Month(container1, null, new Date());
    });
    assert.throws(function(){
      new Month(container1, "qwerty", new Date());
    });
    assert.throws(function(){
      new Month(container1, new Date());
    });
    assert.throws(function(){
      new Month(container1, new Date(), "qwerty");
    });
  });

  it("shouldn't throw if parameters are good", function(){
    assert.doesNotThrow(function(){
      new Month(container1, new Date(), new Date());
    });
  });

  it("should clone date and initialDate", function(){
    var date = new Date(1972, 4, 8);
    var mon = new Month(container1, date, date);
    assert.notEqual(mon.date, date);
    assert.notEqual(mon.initialDate, date);
  });

  it("should create DOM element in container", function(){
    new Month(container1, new Date(), new Date());
    assert.notEqual($("#id1 .ru_rushad_calendar_month").length, 0);
    assert.equal($("#id2 .ru_rushad_calendar_month").length, 0);
  });

  it("jqMonth() should return jQuery selector for month frame element", function(){
    var mon = new Month(container1, new Date(), new Date());
    assert.equal(mon.jqMonth().is($("#" + mon.id)), true);
  });

  it("should throw if month element already exists in calendar element", function(){
    new Month(container1, new Date(), new Date());
    assert.throws(function(){
      new Month(container1, new Date(), new Date());
    });
    assert.doesNotThrow(function(){
      new Month(container2, new Date(), new Date());
    });
  });

  it("title() should return title of month", function(){
    var date = new Date(1972, 4, 8);
    var mon = new Month(container1, date, date);
    assert.equal(mon.title(), "May, 1972");
  });

  it("should fill dates", function(){
    var date = new Date(1972, 4, 8);
    var mon = new Month(container1, date, date);
    assert.equal($("#id1 #td11").text(), "24");
    assert.equal($("#id1 #td67").text(), "4");
  });

  it("should set color of days out of current month to silver", function(){
    var date = new Date(1972, 4, 8);
    var mon = new Month(container1, date, date);
    assert.equal($("#id1 #td17").css("color"), Util.Style.Color.DayOutOfMonth);
  });

  it("should set color of initial date to blue", function(){
    var date = new Date(1972, 4, 8);
    var mon = new Month(container1, date, date);
    assert.equal($("#id1 #td31").css("color"), Util.Style.Color.InitialDay);
  });

  it("day should be shadowed when mouse is over", function(){
    var date = new Date();
    var mon = new Month(container1, date, date);
    $("#id1 #td11").mouseenter();
    assert.equal($("#id1 #td11").css("box-shadow"), Util.Style.BoxShadow.Hover);
    $("#id1 #td11").mouseleave();
    assert.equal($("#id1 #td11").css("box-shadow"), Util.Style.BoxShadow.Normal);
  });

  it("prev should return the date in previous month", function(){
    var date = new Date(2014, 0, 31);
    var mon = new Month(container1, date, date);
    var prevDate = mon.prev(date);
    assert.equal(prevDate.getMonth(), 11);
  });

  it("next should return the date in next month", function(){
    var date = new Date(2013, 11, 1);
    var mon = new Month(container1, date, date);
    var nextDate = mon.next(date);
    assert.equal(nextDate.getMonth(), 0);
  });
});
