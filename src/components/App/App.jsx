import React, { Component } from "react";
import {AppContainer} from './App.styled'
import { nanoid } from 'nanoid'

import {Section} from 'components/Section/Section'
import PhonebookInput from 'components/PhonebookInput/PhonebookInput'
import {Filter} from 'components/Filter/Filter'
import {Contacts} from 'components/Contacts/Contacts'

export default class APP extends Component {

  state = {
    contacts: [],
    filter: ''
  }

//////////////////////Функция ищет id контактов которые не совпадают с id которое хотим удалить и возвращает все контакты без удаляемого
  onDeleteContact = (id) => {

    const saveContact = this.state.contacts.filter(contact => contact.id!==id)
    this.setState({
      contacts: saveContact
    })
  }
////////////////Проверяет контакты на то что бы не повторялось имя с тем что вводиться
  checkAlreadyEnteredValue = (name) => {
   const check = this.state.contacts.find(contact => contact.text===name)
   return check
   
  }

  ////////////////Функция которая добавляет новый контакт в массив контактов
  addContacts = (name, number) => {
    const contact = {
      id: nanoid(),
      text: name,
      tel: number
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact]
    }))
  }

  /////////////////Функция которая записывает значение с инпута фильтра в стейт.фильтр
changeFilter = (event) => {
  this.setState({
    filter: event.currentTarget.value
  })
}

///////////////////Функция которая проверяет по данным инпута-фильтр и отдает контакты которые соответствуют фильтру
getVisibleFilter = () => {
  const normalize = this.state.filter.toLowerCase()
  return this.state.contacts.filter(contact => contact.text.toLowerCase().includes(normalize))
}

//////////////////При монтировании странички смотрим что есть в локальном хранилище и берем оттуда данные для отрисовки
componentDidMount() {
  const contacts = localStorage.getItem('contacts')
  const parseContacts = JSON.parse(contacts)
  if(parseContacts){
  this.setState({contacts: parseContacts})}
  
}
/////////////////Сравниваем контакты до обновления и после , если изминения есть записываем в локальное хранилище
componentDidUpdate(_, prevState) {
  if(this.state.contacts.length !== prevState.contacts.length){
  localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
}
  
}

  render() {
///////////////////Отфильтрованные контакты по фильтру
  const visibleFilter = this.getVisibleFilter()

  return (
    <AppContainer>

      <Section title={"Phonebook"}>
       <PhonebookInput 
       titleName={"Name"}
       titleNumber={"Number"}
       addContacts={this.addContacts}
       checkAlreadyEnteredValue={this.checkAlreadyEnteredValue}/>
      </Section>

      <Section title={"Contacts"}>
      <Filter 
      title={"Find contacts by name"} 
      filter={this.state.filter} 
      onChangeFilter={this.changeFilter}/>

      <Contacts 
      contacts={visibleFilter} 
      onDeleteContact={this.onDeleteContact}
      />
      </Section>

    </AppContainer>
  );
}
}


