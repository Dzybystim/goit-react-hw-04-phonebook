import PropTypes from 'prop-types';
import {ContactElement} from 'components/Contacts/ContactElement'

export const Contacts = ({contacts, onDeleteContact}) => {

    return <div>
    <ul>
    <ContactElement contacts={contacts} onDeleteContact={onDeleteContact}/>
    </ul>
    </div>
}

Contacts.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf),
    onDeleteContact: PropTypes.func.isRequired
}