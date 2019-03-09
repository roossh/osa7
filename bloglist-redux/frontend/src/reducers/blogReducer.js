import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD':
    return [...state, action.data]
  case 'LIKE':
    const id = action.data.id
    const blogToLike = state.find(b => b.id === id)
    const likedBlog = {...blogToLike, likes: blogToLike.likes + 1}
    return state.map(blog => blog.id !== id ? blog : likedBlog)
  case 'REMOVE':
    const idToRemove = action.data.id
    return state.filter(blog => blog.id !== idToRemove)
  default:
    return state
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    const id = likedBlog.id
    dispatch({
      type: 'LIKE',
      data: { id },
    })
  }
}

export const initialiseBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'ADD',
      data: newBlog,
    })
  }
}


export const deleteBlog = (content) => {
  return async dispatch => {
    const removedBlog = await blogService.remove(content)
    const id = content.id
    dispatch({
      type: 'REMOVE',
      data: { id },
    })
  }
}

export default reducer