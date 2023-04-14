import { fireEvent, render, screen } from '@testing-library/react'
import Todo from '../Todos/Todo'

describe('.Todo', () => {
  let todo = {
    _id: '6430d41385209fe9e08f38ad',
    text: 'demo 4',
    done: false,
  }

  const onClickDelete = jest.fn(() => (todo = null))

  const onClickComplete = () => {
    // return (todo.done = true)
  }

  it('check todo label', async () => {
    const { rerender } = render(
      <Todo
        todo={todo}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
    )

    expect(screen.getAllByText(/demo 4/i)).toBeTruthy()
    expect(screen.getAllByText(/This todo is not done/i)).toBeTruthy()
    expect(screen.getAllByText(/Delete/i)).toBeTruthy()
    expect(screen.getByText(/Set as done/i)).toBeTruthy()
    await fireEvent.click(screen.getByText(/Set as done/i))

    rerender(
      <Todo
        todo={todo}
        onClickDelete={onClickDelete}
        onClickComplete={(todo) => onClickComplete(todo)}
      />
    )

    // expect(screen.getAllByText(/This todo is done/i)).toBeTruthy()
  })
})
