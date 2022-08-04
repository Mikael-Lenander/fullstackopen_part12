import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import { UserProvider, useSetUser } from '../../../hooks/userContext'
import { NotificationProvider } from '../../../hooks/notificationContext'

const mockBlog = { title: 'blog title', author: 'Writer', url: 'blogs.com', likes: 2, user: { username: 'moi' } }


const MockBlog = ({ blog, likeBlog=jest.fn() }) => {
  return (
    <UserProvider>
      <NotificationProvider>
        <MockBlogChild blog={blog} likeBlog={likeBlog} />
      </NotificationProvider>
    </UserProvider>
  )
}

const MockBlogChild = ({ blog, likeBlog }) => {
  const setUser = useSetUser()
  setUser({ username: 'moi' })
  return (
    <Blog blog={blog} blogs={[]} likeBlog={likeBlog} setBlogs={() => {}} />
  )
}

function clickView() {
  const button = screen.getByRole('button', { name: /view/i })
  fireEvent.click(button)
}

describe('blog', () => {

  test('renders title and author but not url nor likes', () => {
    const component = render(<MockBlog blog={mockBlog} />)
    const blogDiv = component.container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent(mockBlog.title)
    expect(blogDiv).toHaveTextContent(mockBlog.author)
    expect(blogDiv).not.toHaveTextContent(mockBlog.url)
    expect(blogDiv).not.toHaveTextContent(mockBlog.likes)
  })

  test('renders url and likes when view-button is clicked', () => {
    render(<MockBlog blog={mockBlog} />)
    clickView()
    screen.getByText(mockBlog.title)
    screen.getByText(mockBlog.author)
    screen.getByText(mockBlog.url)
    screen.getByText(`likes ${mockBlog.likes}`)
  })

  test('like button can be pressed multiple times', () => {
    const mockLikeBlog = jest.fn()
    render(<MockBlog blog={mockBlog} likeBlog={mockLikeBlog} />)
    clickView()

    const button = screen.getByRole('button', { name: 'like' })
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockLikeBlog.mock.calls).toHaveLength(2)
  })
})