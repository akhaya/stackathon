//CONSTANTS
const ADD_MOVE = 'ADD_MOVE'
const UPDATE_NAME = 'UPDATE_NAME'
const REMOVE_MOVE = 'REMOVE_MOVE'
//ACTION CREATORS

export const addMove = (move) => {
  return {
    type: ADD_MOVE,
    move
  }
}

export const updateName = (name) => {
  return {
    type: UPDATE_NAME,
    name
  }
}

export const removeMove = (moveId) => {
  return {
    type: REMOVE_MOVE,
    moveId
  }
}

//REDUCER
const counter = 2
const initialState = {
  name: 'Sample Workout',
  workout: [{
    id: 1,
    move: 'Burpees',
    mode: 'Reps',
    duration: 10
  }]
}

const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)

  switch(action.type){

    case ADD_MOVE:
      newState.workout.push({
        id: counter,
        move: action.move,
        mode: 'Reps',
        duration: 10
      })
      counter ++
      break;

    case REMOVE_MOVE: {
      newState.workout = newState.workout.filter(m => m.id !== action.moveId)
      break;
    }

    case UPDATE_NAME:
      newState.name = action.name
      break;

    default:
      return state;
  }

  return newState
}

export default reducer
