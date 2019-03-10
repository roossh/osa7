import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initialiseBlogs, addBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { login, logout, initialiseUser } from './reducers/loginReducer'

const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  useEffect(() => {
    props.initialiseBlogs()
  }, [])

  useEffect(() => {
    console.log('hello')
    console.log(props)
    props.initialiseUser()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.login({ username: username.value, password: password.value })
    } catch (exception) {
      props.setNotification('wrong username or password', 'error', 5)
    }
  }

  const handleLogout = () => {
    props.logout()
  }

  const createBlog = async (blog) => {
    newBlogRef.current.toggleVisibility()
    props.addBlog(blog)
    props.setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'normal', 5)
  }

  const likeBlog = async (blog) => {
    props.likeBlog(blog)
    props.setNotification(`blog ${blog.title} by ${blog.author} liked!`, 'normal', 5)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.deleteBlog(blog)
      props.setNotification(`blog ${blog.title} by ${blog.author} removed!`,'normal', 5)
    }
  }
  console.log(props)
  if (props.user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username}/>
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes
  console.log(props)
  return (

    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{props.user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={likeBlog}
          remove={removeBlog}
          user={props.user}
          creator={blog.user.username === props.user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user,
})

export default connect(mapStateToProps, { setNotification, initialiseBlogs, likeBlog, addBlog, deleteBlog, login, logout, initialiseUser })(App)