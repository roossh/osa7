import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password }) => {
  const inputUsername = { value: username.value, type: username.type, onChange: username.onChange }
  const inputPassword = { value: password.value, type: password.type, onChange: password.onChange }
  return (
    <div>
      <h2>Kirjaudu</h2>
      <form onSubmit={handleLogin} className='login'>
        <div>
          Käyttäjätunnus:
          <input {...inputUsername} />
        </div>
        <div>
          Salasana:
          <input {...inputPassword} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm