import React from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import styled from 'styled-components'
import { Table } from 'semantic-ui-react'

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

const Blog = ({ blog, like, remove, creator, addComment }) => {

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
        <Button onClick={() => like(blog)}>like</Button>
      </div>
      <div>added by {blog.user.name} {creator &&(<Button onClick={() => remove(blog)}>remove </Button>)}</div>
      <h3>Comments</h3>
      <NewComment addComment={addComment} id={blog.id} />
      <Table striped celled>
        <Table.Body>
          {blog.comments.map(comment => <Table.Row key={comment}><Table.Cell>{comment}</Table.Cell></Table.Row>)}
        </Table.Body>
      </Table>
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