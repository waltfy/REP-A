var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var ExerciseConstants = require('../constants/ExerciseConstants');
var merge = require('react/lib/merge');

var Store = require('store');

var CHANGE_EVENT = 'change';

var _exercises = {
  list: {
    1: { id: 1, name: 'Bench Press', area: 'Chest' },
    2: { id: 2, name: 'Squats', area: 'Quads' },
    3: { id: 3, name: 'Deadlifts', area: 'Quads' },
    5: { id: 5, name: 'Leg Press', area: 'Quads' },
    6: { id: 6, name: 'Leg Curl', area: 'Quads' },
    7: { id: 7, name: 'Leg Extension', area: 'Quads' },
    8: { id: 8, name: 'Calves', area: 'Calves' },
    9: { id: 9, name: 'Flat Dumbbell Press', area: 'Chest' },
    10: { id: 10, name: 'Flat Bench Flyes', area: 'Chest' },
    11: { id: 11, name: 'Incline Cable Flyes', area: 'Chest' },
    12: { id: 12, name: 'Cable Crossover', area: 'Chest' },
    13: { id: 13, name: 'Tricep Cable Pushdowns', area: 'Triceps' },
    14: { id: 14, name: 'Reverse Cable Pushdowns', area: 'Triceps' },
    15: { id: 15, name: 'Head Smackers', area: 'Triceps' },
    16: { id: 16, name: 'Skull Crushers', area: 'Triceps' }
  },
  workouts: Store.get('workouts') || [] // Array
};

/**
 * Creates an exercise
 * @param  {obj} the exercise to be created
 */
function create(exerciseId, weight, reps) {
  var date = +new Date();
  var id = (date + Math.floor(Math.random() * 999999)).toString(36);

  _exercises.workouts.push({
    id: id,
    exerciseId: exerciseId,
    weight: weight,
    reps: reps,
    completed: date
  });

  try {
    Store.set('workouts', _exercises.workouts);
  } catch (err) {
    if (err.code === 22) { alert('Switch to non-private browsing.'); }
    throw err;
  }
}

var ExerciseStore = merge(EventEmitter.prototype, {

  /**
   * Get the entire collection of Exercises.
   * @return {object}
   */
  getAll: function () {
    return _exercises;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register to handle all updates
Dispatcher.register(function (payload) {
  var action = payload.action;
  var exerciseId;

  switch (action.actionType) {
    case ExerciseConstants.CREATE:
      exerciseId = action.exerciseId;
      if (exerciseId) {
        create(exerciseId, action.weight, action.reps);
      } else {
        console.error('Exercise must be selected.');
      }
      break;
    default:
      return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.
  ExerciseStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = ExerciseStore;
