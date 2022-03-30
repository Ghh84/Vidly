import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Movies from './components/movies'
import Customers from './components/customers'
import NotFound from './components/notFound'
import Rentals from './components/rentals'
import NavBar from './components/common/navBar'
import MovieForm from './components/movieForm'
import Login from './components/common/login'
import Register from './components/common/register'
import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    )
  }
}

export default App
