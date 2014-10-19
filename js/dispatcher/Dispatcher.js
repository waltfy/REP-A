var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');

var RepDispatcher = copyProperties(new Dispatcher(), {

  handleViewAction: function (action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };

    this.dispatch(payload);
  }
});

module.exports = RepDispatcher;
