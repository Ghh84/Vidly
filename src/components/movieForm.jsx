import React, { Component } from 'react'
import Form from './common/form'
import Joi from 'joi-browser'
import { saveMovie, getMovie } from '../fakeMovieService'
import { getGenres } from '../fakeGenreService'
class movieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
  }
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number of stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
  }
  handleSubmit = () => {
    console.log('Registered')
    //saveMovie()
  }
  componentDidMount() {
    const genres = getGenres()
    this.setState({ genres })
    const movieId = this.props.match.params.id
    if (movieId === 'new') return
    const movie = getMovie(movieId)
    if (!movie) return this.props.history.replace('/not-found')

    this.setState({ data: this.mapToViewModel(movie) })
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }
  doSubmit = () => {
    saveMovie(this.state.data)
    this.props.history.push('/movies')
  }
  render() {
    return (
      <div className="logindiv">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Daily rental rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    )
  }
}

export default movieForm
