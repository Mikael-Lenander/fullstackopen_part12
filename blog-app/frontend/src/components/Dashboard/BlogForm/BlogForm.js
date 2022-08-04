import React, { useState } from 'react'
import { useToggleVisibility } from '../../../hooks/visibilityContext'

export default function BlogForm({ addBlog }) {

  const initialBlog = { title: '', author: '', url: '' }
  const [blog, setBlog] = useState(initialBlog)
  const toggleVisibility = useToggleVisibility()

  const formInput = prop => (
    <div>
      <label htmlFor={prop}>{prop}</label>
      <input type='text' id={prop} value={blog[prop]} required
        onChange={e => setBlog({ ...blog, [prop]: e.target.value })} />
    </div>
  )

  return (
    <>
      <h2>Create new blog</h2>
      <form id='blog-form' onSubmit={e => addBlog(e, blog, toggleVisibility, setBlog, initialBlog )}>
        {formInput('title')}
        {formInput('author')}
        {formInput('url')}
        <button type='submit'>create</button>
      </form>
    </>
  )
}
