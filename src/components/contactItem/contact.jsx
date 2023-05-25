import React from 'react';
import PropTypes from 'prop-types';
import css from './contact.module.css';

const Contact = ({ id, name, number, onDeleteContact }) => (
  <li className={css.contact_item}>
    {name}: {number}
    <button
      className={css.contact_btn}
      onClick={() => {
        onDeleteContact(id);
      }}
    >
      Delete
    </button>
  </li>
);

export default Contact;

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
