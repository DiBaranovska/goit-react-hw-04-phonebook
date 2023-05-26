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

  const changeFilter = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    const normalizedFilter = filter.toLowerCase();
    setVisivbleContacts(state => {
     state =  contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
      return state;
    })
  }, [filter, contacts])

  useEffect(() => {
     localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const formSubmit = data => {
    const normalizedName = data.name.toLowerCase();
    const contactID = nanoid();
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === normalizedName
      )
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts(state => {
       return [...state, { id: contactID, ...data }]
      });
    }
  }

  const deleteContact = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId)
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
        <Contacts
          contacts={visibleContacts}
         onDeleteContact={deleteContact}
        />
      </div>
    );
}




/*class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  formSubmit = data => {
    const normalizedName = data.name.toLowerCase();
    const contactID = nanoid();
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === normalizedName
      )
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      this.setState(state => ({
        contacts: [
          ...state.contacts,
          { id: contactID, name: data.name, number: data.number },
        ],
      }));
    }
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <div
        style={{
          marginLeft: '20px',
          alignItems: 'center',
        }}
      >
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <Contacts
          contacts={this.getVisibleContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}*/

export default App;
