/** @jsx React.DOM */
var React = require('react');

// add React to the global scope to enable dev tools
window.React = React;

var REP = require('./components/REP.react');

React.renderComponent(
  <REP />,
  document.getElementById('rep')
);
