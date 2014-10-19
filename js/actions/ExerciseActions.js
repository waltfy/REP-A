var Dispatcher = require('../dispatcher/Dispatcher');
var ExerciseConstants = require('../constants/ExerciseConstants');

var ExerciseActions = {

  /**
   * @param  {string} text
   */
  create: function (exerciseId, weight, reps) {
    Dispatcher.handleViewAction({
      actionType: ExerciseConstants.CREATE,
      exerciseId: exerciseId,
      weight: weight,
      reps: reps
    });
  },

  /**
   * @param   {number} id
   */
  remove: function (id) {
    Dispatcher.handleViewAction({
      actionType: ExerciseConstants.REMOVE,
      id: id
    });
  }
};

module.exports = ExerciseActions;
