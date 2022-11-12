import React, { Component } from "react";
import PropTypes from 'prop-types';
import {Form, ButtonSubmit} from './PhonebookInput.styled'

export default class PhonebookInput extends Component  {
state = {
  name: '',
  number: ''
}


////////////////////Функция обновляет до начального состояния инпуты ввода
reset = () => {
  this.setState({
    name: '',
    number: ''
  })
}
///////////////////Функция которая обрабатывает событие Сабмита
handleSubmit = event => {
  event.preventDefault();

  const check = this.props.checkAlreadyEnteredValue(this.state.name)
  if(check) {
  return alert(`${this.state.name} is already in contacts`)}
  else {
  this.props.addContacts(this.state.name, this.state.number)
  this.reset()
  }
}
///////////////////Функция которая записывает в стейт данные введенные в инпуты
handleInputChange = event => {
  this.setState({
    [event.currentTarget.name]: event.currentTarget.value
  })
}


render() {
    return <div>
        <Form onSubmit={this.handleSubmit}>
        <h2>{this.props.titleName}</h2>
        <label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. 
          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          />
          </label>
          <h2>{this.props.titleNumber}</h2>
          <label>
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          </label>
          <ButtonSubmit type="submit">Add contact</ButtonSubmit>
          </Form>
    </div>
}
}

PhonebookInput.propTypes = {
  titleName: PropTypes.string.isRequired,
  titleNumber: PropTypes.string.isRequired,
  addContacts: PropTypes.func.isRequired,
  checkAlreadyEnteredValue: PropTypes.func.isRequired
}