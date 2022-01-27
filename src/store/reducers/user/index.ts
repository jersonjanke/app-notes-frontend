// import { HYDRATE } from 'next-redux-wrapper'
import { USER_UPDATE, USER_RESET } from '../../actions'

const initialState = {
  name: '',
  email: '',
  token: '',
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_UPDATE: {
      return { ...state, ...action.payload }
    }
    case USER_RESET:
      return initialState
    default:
      return state
  }
}

export default reducer
