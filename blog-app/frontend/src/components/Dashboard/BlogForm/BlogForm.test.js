import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const mockBlog = {
  title: 'blog title',
  author: 'blog author',
  url: 'blog.com'
}

describe('blog form', () => {
  test('calls addBlog function with right props', () => {
    const mockAddBlog = jest.fn()
    const component = render(<BlogForm addBlog={mockAddBlog} />)
    const form = component.container.querySelector('form')
    const inputs = ['title', 'author', 'url'].map(id => screen.getByLabelText(id))
    Object.values(mockBlog).forEach((value, index) => {
      fireEvent.change(inputs[index], { target: { value: value } })
    })
    fireEvent.submit(form)
    expect(mockAddBlog.mock.calls[0][1]).toEqual(mockBlog)
  })
})