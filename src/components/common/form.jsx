import React, { Component } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Select from './select'
class Form extends Component {
  state = {
    data: {},
    errors: {},
  }
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = { [name]: this.schema[name] }
    const { error } = Joi.validate(obj, schema)
    return !error ? null : error.details[0].message
  }
  handleOnchange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMessage = this.validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    const data = { ...this.state.data }
    data[input.name] = input.value
    this.setState({ data, errors })
  }
  validate = () => {
    const option = { abortEarly: false }
    const { error } = Joi.validate(this.state.data, this.schema, option)
    if (!error) return null
    const errors = {}
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) return
    //call the server for dedirect to pages
    //console.log(this.username.current.value)
    this.doSubmit()
  }
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    )
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }
  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state
    return (
      <Input
        value={data[name]}
        name={name}
        label={label}
        type={type}
        onChange={this.handleOnchange}
        error={errors[name]}
      />
    )
  }
}

export default Form
