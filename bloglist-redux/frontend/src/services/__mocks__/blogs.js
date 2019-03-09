const blogs = [
  {
    title: 'Integration Testing',
    author: 'A Person',
    likes: 10,
    url: 'blog.blog',
    user: {
      id: '20390293',
      name: 'Teuvo Testaaja',
      username: 'tester',
      token: '1231231214'
    }
  },
  {
    title: 'Hopefully My Tests Can Pass!',
    author: 'Desperate Programmer',
    likes: 102,
    url: 'blog.blog',
    user: {
      id: '20390293',
      name: 'Teuvo Testaaja',
      username: 'tester',
      token: '1231231214'
    }
  },
  {
    title: 'It is the final TESTING',
    author: 'Artist Formerly Known as Europe',
    likes: 0,
    url: 'blog.blog',
    user: {
      id: '20390293',
      name: 'Teuvo Testaaja',
      username: 'tester',
      token: '1231231214'
    }
  }
]

let mockToken = null

const setToken = newToken => {
  mockToken = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}


export default { getAll, setToken }