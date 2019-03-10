import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const logout = () => {
  return async dispatch => {
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const initialiseUser = () => {
  return async dispatch => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user,
      })
    } else {
      const user = null
      dispatch({
        type: 'INIT_USER',
        data: user,
      })
    }
  }
}

export default reducer