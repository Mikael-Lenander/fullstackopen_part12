import React, { useState } from 'react'
import { useAddNotification } from '../../../hooks/notificationContext'
import { useUser } from '../../../hooks/userContext'
import blogService from '../../../services/blogs'
import PropTypes from 'prop-types'
import './Blog.css'

const Blog = ({ blog, blogs, setBlogs, likeBlog }) => {

  const [fullView, setFullView] = useState(false)
  const addNotification = useAddNotification()
  const user = useUser()

  function toggleView() {
    setFullView(prev => !prev)
  }

  async function removeBlog() {
    try {
      const confirm = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
      if (confirm) {
        await blogService.remove(blog.id, user.token)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        addNotification('Blog removed', 'green')
      }
    } catch (error) {
      addNotification(error, 'red')
    }
  }

  return (
    <div className='blog'>
      {fullView
        ? <>
          <p>{blog.title} <button onClick={toggleView}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></p>
          <p>{blog.author}</p>
          {blog.user.username === user.username && <button onClick={removeBlog}>remove</button>}
        </>
        : <>
          <p>{blog.title} {blog.author}</p>
          <button onClick={toggleView}>view</button>
        </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog