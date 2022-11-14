import React, { useState  } from "react";
import PropTypes from 'prop-types';
import {Form, ButtonSubmit} from './PhonebookInput.styled'

export default function PhonebookInput({titleName, titleNumber, addContacts, checkAlreadyEnteredValue})  {
let [name, setName] = useState('')
let [number, setNumber] = useState('')



////////////////////Функция обновляет до начального состояния инпуты ввода
const reset = () => {
  setName(name='')
  setNumber(number='')
}
///////////////////Функция которая обрабатывает событие Сабмита
const handleSubmit = event => {
  event.preventDefault();

  const check = checkAlreadyEnteredValue(name)
  if(check) {
  return alert(`${name} is already in contacts`)}
  else {
  addContacts(name, number)
  reset()
  }
}
///////////////////Функция которая записывает в стейт данные введенные в инпуты
const handleInputChange = event => {
  switch(event.target.name) {
    case 'name':
      setName(event.target.value);
      break;
    case 'number':
      setNumber(event.target.value)
      break;
    default: console.log('Ошибка в handleInputChange')
  }
}


    return <div>
        <Form onSubmit={handleSubmit}>
        <h2>{titleName}</h2>
        <label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. 
          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          />
          </label>
          <h2>{titleNumber}</h2>
          <label>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          </label>
          <ButtonSubmit type="submit">Add contact</ButtonSubmit>
          </Form>
    </div>
}

PhonebookInput.propTypes = {
  titleName: PropTypes.string.isRequired,
  titleNumber: PropTypes.string.isRequired,
  addContacts: PropTypes.func.isRequired,
  checkAlreadyEnteredValue: PropTypes.func.isRequired
}
