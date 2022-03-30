import React, { Component } from 'react'
import { getMovies } from './../fakeMovieService'
import 'font-awesome/css/font-awesome.css'
import Pagination from './common/pagination'
import { paginate } from './../utilts/paginate'
import ListGruop from './common/listGroup'
import { genres, getGenres } from '../fakeGenreService'
import MoviesTable from './common/moviesTable'
import Link from 'react-router-dom/Link'
import SearchBox from './common/searchBox'
import _ from 'lodash'

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 1,
    selectGenre: null,
    searchQuery: '',
    sortColumn: { name: 'title', order: 'asc' },
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id)
    this.setState({ movies: movies })
  }
  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres: genres })
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = { ...movie }
    movies[index].liked = !movies[index].liked
    this.setState({ movies: movies })
  }
  handlePagination = (page) => {
    this.setState({ currentPage: page })
  }
  handleItemSelect = (genre) => {
    this.setState({ selectedItem: genre, currentPage: 1 })
  }
  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn })
  }
  handleNewMovie = () => {
    console.log('Add new movie')
    this.doSubmit()
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }
  handleGenreSelect = (genre) => {
    this.setState({ searchQuery: '', selectGenre: genre, currentPage: 1 })
  }
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectGenre: null, currentPage: 1 })
  }

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      searchQuery,
      selectGenre,
      sortColumn,
    } = this.state
    let filteredItem = allMovies
    if (searchQuery)
      filteredItem = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
      )
    else if (selectGenre && selectGenre._id)
      filteredItem = allMovies.filter((m) => m.genre._id && selectGenre._id)
    const sortedItem = _.orderBy(
      filteredItem,
      [sortColumn.name],
      [sortColumn.order],
    )
    const pageMovie = paginate(sortedItem, currentPage, pageSize)
    return { totalCount: filteredItem.length, data: pageMovie }
  }

  render() {
    const count = this.state.movies.length
    const { currentPage, pageSize, genres, sortColumn } = this.state

    if (count === 0)
      return (
        <p style>
          <strong>There is no movies in the datebase</strong>
        </p>
      )
    const { totalCount, data: pageMovies } = this.getPageData()
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGruop
              genres={genres}
              selectedItem={this.state.selectedItem}
              onItemSelect={this.handleItemSelect}
            />
          </div>

          <div className="col">
            <Link
              className="btn btn-primary"
              to="/movies/new"
              style={{ marginBottom: 20, marginLeft: 20 }}
            >
              New Movie
            </Link>
            <p>
              <strong>Showing {totalCount} movies in the data base</strong>
            </p>

            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />

            <MoviesTable
              movies={pageMovies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePagination}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Movies
