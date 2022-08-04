import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todo = {
    text: "must be done",
    done: false
  }
  const mock1 = jest.fn()
  const mock2 = jest.fn()
  render(<Todo todo={todo} onClickComplete={mock1} onClickDelete={mock2} />)
  const element = screen.getByText(todo.text)
  expect(element).toBeDefined()

})