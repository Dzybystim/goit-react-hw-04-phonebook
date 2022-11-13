import React, { useState, useEffect} from "react";
import {AppContainer} from './App.styled'
import { nanoid } from 'nanoid'

import {Section} from 'components/Section/Section'
import PhonebookInput from 'components/PhonebookInput/PhonebookInput'
import {Filter} from 'components/Filter/Filter'
import {Contacts} from 'components/Contacts/Contacts'

export default function APP() {

  let [contacts, setContacts] = useState([])
  let [filter, setFilter] = useState('')


//////////////////////Функция ищет id контактов которые не совпадают с id которое хотим удалить и возвращает все контакты без удаляемого
const  onDeleteContact = (id) => {

    const saveContact = contacts.filter(contact => contact.id !== id )
    setContacts(contacts = saveContact)
      
    
  }
////////////////Проверяет контакты на то что бы не повторялось имя с тем что вводиться
const  checkAlreadyEnteredValue = (name) => {
   const check = contacts.find(contact => contact.text===name)
   return check
   
  }

  ////////////////Функция которая добавляет новый контакт в массив контактов
const  addContacts = (name, number) => {
    const contact = {
      id: nanoid(),
      text: name,
      tel: number
    }

    setContacts(prevent => [...prevent, contact])
    
  }

  /////////////////Функция которая записывает значение с инпута фильтра в стейт.фильтр
const changeFilter = (event) => {
  setFilter(filter = event.target.value)
  }


///////////////////Функция которая проверяет по данным инпута-фильтр и отдает контакты которые соответствуют фильтру
const getVisibleFilter = () => {
  const normalize = filter.toLowerCase()
  return contacts.filter(contact => contact.text.toLowerCase().includes(normalize))
}

//////////////////При монтировании странички смотрим что есть в локальном хранилище и берем оттуда данные для отрисовки
useEffect(() => {
  const contacts = localStorage.getItem('contacts')
  const parseContacts = JSON.parse(contacts)
  if(parseContacts && parseContacts.length>0){
    setContacts(parseContacts)
  }
}, []);

/////////////////Сравниваем контакты до обновления и после , если изминения есть записываем в локальное хранилище
useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts))
}, [contacts])


///////////////////Отфильтрованные контакты по фильтру
  const visibleFilter = getVisibleFilter()

  return (
    <AppContainer>

      <Section title={"Phonebook"}>
       <PhonebookInput 
       titleName={"Name"}
       titleNumber={"Number"}
       addContacts={addContacts}
       checkAlreadyEnteredValue={checkAlreadyEnteredValue}/>
      </Section>

      <Section title={"Contacts"}>
      <Filter 
      title={"Find contacts by name"} 
      filter={filter} 
      onChangeFilter={changeFilter}/>

      <Contacts 
      contacts={visibleFilter} 
      onDeleteContact={onDeleteContact}
      />
      </Section>

    </AppContainer>
  );
}



