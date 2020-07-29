import React, { useState } from 'react'
import axios from 'axios'

import DataTable from './components/table'

const API_URL = '/api'

const App = () => {
  const [error, setError] = useState(null)
  const [headers, setHeaders] = useState(['Name', 'Type', 'Participants'])
  const [keys, setKeys] = useState(['activity', 'type', 'participants'])
  const [rows, setRows] = useState([])
  const [start, setStart] = useState(0)
  const [size, setSize] = useState(10)

  const fetchRows = () =>
    axios
      .get(`${API_URL}?start=${start}&size=${size}`)
      .then((res) => setRows(res.data))
      .catch((err) => setError(err))

  if (rows.length === 0) {
    fetchRows()
  }

  return (
    <div>
      <main>
        <DataTable
          className="activityTable"
          title="Activities"
          headers={headers}
          keys={keys}
          rows={rows}
        />
        <section className="actions">
          <button
            disabled={start === 0}
            onClick={() => {
              setStart(start - size)
              fetchRows()
            }}>
            Previous Page
          </button>
          <span>Page {start / size + 1}</span>
          <button
            disabled={rows.length < size}
            onClick={() => {
              setStart(start + size)
              fetchRows()
            }}>
            Next Page
          </button>
        </section>
      </main>
    </div>
  )
}

export default App
