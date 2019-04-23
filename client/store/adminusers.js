import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_ADMIN_USERS = 'SET_ADMIN_USERS'
const DELETE_USER = 'DELETE_USER'
const ADD_ADMIN = 'ADD_ADMIN'
const REMOVE_ADMIN = 'REMOVE_ADMIN'
const FLAG_RESET = 'FLAG_RESET'

//ACTION CREATORS
const setAdminUsers = (users, count) => ({
  type: SET_ADMIN_USERS,
  users,
  count
})
const eraseUser = userId => ({
  type: DELETE_USER,
  userId
})
const giveAdmin = userId => ({
  type: ADD_ADMIN,
  userId
})
const takeAdmin = userId => ({
  type: REMOVE_ADMIN,
  userId
})
const flagReset = userId => ({
  type: FLAG_RESET,
  userId
})

//THUNK CREATORS
export const getAdminUsers = offset => async dispatch => {
  try {
    const url = `/api/admin/users/offset/${offset}`
    const res = await axios.get(url)
    dispatch(setAdminUsers(res.data.users, res.data.count))
  } catch (err) {
    console.error(err)
  }
}
export const deleteUser = userId => async dispatch => {
  try {
    const url = `/api/admin/users/${userId}/delete/`
    await axios.delete(url)
    dispatch(eraseUser(userId))
  } catch (err) {
    console.error(err)
  }
}
export const addAdmin = userId => async dispatch => {
  try {
    console.log('removing admin thunk')

    const url = `/api/admin/users/${userId}/`
    await axios.put(url, {userType: 'admin'})
    dispatch(giveAdmin(userId))
  } catch (err) {
    console.error(err)
  }
}
export const removeAdmin = userId => async dispatch => {
  try {
    const url = `/api/admin/users/${userId}/`
    await axios.put(url, {userType: 'user'})
    dispatch(takeAdmin(userId))
  } catch (err) {
    console.error(err)
  }
}

export const flagResetThunk = userId => async dispatch => {
  try {
    await axios.put(`/auth/flag`, {userId})
    dispatch(flagReset(userId))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = {count: 0, users: []}, action) {
  switch (action.type) {
    case SET_ADMIN_USERS:
      return {count: action.count, users: action.users}
    case ADD_ADMIN:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {
              ...user,
              userType: 'admin'
            }
          } else return user
        })
      }
    case REMOVE_ADMIN:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {
              ...user,
              userType: 'user'
            }
          } else return user
        })
      }
    case FLAG_RESET:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {
              ...user,
              resetPassword: true
            }
          } else return user
        })
      }
    default:
      return state
  }
}
