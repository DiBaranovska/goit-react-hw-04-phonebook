import { useState } from 'react';
import css from './form.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';


const Form = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


  const nameInputId = nanoid();
  const telInputId = nanoid();

 
  const handleInputChange = event => {
    switch (event.target.name) {
    case 'name':
    setName(event.target.value);
      break;
    case 'number':
    setNumber(event.target.value);
      break;
    default:
    return;
  }
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({name, number});
    reset()
  };

  const   reset = () => {
    setName('');
    setNumber('');
  };

  return (
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.form__name} htmlFor={nameInputId}>
          Name
        </label>
        <input
          className={css.form__input}
          type="text"
          name="name"
          onChange={handleInputChange}
          value={name}
          id={nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.form__name} htmlFor={telInputId}>
          Number
        </label>
        <input
          className={css.form__input}
          type="tel"
          name="number"
          onChange={handleInputChange}
          value={number}
          id={telInputId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit" className={css.form__btn}>
          Add contact
        </button>
      </form>
    );
}

export default Form;


Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
