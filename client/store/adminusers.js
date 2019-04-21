import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_ADMIN_USERS = 'SET_ADMIN_USERS'
const DELETE_USER = 'DELETE_USER'

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
//reducer
export default function(state = {count: 0, users: []}, action) {
  switch (action.type) {
    case SET_ADMIN_USERS:
      return {count: action.count, users: action.users}
    default:
      return state
  }
}
