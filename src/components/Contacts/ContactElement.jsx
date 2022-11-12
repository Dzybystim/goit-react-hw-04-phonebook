import PropTypes from 'prop-types';
import {ButtonDelete} from './ContactElement.styled'

export const ContactElement = ({contacts, onDeleteContact}) => {
    return  contacts.map(contact => {
        return <li key={contact.id}>{contact.text}: {contact.tel}
        <ButtonDelete type="button" onClick={() => onDeleteContact(contact.id)}>Delete</ButtonDelete>
        </li>
        
    }
        )
}


ContactElement.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf),
    onDeleteContact: PropTypes.func.isRequired
}