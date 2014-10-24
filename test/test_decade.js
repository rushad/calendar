var assert = require("assert");
var jsdom = require("jsdom");
var jquery = require("jQuery");

var Decade = require("../decade.js");

describe("Decade: ", function(){
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
      new Decade(null, new Date(), new Date());
    });
    assert.throws(function(){
      new Decade(123, new Date(), new Date());
    });
    assert.throws(function(){
      new Decade($("body"), new Date(), new Date());
    });
  });

  it("should throw if dates are wrong", function(){
    assert.throws(function(){
      new Decade(container1, null, new Date());
    });
    assert.throws(function(){
      new Decade(container1, "qwerty", new Date());
    });
    assert.throws(function(){
      new Decade(container1, new Date());
    });
    assert.throws(function(){
      new Decade(container1, new Date(), "qwerty");
    });
  });

  it("shouldn't throw if parameters are good", function(){
    assert.doesNotThrow(function(){
      new Decade(container1, new Date(), new Date());
    });
  });

  it("should clone date and initialDate", function(){
    var date = new Date(1972, 4, 8);
    var decade = new Decade(container1, date, date);
    assert.notEqual(decade.date, date);
    assert.notEqual(decade.initialDate, date);
  });

  it("should create DOM element in container", function(){
    new Decade(container1, new Date(), new Date());
    assert.notEqual($("#id1 .ru_rushad_calendar_decade").length, 0);
    assert.equal($("#id2 .ru_rushad_calendar_decade").length, 0);
  });

  it("jqDecade() should return jQuery selector for decade frame element", function(){
    var decade = new Decade(container1, new Date(), new Date());
    assert.equal(decade.jqDecade().is($("#" + decade.id)), true);
  });

  it("should throw if decade element already exists in calendar element", function(){
    new Decade(container1, new Date(), new Date());
    assert.throws(function(){
      new Decade(container1, new Date(), new Date());
    });
    assert.doesNotThrow(function(){
      new Decade(container2, new Date(), new Date());
    });
  });

  it("title() should return decade string", function(){
    var date = new Date(1972, 4, 8);
    var decade = new Decade(container1, date, date);
    assert.equal(decade.title(), "1970-1979");
  });

  it("should fill years", function(){
    var date = new Date(1972, 4, 8);
    var decade = new Decade(container1, date, date);
    assert.equal($("#" + decade.id + " #td2").text(), "1970");
    assert.equal($("#" + decade.id + " #td11").text(), "1979");
  });

  it("should set color of years out of decade to silver", function(){
    var date = new Date();
    var decade = new Decade(container1, date, date);
    assert.equal($("#" + decade.id + " #td1").css("color"), Util.Style.Color.DateOutOfPeriod);
    assert.equal($("#" + decade.id + " #td12").css("color"), Util.Style.Color.DateOutOfPeriod);
  });

  it("year should be shadowed when mouse is over", function(){
    var date = new Date();
    var decade = new Decade(container1, date, date);
    $("#id1 #td1").mouseenter();
    assert.equal($("#id1 #td1").css("box-shadow"), Util.Style.BoxShadow.Hover);
    $("#id1 #td1").mouseleave();
    assert.equal($("#id1 #td1").css("box-shadow"), Util.Style.BoxShadow.Normal);
  });

  it("prev should return the date in previous decade", function(){
    var date = new Date(2014, 0, 1);
    var decade = new Decade(container1, date, date);
    var prevDate = decade.prev(date);
    assert.equal(Math.floor(prevDate.getFullYear()/10)*10, 2000);
  });

  it("next should return the date in next decade", function(){
    var date = new Date(2013, 11, 31);
    var decade = new Decade(container1, date, date);
    var nextDate = decade.next(date);
    assert.equal(Math.floor(nextDate.getFullYear()/10)*10, 2020);
  });
});
