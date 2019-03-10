import userService from '../services/users'

const reducer = (state=[], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'GET_USER':
      return action.data
    default:
      return state
  }
}

export const initialiseUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export const getUserById = ({ id }) => {
  return async dispatch => {
    const user = await userService.getById(id)
    dispatch({
      type: 'GET_USER',
      data: user,
    })
  }
}

export default reducer