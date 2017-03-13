// CONSTANTS
const ADD_MOVE = 'ADD_MOVE'
const UPDATE_NAME = 'UPDATE_NAME'
const REMOVE_MOVE = 'REMOVE_MOVE'
const UPDATE_DURATION = 'UPDATE_DURATION'
const UPDATE_MODE = 'UPDATE_MODE'

// ACTION CREATORS

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

export const updateDuration = (moveId, duration) => {
  return {
    type: UPDATE_DURATION, duration, moveId
  }
}

export const updateMode = (moveId, mode) => {
  return {
    type: UPDATE_MODE,
    moveId,
    mode
  }
}

// REDUCER
const counter = 1
const initialState = {
  name: 'My New Workout',
  workout: []
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case ADD_MOVE:
      newState.workout.push({
        id: counter,
        move: action.move,
        mode: 'Reps',
        duration: 10
      })
      counter++
      break

    case REMOVE_MOVE: {
      newState.workout = newState.workout.filter(m => m.id !== action.moveId)
      break
    }

    case UPDATE_NAME:
      newState.name = action.name
      break

    case UPDATE_DURATION:
      newState.workout = newState.workout.map(move => {
        if (move.id === action.moveId) {
          move.duration = action.duration
          return move
        } else {
          return move
        }
      })
      break

    case UPDATE_MODE:
      newState.workout = newState.workout.map(move => {
        if (move.id === action.moveId) {
          move.mode = action.mode
          return move
        } else {
          return move
        }
      })
      break

    default:
      return state
  }
  return newState
}

export default reducer
