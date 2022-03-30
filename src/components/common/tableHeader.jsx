import React, { Component } from 'react'
class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn }
    if (path === sortColumn.name)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    else {
      sortColumn.name = path
      sortColumn.order = 'asc'
    }
    this.props.onSort(sortColumn)
  }
  renderSortIcon = (column) => {
    if (this.props.sortColumn.name !== column.name) return null
    if (this.props.sortColumn.order === 'asc')
      return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  }

  render() {
    const { columns } = this.props
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.name || column.key}
              onClick={() => this.raiseSort(column.name)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    )
  }
}

export default TableHeader
