var Month;
if (typeof module !== "undefined")
{
  Month = require("./month.js");
}

function View(type, container, title, date, initialDate, completionHandler)
{
  var view = {
    type: type,
    container: container,
    title: title,
    date: date,
    initialDate: initialDate,
    completionHandler: completionHandler,
    view: null,

    init: function(){
      switch(this.type)
      {
        case 1:
          this.view = new Month(this.container, this.date, this.initialDate, this.completionHandler);
          break;
      }
      this.title.text(this.view.title());
    },

    goPrev: function()
    {
      this.date = this.view.prev(this.date);
      this.view.close();
      this.init(this.type);
      return this.date;
    }
  };

  view.init();

  return view;
}

if (typeof module !== "undefined")
  module.exports = View;
