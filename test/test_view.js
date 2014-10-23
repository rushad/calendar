var assert = require("assert");
var jsdom = require("jsdom");
var jquery = require("jQuery");

var View = require("../view.js");

describe("View: ", function(){
  var container;

  beforeEach(function(done){
    document = jsdom.jsdom("");
    window = document.parentWindow;
    $ = jquery(window);
    container = $("<div id='title'></div><div id='container' class='ru_rushad_calendar_view'></div>");
    $("body").append(container);
    done();
  });

  it("should store params in object", function(){
    var date = new Date(1972, 4, 8);
    var completionHandlerCalled = false;
    var view = new View(Util.ViewType.MONTH, container, $("#title"), date, date, function(){
      completionHandlerCalled = true;
    });

    assert.equal(view.type, Util.ViewType.MONTH);
    assert.equal(view.container, container);
    assert.equal(view.title.is($("#title")), true);
    assert.equal(view.date.getFullYear(), date.getFullYear());
    assert.equal(view.initialDate.getFullYear(), date.getFullYear());

    view.completionHandler();

    assert.equal(completionHandlerCalled, true);
  });

  it("should clone date and initialDate", function(){
    var date = new Date(1972, 4, 8);
    var view = new View(Util.ViewType.YEAR, container, $("#title"), date, date);
    assert.notEqual(view.date, date);
    assert.notEqual(view.initialDate, date);
  });

  it("should create Month view", function(){
    var date = new Date();
    var view = new View(Util.ViewType.MONTH, container, $("#title"), date, date);

    assert.equal(typeof view.view, "object");
    assert.equal(typeof view.view.jqMonth, "function");
  });

  it("should switch to year from month on goUp() call", function(){
    var date = new Date(1972, 4, 8);
    var view = new View(Util.ViewType.MONTH, container, $("#title"), date, date);

    view.goUp();

    assert.equal(view.type, Util.ViewType.YEAR);
    assert.equal(typeof view.view.jqYear, "function");
  });

  it("should switch to decade from year on goUp() call", function(){
    var date = new Date(1972, 4, 8);
    var view = new View(Util.ViewType.YEAR, container, $("#title"), date, date);

    view.goUp();

    assert.equal(view.type, Util.ViewType.DECADE);
    assert.equal(typeof view.view.jqDecade, "function");
  });

  it("should switch to month from year on goDown() call", function(){
    var date = new Date(1972, 4, 8);
    var view = new View(Util.ViewType.YEAR, container, $("#title"), date, date);

    view.goDown();

    assert.equal(view.type, Util.ViewType.MONTH);
    assert.equal(typeof view.view.jqMonth, "function");
  });
});

