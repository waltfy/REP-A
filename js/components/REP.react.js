/** @jsx React.DOM */
/* jslint node: true */

var ExerciseActions = require('../actions/ExerciseActions');
var ExerciseStore = require('../stores/ExerciseStore');
var React = require('react');
// var Persistence = require('store');

Object.values = function (o) {
  return Object.keys(o).map(function (key) { return o[key]; });
};

/**
 * Retrieves the current exercise data from the ExerciseStore
 */
function getExerciseState() {
  return ExerciseStore.getAll();
}

var REP = React.createClass({

  getInitialState: function () {
    return {
      active: null,
      weight: null,
      reps: null,
      exercises: getExerciseState()
    };
  },

  componentDidMount: function () {
    ExerciseStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ExerciseStore.removeChangeListener(this._onChange);
  },

  render: function () {

    var state = this.state;

    // var data = Object.values(workouts
    //   .reduce(group, {})
    // );

    var createOptions = function (id) {
      return <option key={ id } value={ id }>{ state.exercises.list[id].name }</option>;
    };

    var createRows = function (set) {
      return (
        <tr key={ set.id } >
          <td className='u-text-align-left'>{ state.exercises.list[set.exerciseId].name }</td>
          <td className='u-text-align-right'>{ set.weight }</td>
          <td className='u-text-align-right'>{ set.reps }</td>
          <td className='u-text-align-right'>{ new Date(set.completed).toLocaleDateString("en-GB") }</td>
        </tr>
      );
    };

    var group = function (fold, set) {
      fold.push(set);
      return fold;
    };

    var sortRows = function (a, b) {
      if (a.completed < b.completed) return 1;
      else return -1;
      return 0;
    };

    return (
      <div>
        <h1>REP <a href={ 'mailto:waltervascarvalho@gmail.com?subject=REP:BACKUP&body=' + JSON.stringify(state.exercises.workouts) }>Backup</a></h1>
        <div className='workout'>
          <h2>Workouts</h2>
          <p><select onChange={ this._updateExercise } value={ state.active ? state.active : 0 }>
            <option value='0' disabled>Select exercise...</option>
            { Object.keys(state.exercises.list).map(createOptions) }
          </select></p>
          <p><input type='number' min='0' pattern='\d*' onChange={ this._updateWeight } value={ state.weight } placeholder='Weight (kg)' /></p>
          <p><input type='number' min='0' pattern='\d*' onChange={ this._updateReps } value={ state.reps } placeholder='Reps' /></p>
          <p><button onClick={ this._handleAdd }>+ Add</button> <button onClick={ this._clear }>Clear</button></p>
        </div>
        <div className='progress'>
          <h2>Progress</h2>
          <table className='progress-table'>
            <thead>
              <tr>
                <th className='u-text-align-left'>Exercise</th>
                <th className='u-text-align-right'>Weight</th>
                <th className='u-text-align-right'>Reps</th>
                <th className='u-text-align-right'>Date</th>
                </tr>
            </thead>
            <tbody>
              { state.exercises.workouts
                  // .reduce(group, {})
                  .sort(sortRows)
                  .map(createRows)
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  },

  _clear: function () {
    this.setState({
      active: null,
      weight: 0,
      reps: 0
    });
  },

  _updateExercise: function (e) {
    e.preventDefault();
    this.setState({ active: e.target.value });
  },

  _updateWeight: function (e) {
    console.debug('_updateWeight() ====================');
    e.preventDefault();
    this.setState({ weight: e.target.value });
  },

  _updateReps: function (e) {
    console.debug('_updateReps() ====================');
    e.preventDefault();
    this.setState({ reps: e.target.value });
  },

  _handleAdd: function () {
    var state = this.state;
    ExerciseActions.create(state.active, state.weight, state.reps);
  },

  _handleChange: function (e) {
    console.debug('_handleChange() ====================');
    console.debug('e.target.value:', e.target.value);
  },

  _onChange: function () {
    this.setState({ exercises: getExerciseState() });
  }
});

module.exports = REP;
