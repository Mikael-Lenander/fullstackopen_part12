import React, { useState, useEffect } from 'react'
import { useUser, useSetUser } from '../../hooks/userContext'
import Notification from '../Shared/Notification/Notification'
import { useAddNotification } from '../../hooks/notificationContext'
import { ToggleVisibilityProvider } from '../../hooks/visibilityContext'
import Blog from './Blog/Blog'
import BlogForm from './BlogForm/BlogForm'
import blogService from '../../services/blogs'

export default function Dashboard() {

  const user = useUser()
  const setUser = useSetUser()
  const [blogs, setBlogs] = useState([])
  const addNotification = useAddNotification()

  function logout(event) {
    event.preventDefault()
    setUser(null)
    addNotification('Logout successful', 'green')
  }

  async function likeBlog(blog) {
    try {
      const likedBlog = await blogService.like(blog)
      setBlogs(blogs.map(blog => blog.id === likedBlog.id ? likedBlog : blog))
    } catch (error) {
      addNotification(error.reponse.data.error, 'red')
    }
  }

  async function addBlog( event, blog, toggleVisibility, setBlog, initialBlog ) {
    event.preventDefault()
    try {
      const newBlog = await blogService.create(blog, user.token)
      setBlogs(prev => [...prev, newBlog])
      addNotification(`Added blog "${newBlog.title}" by ${newBlog.author}`, 'green')
      toggleVisibility()
      setBlog(initialBlog)
    } catch (error) {
      addNotification(error.response.data.error, 'red')
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <>
      {user &&
        <div>
          <Notification />
          <p>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </p>
          <ToggleVisibilityProvider buttonLabel='create new blog'>
            <BlogForm setBlogs={setBlogs} addBlog={addBlog} />
          </ToggleVisibilityProvider>
          <h2>Blogs</h2>
          <div id='blogs'>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} likeBlog={likeBlog} />
              )}
          </div>
        </div>}
    </>
  )
}
