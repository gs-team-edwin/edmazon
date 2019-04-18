import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

//ACTION CREATORS
const getCategories = categories => ({type: GET_ALL_CATEGORIES, categories})

//THUNK CREATORS
export const getAllCategories = () => async dispatch => {
  try {
    const res = await axios.get(`/api/categories`)
    dispatch(getCategories(res.data))
  } catch (err) {
    console.error(err)
  }
}


//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
