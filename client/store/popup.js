import axios from 'axios'


//action type
const SET_POPUP = 'SET_POPUP'
const REMOVE_POPUP = 'REMOVE_POPUP'

//action creator

export const setPopup = popup => ({type: SET_POPUP, popup})
export const removePopup = popup => ({type: REMOVE_POPUP, popup})

//initial state
const DEFAULT_POPUP = false


export default function(state = DEFAULT_POPUP, action) {
    switch (action.type) {
        case SET_POPUP:
            return action.popup
        case REMOVE_POPUP:
            return false
    default:
        return state
    }
  }