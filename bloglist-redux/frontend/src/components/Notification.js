import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  const style = {
    color: props.notification.messageType === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {props.notification.content}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(
  mapStateToProps
)(Notification)