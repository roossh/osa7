import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initialiseBlogs, addBlog, likeBlog, deleteBlog } from './reducers/blogReducer'

const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    props.initialiseBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      props.setNotification('wrong username or password', 'error', 5)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (blog) => {
    newBlogRef.current.toggleVisibility()
    props.addBlog(blog)
    props.setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'normal', 5)
  }

  const likeBlog = async (blog) => {
    //const likedBlog = { ...blog, likes: blog.likes + 1 }
    //const updatedBlog = await blogService.update(blog)
    //setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    console.log(blog)
    props.likeBlog(blog)
    props.setNotification(`blog ${blog.title} by ${blog.author} liked!`, 'normal', 5)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      //const updatedBlog = await blogService.remove(blog)
      //setBlogs(blogs.filter(b => b.id !== blog.id))
      props.deleteBlog(blog)
      props.setNotification(`blog ${blog.title} by ${blog.author} removed!`,'normal', 5)
    }
  }

  if (user === null) {
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

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{user.name} logged in</p>
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
          user={user}
          creator={blog.user.username === user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs
})

export default connect(mapStateToProps, { setNotification, initialiseBlogs, likeBlog, addBlog, deleteBlog })(App)