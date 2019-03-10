import React from 'react'
import { useField } from '../hooks'

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...comment} />
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default CommentForm