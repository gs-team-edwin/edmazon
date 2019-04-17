//action type
const SET_POPUP = 'SET_POPUP'
const REMOVE_POPUP = 'REMOVE_POPUP'

//action creator
export const setPopup = popupName => ({type: SET_POPUP, popupName})
export const removePopup = () => ({type: REMOVE_POPUP})

//initial state
const DEFAULT_POPUP = false
// it's allowed to be 'login', 'signup', 'review'

export default function(state = DEFAULT_POPUP, action) {
  switch (action.type) {
    case SET_POPUP:
      return action.popupName
    case REMOVE_POPUP:
      return false
    default:
      return state
  }
}
