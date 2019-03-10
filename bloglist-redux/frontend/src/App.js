import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initialiseBlogs, addBlog, likeBlog, deleteBlog, getBlogById, addComment } from './reducers/blogReducer'
import { login, logout, initialiseUser } from './reducers/loginReducer'
import { initialiseUsers, getUserById } from './reducers/userReducer'
import { Container, Table } from 'semantic-ui-react'
import styled from 'styled-components'

const Button = styled.button`
  background: #4CAF50;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: none;
  :hover {
    background: white;
    color: #4CAF50;
  }
`
const H2 = styled.h2`
  font-size: 5em;
  color: #634f80;
  font-family: "Verdana", Sans-serif;
`

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
    <H2>{user.name}</H2>
    <b>added blogs</b><br/>
    {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
  </div>
)

const Users = ({ users }) => (
  <div>
    <h2>Users</h2>
    <Table striped celled>
      <Table.Body>
        {users.map(user => <Table.Row key={user.id}>
          <Table.Cell><Link to={`users/${user.id}`}>{user.name}</Link></Table.Cell><Table.Cell>{user.blogs.length}</Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)


const Blogs = ({ blogs, byLikes, likeBlog }) => (
  <div>
    <Table striped celled>
      <Table.Body>
        {blogs.sort(byLikes).map(blog => <Table.Row key={blog.id}>
          <Table.Cell><Link to={`blogs/${blog.id}`}>{blog.title}</Link></Table.Cell><Table.Cell>{blog.author}</Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>
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
          <Button type="submit">kirjaudu</Button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (

    <Container>
      <Router>
        <div>
          <Notification />
          <H2>Bloglist</H2>
          <p>{props.user.name} logged in</p>
          <Button onClick={handleLogout}>logout</Button>
          <Menu />
          <Route exact path='/users' render={() => <Users users={props.users}/>}/>
          <Route exact path='/users/:id' render={({ match }) => <User user={userById(match.params.id)}/>}/>
          <Route exact path='/' render={() => <Blogs blogs={props.blogs} user={props.user} removeBlog={removeBlog} byLikes={byLikes} likeBlog={likeBlog}/>}/>
          <Route exact path='/blogs' render={() => <Blogs blogs={props.blogs} user={props.user} removeBlog={removeBlog} byLikes={byLikes} likeBlog={likeBlog} addComment={props.addComment} setNotification={props.setNotification}/>}/>
          <Route exact path='/blogs/:id' render={({ match }) => <Blog blog={blogById(match.params.id)} like={likeBlog} remove={removeBlog} user={props.user} creator={blogById(match.params.id).user.username===props.user.username}/>}/>
          <Route exact path='/create' render={() => <NewBlog addBlog={props.addBlog} setNotification={props.setNotification} />} />
        </div>
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user,
  users: state.users,
})

export default connect(mapStateToProps, { setNotification, initialiseBlogs, likeBlog, addBlog, deleteBlog, login, logout, initialiseUser, initialiseUsers, getUserById, getBlogById, addComment })(App)