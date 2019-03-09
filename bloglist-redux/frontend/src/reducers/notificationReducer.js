const reducer = (state = null, action) => {
  if (action.type==='SET_NOTIFICATION') {
    return (action.data)
  } else if (action.type === 'CLEAR_NOTIFICATION') {
    return null
  }
  return state
}

export const setNotification = (content, messageType, seconds) => {
  console.log(content)
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content,
        messageType
      },
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, seconds*1000)
  }
}

export const clearNotification = () => (
  {
    type: 'CLEAR_NOTIFICATION'
  }
)

export default reducer