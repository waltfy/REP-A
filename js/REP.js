/** @jsx React.DOM */
var React = require('react');
window.React = React;

var REP = require('./components/REP.react');

React.renderComponent(
  <REP />,
  document.getElementById('rep')
);
