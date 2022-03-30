import React, { Component, createRef } from 'react'
import Joi from 'joi-browser'
import Form from './form'
class Login extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  }
  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  }

  doSubmit = () => {
    console.log('Submitted')
  }
  render() {
    return (
      <div className="logindiv">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    )
  }
}

export default Login
