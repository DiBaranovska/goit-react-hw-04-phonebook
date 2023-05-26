import { useState, useEffect } from 'react';
import Form from './form/form';
import Filter from './filter/filter';
import Contacts from './contacts/contacts';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');
  const [visibleContacts, setVisivbleContacts] = useState([]);

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const normalizedFilter = filter.toLowerCase();
    setVisivbleContacts(state => {
      state = contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
      return state;
    });
  }, [filter, contacts]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = data => {
    const normalizedName = data.name.toLowerCase();
    const contactID = nanoid();
    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts(state => {
        return [...state, { id: contactID, ...data }];
      });
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  return (
    <div
      style={{
        marginLeft: '20px',
        alignItems: 'center',
      }}
    >
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <Contacts contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;
