import React from 'react'
import PropTypes from 'prop-types'

const DataTable = ({ headers, keys, rows, className, title }) => {
  return (
    <table className={className}>
      {title && <caption>{title}</caption>}
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
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
