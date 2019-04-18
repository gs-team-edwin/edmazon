//action type
const SET_POPUP = 'SET_POPUP'
const CLOSE_POPUP = 'CLOSE_POPUP'

//action creator
export const setPopup = popupName => ({type: SET_POPUP, popupName})
export const closePopup = () => ({type: CLOSE_POPUP})

//initial state
// it's allowed to be 'login', 'signup', 'review'
const DEFAULT_POPUP = false

export default function(state = DEFAULT_POPUP, action) {
  switch (action.type) {
    case SET_POPUP:
      return action.popupName
    case CLOSE_POPUP:
      return false
    default:
      return state
  }
}
