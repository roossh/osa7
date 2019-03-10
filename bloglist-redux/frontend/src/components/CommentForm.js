import React from 'react'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const CommentForm = (props) => {
  const [comment, commentReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addComment({
      comment: comment.value,
      id: props.id
    })
    commentReset()
  }
/*
  const NewComment = ({ addComment, id }) => {
    const commentBlog = async (blog) => {
      addComment(blog)
    }*/

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...comment} />
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default connect(null, { addComment })(CommentForm)