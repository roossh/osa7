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
  case 'GET_BLOG':
    return action.data
  case 'COMMENT':
    const commentId = action.data.id
    const blogToComment = state.find(b => b.id === commentId)
    const commentedBlog = {...blogToComment, comments: blogToComment.comments.concat(action.data.comment)}
    console.log(commentedBlog)
    return state.map(blog => blog.id !== id ? blog : commentedBlog)
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

export const addComment = (content) => {
  return async dispatch => {
    console.log('addComment', content)
    console.log('stf',content)
    const newComment = await blogService.comment(content)
    dispatch({
      type: 'COMMENT',
      data: {
        comment: content.comment,
        id: content.id
      },
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

export const getBlogById = ({ id }) => {
  return async dispatch => {
    const blog = await blogService.getById(id)
    dispatch({
      type: 'GET_BLOG',
      data: blog,
    })
  }
}

export default reducer