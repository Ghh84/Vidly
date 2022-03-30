import _ from 'lodash'
import React, { Component } from 'react'
class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.contents) return column.contents(item)
    return _.get(item, column.name)
  }
  createKey = (item, column) => {
    return item._id + (column.name || column.key)
  }
  render() {
    const { data, columns, onDelete, onLike } = this.props
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <th key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </th>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }
}

export default TableBody
