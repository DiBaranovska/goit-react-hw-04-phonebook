import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../contactItem/contact';
import css from './contacts.module.css';

const Contacts = ({ contacts, onDeleteContact }) => (
  <ul className={css.contacts_list}>
    {contacts.map(contact => {
      return (
        <Contact
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onDeleteContact={onDeleteContact}
        />
      );
    })}
  </ul>
);

export default Contacts;

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
