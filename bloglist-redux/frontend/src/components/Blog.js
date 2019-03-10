import React from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'


const NewComment = ({ addComment, id }) => {
  const commentBlog = async (blog) => {
    addComment(blog)
  }

  return (
    <div>
      <CommentForm addComment={commentBlog} id={id} />
    </div>
  )
}

const Blog = ({ blog, like, remove, creator, addComment, setNotification }) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = () => (
    <div className='details'>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {creator &&(<button onClick={() => remove(blog)}>remove </button>)}
      <h3>Comments</h3>
      <NewComment addComment={addComment} id={blog.id} />
      {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
    </div>
  )

  return (
    <div style={blogStyle}>
      {details()}
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  creator: PropTypes.bool.isRequired
}

export default connect(null, { addComment })(Blog)