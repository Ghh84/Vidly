import React, { Component } from 'react'
import Joi from 'joi-browser'
import Form from './form'
class Register extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  }
  schema = {
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Email'),
    password: Joi.string().min(5).max(10).required().label('Password'),
    name: Joi.string().required().label('Name'),
  }
  render() {
    return (
      <div className="logindiv">
        <h1>Register Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    )
  }
}

export default Register
