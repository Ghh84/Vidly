import React, { Component } from 'react'
import Liked from './like'
import Table from './table'
import { Link } from 'react-router-dom'

class MoviesTable extends Component {
  columns = [
    {
      name: 'title',
      label: 'Title',
      contents: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { name: 'genre.name', label: 'Genre' },
    { name: 'numberInStock', label: 'Stock' },
    { name: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      contents: (movie) => (
        <Liked liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: 'delete',
      contents: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete{' '}
        </button>
      ),
    },
  ]
  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props
    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
      />
    )
  }
}

export default MoviesTable
