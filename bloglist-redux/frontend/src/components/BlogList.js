import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleDelete, user }) => {
  blogs.sort((a, b) => (b.likes - a.likes))

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/>)}
    </div>
  )
}

export default BlogList