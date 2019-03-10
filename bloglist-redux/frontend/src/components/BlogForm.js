import React from 'react'
import { useField } from '../hooks'
import styled from 'styled-components'

const Input = styled.input`
  margin: 0.25em;
`

const BlogForm = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <Input id='title' {...title} />
        </div>
        <div>
          author:
          <Input id = 'author' {...author} />
        </div>
        <div>
          url:
          <Input id = 'url' {...url} />
        </div>
        <button type='submit' id='createbutton'>create</button>
      </form>
    </div>
  )
}

export default BlogForm