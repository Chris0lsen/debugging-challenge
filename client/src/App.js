import React, { useEffect, useState } from 'react'
import axios from 'axios'

import DataTable from './components/table'

const API_URL = '/api'

const App = (props) => {
  const [error, setError] = useState(null)
  const [headers, setHeaders] = useState(['Name', 'Type', 'Participants'])
  const [keys, setKeys] = useState(['activity', 'type', 'participants'])
  const [rows, setRows] = useState([])
  const [start, setStart] = useState(0)
  const [size, setSize] = useState(10)

  useEffect(() => {
    axios
      .get(`${API_URL}?start=${start}&size=${size}`)
      .then((res) => setRows(res.data))
      .catch((err) => setError(err))
  }, [start, size])

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
          <button disabled={start === 0} onClick={() => setStart(start - size)}>
            Previous
          </button>
          <span>Page {start / size + 1}</span>
          <button
            disabled={rows.length < size}
            onClick={() => setStart(start + size)}>
            Next
          </button>
        </section>
      </main>
    </div>
  )
}

export default App
