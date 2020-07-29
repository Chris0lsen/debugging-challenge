import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const SORT_ASC = '▲'
const SORT_DESC = '▼'

const DataTable = ({ headers, keys, rows, className, title }) => {
  const [sortKey, setSortKey] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)
  const [sortedRows, setSortedRows] = useState(rows)

  const getAriaSort = (key) => {
    if (key === sortKey) {
      return sortAsc ? 'ascending' : 'descending'
    }
    return 'none'
  }

  const getSortIcon = (key) => {
    if (key === sortKey) {
      return sortAsc ? SORT_ASC : SORT_DESC
    }
    return null
  }

  const handleSortChange = (key) => {
    let newSortAsc = sortAsc
    if (key === sortKey) {
      newSortAsc = !sortAsc
    } else {
      setSortKey(key)
      newSortAsc = true
    }
    setSortAsc(newSortAsc)
    let temp = [...rows].sort((a, b) =>
      newSortAsc ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1
    )
    setSortedRows(temp)
  }

  useEffect(() => {
    handleSortChange(sortKey)
  }, [rows])

  return (
    <table className={className}>
      {title && <caption>{title}</caption>}
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th
              key={header}
              scope="col"
              aria-sort={getAriaSort(keys[i])}
              tabIndex={0}
              onClick={() => handleSortChange(keys[i])}
              onKeyDown={(e) => {
                if (e.which === 13 || e.which === 32) {
                  return handleSortChange(keys[i])
                }
              }}>
              {header}
              {getSortIcon(keys[i])}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row, i) => (
          <tr key={`row-${i}`}>
            {keys.map((key) => (
              <td key={`row-${i}-${key}`}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

DataTable.propType = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  title: PropTypes.string
}

export default DataTable
