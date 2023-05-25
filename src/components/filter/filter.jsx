import React from 'react';
import PropTypes from 'prop-types';
import css from './filter.module.css';
import { nanoid } from 'nanoid';

const Filter = ({ value, onChange }) => {
  const filterInputId = nanoid();
  return (
    <div className={css.contacts_filter}>
      <label className={css.contacts__name} htmlFor={filterInputId}>
        Find contacts by name
      </label>
      <input
        className={css.contacts__input}
        id={filterInputId}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
