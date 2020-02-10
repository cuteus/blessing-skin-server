import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Pagination, { labels } from '@/components/Pagination'

describe('first page', () => {
  it('enabled', () => {
    const mock = jest.fn()
    const { getByText } = render(
      <Pagination page={2} totalPages={3} onChange={mock} />,
    )
    fireEvent.click(getByText(labels.first))
    expect(mock).toBeCalledWith(1)
  })

  it('disabled', () => {
    const mock = jest.fn()
    const { getByText } = render(
      <Pagination page={1} totalPages={3} onChange={mock} />,
    )
    fireEvent.click(getByText(labels.first))
    expect(mock).not.toBeCalled()
  })
})

describe('last page', () => {
  it('enabled', () => {
    const mock = jest.fn()
    const { getByText } = render(
      <Pagination page={2} totalPages={3} onChange={mock} />,
    )
    fireEvent.click(getByText(labels.last))
    expect(mock).toBeCalledWith(3)
  })

  it('disabled', () => {
    const mock = jest.fn()
    const { getByText } = render(
      <Pagination page={3} totalPages={3} onChange={mock} />,
    )
    fireEvent.click(getByText(labels.last))
    expect(mock).not.toBeCalled()
  })
})

describe('previous page', () => {
  it('enabled', () => {
    const mock = jest.fn()
    const { getByText } = render(
      <Pagination page={3} totalPages={5} onChange={mock} />,
    )
    fireEvent.click(getByText(labels.prev))
    expect(mock).toBeCalledWith(2)
  })

  it('disabled', () => {
    const mock = jest.fn()
    const { getByText } = render(
      <Pagination page={1} totalPages={5} onChange={mock} />,
    )
    fireEvent.click(getByText(labels.prev))
    expect(mock).not.toBeCalled()
  })
})

describe('next page', () => {
  it('enabled', () => {
    const mock = jest.fn()
    const { getByText } = render(
      <Pagination page={3} totalPages={5} onChange={mock} />,
    )
    fireEvent.click(getByText(labels.next))
    expect(mock).toBeCalledWith(4)
  })

  it('disabled', () => {
    const mock = jest.fn()
    const { getByText } = render(
      <Pagination page={5} totalPages={5} onChange={mock} />,
    )
    fireEvent.click(getByText(labels.next))
    expect(mock).not.toBeCalled()
  })
})

describe('middle pages', () => {
  it('pages count less than 8', () => {
    const mock = jest.fn()
    const { getByText } = render(
      <Pagination page={1} totalPages={7} onChange={mock} />,
    )

    fireEvent.click(getByText('1'))
    expect(mock).toBeCalledWith(1)

    fireEvent.click(getByText('2'))
    expect(mock).toBeCalledWith(2)

    fireEvent.click(getByText('3'))
    expect(mock).toBeCalledWith(3)

    fireEvent.click(getByText('4'))
    expect(mock).toBeCalledWith(4)

    fireEvent.click(getByText('5'))
    expect(mock).toBeCalledWith(5)

    fireEvent.click(getByText('6'))
    expect(mock).toBeCalledWith(6)

    fireEvent.click(getByText('7'))
    expect(mock).toBeCalledWith(7)
  })

  describe('pages count greater than or equals to 8', () => {
    it('edge', () => {
      const mock = jest.fn()
      const { getByText, queryByText } = render(
        <Pagination page={2} totalPages={10} onChange={mock} />,
      )

      fireEvent.click(getByText('1'))
      expect(mock).toBeCalledWith(1)
      expect(queryByText('1')).toBeInTheDocument()
      expect(queryByText('2')).toBeInTheDocument()
      expect(queryByText('...')).toBeInTheDocument()
      expect(queryByText('9')).toBeInTheDocument()
      expect(queryByText('10')).toBeInTheDocument()

      fireEvent.click(getByText('2'))
      expect(mock).toBeCalledWith(2)
      expect(queryByText('1')).toBeInTheDocument()
      expect(queryByText('2')).toBeInTheDocument()
      expect(queryByText('...')).toBeInTheDocument()
      expect(queryByText('9')).toBeInTheDocument()
      expect(queryByText('10')).toBeInTheDocument()

      fireEvent.click(getByText('9'))
      expect(mock).toBeCalledWith(9)
      expect(queryByText('1')).toBeInTheDocument()
      expect(queryByText('2')).toBeInTheDocument()
      expect(queryByText('...')).toBeInTheDocument()
      expect(queryByText('9')).toBeInTheDocument()
      expect(queryByText('10')).toBeInTheDocument()

      fireEvent.click(getByText('10'))
      expect(mock).toBeCalledWith(10)
      expect(queryByText('1')).toBeInTheDocument()
      expect(queryByText('2')).toBeInTheDocument()
      expect(queryByText('...')).toBeInTheDocument()
      expect(queryByText('9')).toBeInTheDocument()
      expect(queryByText('10')).toBeInTheDocument()
    })

    it('middle', () => {
      const mock = jest.fn()
      const { getByText, queryByText, queryAllByText } = render(
        <Pagination page={4} totalPages={10} onChange={mock} />,
      )

      expect(queryByText('1')).toBeInTheDocument()
      expect(queryAllByText('...')).toHaveLength(2)
      expect(queryByText('3')).toBeInTheDocument()
      expect(queryByText('4')).toBeInTheDocument()
      expect(queryByText('5')).toBeInTheDocument()
      expect(queryByText('10')).toBeInTheDocument()

      fireEvent.click(getByText('5'))
      expect(mock).toBeCalledWith(5)

      fireEvent.click(getByText('1'))
      expect(mock).toBeCalledWith(1)

      fireEvent.click(getByText('10'))
      expect(mock).toBeCalledWith(10)
    })
  })
})
