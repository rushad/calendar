var assert = require("assert");
var jsdom = require("jsdom");
var jquery = require("jQuery");

var Year = require("../year.js");

describe("Year: ", function(){
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
      new Year(null, new Date(), new Date());
    });
    assert.throws(function(){
      new Year(123, new Date(), new Date());
    });
    assert.throws(function(){
      new Year($("body"), new Date(), new Date());
    });
  });

  it("should throw if dates are wrong", function(){
    assert.throws(function(){
      new Year(container1, null, new Date());
    });
    assert.throws(function(){
      new Year(container1, "qwerty", new Date());
    });
    assert.throws(function(){
      new Year(container1, new Date());
    });
    assert.throws(function(){
      new Year(container1, new Date(), "qwerty");
    });
  });

  it("shouldn't throw if parameters are good", function(){
    assert.doesNotThrow(function(){
      new Year(container1, new Date(), new Date());
    });
  });

  it("should clone date and initialDate", function(){
    var date = new Date(1972, 4, 8);
    var year = new Year(container1, date, date);
    assert.notEqual(year.date, date);
    assert.notEqual(year.initialDate, date);
  });

  it("should create DOM element in container", function(){
    new Year(container1, new Date(), new Date());
    assert.notEqual($("#id1 .ru_rushad_calendar_year").length, 0);
    assert.equal($("#id2 .ru_rushad_calendar_year").length, 0);
  });

  it("jqYear() should return jQuery selector for year frame element", function(){
    var year = new Year(container1, new Date(), new Date());
    assert.equal(year.jqYear().is($("#" + year.id)), true);
  });

  it("should throw if year element already exists in calendar element", function(){
    new Year(container1, new Date(), new Date());
    assert.throws(function(){
      new Year(container1, new Date(), new Date());
    });
    assert.doesNotThrow(function(){
      new Year(container2, new Date(), new Date());
    });
  });

  it("title() should return year string", function(){
    var date = new Date(1972, 4, 8);
    var year = new Year(container1, date, date);
    assert.equal(year.title(), "1972");
  });

  it("month should be shadowed when mouse is over", function(){
    var date = new Date();
    var year = new Year(container1, date, date);
    $("#id1 #jan").mouseenter();
    assert.equal($("#id1 #jan").css("box-shadow"), Util.Style.BoxShadow.Hover);
    $("#id1 #jan").mouseleave();
    assert.equal($("#id1 #jan").css("box-shadow"), Util.Style.BoxShadow.Normal);
  });

  it("prev should return the date in previous year", function(){
    var date = new Date(2014, 0, 1);
    var year = new Year(container1, date, date);
    var prevDate = year.prev(date);
    assert.equal(prevDate.getFullYear(), 2013);
  });

  it("next should return the date in next year", function(){
    var date = new Date(2013, 11, 31);
    var year = new Year(container1, date, date);
    var nextDate = year.next(date);
    assert.equal(nextDate.getFullYear(), 2014);
  });
});
