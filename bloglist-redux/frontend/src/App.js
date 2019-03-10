import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initialiseBlogs, addBlog, likeBlog, deleteBlog, getBlogById } from './reducers/blogReducer'
import { login, logout, initialiseUser } from './reducers/loginReducer'
import { initialiseUsers, getUserById } from './reducers/userReducer'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>Blogs</Link>
      <Link style={padding} to='/create'>Create new</Link>
      <Link style={padding} to='/users'>Users</Link>
    </div>
  )
}

const User = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <b>added blogs</b><br/>
    {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
  </div>
)

const Users = ({ users }) => (
  <div>
    <h2>Users</h2>
    {users.map(user => <li key={user.id}>
      <Link to={`users/${user.id}`}>{user.name} {user.blogs.length}</Link>
    </li>)}
  </div>
)

const Blogs = ({ removeBlog, blogs, user, byLikes, likeBlog }) => (
  <div>
    {blogs.sort(byLikes).map(blog => <li key={blog.id}>
      <Link to={`blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
    </li>)}
  </div>
)

let NewBlog = (props) => {
  const createBlog = async (blog) => {
    props.addBlog(blog)
    props.history.push('/')
    props.setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'normal', 5)
  }

  return (
    <div>
      <BlogForm createBlog={createBlog} />
    </div>
  )
}


NewBlog = withRouter(NewBlog)

const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  useEffect(() => {
    props.initialiseBlogs()
  }, [])

  useEffect(() => {
    props.initialiseUser()
  }, [])

  useEffect(() => {
    props.initialiseUsers()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.login({ username: username.value, password: password.value })
    } catch (exception) {
      props.setNotification('wrong username or password', 'error', 5)
    }
  }

  const userById = (id) =>
    props.users.find(u => u.id === id)


  const blogById = (id) =>
    props.blogs.find(b => b.id === id)

  const handleLogout = () => {
    props.logout()
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

  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (

    <div>
      <Router>
        <div>
          <Notification />
          <h2>Bloglist</h2>
          <p>{props.user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Menu />
          <Route exact path='/users' render={() => <Users users={props.users}/>}/>
          <Route exact path='/users/:id' render={({ match }) => <User user={userById(match.params.id)}/>}/>
          <Route exact path='/' render={() => <Blogs blogs={props.blogs} user={props.user} removeBlog={removeBlog} byLikes={byLikes} likeBlog={likeBlog}/>}/>
          <Route exact path='/blogs' render={() => <Blogs blogs={props.blogs} user={props.user} removeBlog={removeBlog} byLikes={byLikes} likeBlog={likeBlog}/>}/>
          <Route exact path='/blogs/:id' render={({ match }) => <Blog blog={blogById(match.params.id)} like={likeBlog} remove={removeBlog} user={props.user} creator={blogById(match.params.id).user.username===props.user.username}/>}/>
          <Route exact path='/create' render={() => <NewBlog addBlog={props.addBlog} setNotification={props.setNotification} />} />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user,
  users: state.users,
})

export default connect(mapStateToProps, { setNotification, initialiseBlogs, likeBlog, addBlog, deleteBlog, login, logout, initialiseUser, initialiseUsers, getUserById, getBlogById })(App)