/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'

import DataTable from './table'

const defaults = {
  headers: ['One', 'Two', 'Three', 'Four'],
  keys: ['a', 'b', 'c', 'd'],
  rows: []
}

describe('data table', () => {
  test('renders a th for every passed-in header', () => {
    const { getAllByRole } = render(<DataTable {...defaults} />)
    const headers = getAllByRole('columnheader')
    expect(headers.length).toBe(4)
  })
})
