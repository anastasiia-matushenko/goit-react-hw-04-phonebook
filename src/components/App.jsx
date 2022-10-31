import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Message, Subtitle, Title } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? INITIAL_CONTACTS
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const newName = contacts.some(contact => {
      return contact.name.toLowerCase() === name.toLowerCase();
    });

    const result = newName
      ? toast.error(`${name} is already in contacts`, {
        position: 'top-center',
      })
      : setContacts(state => [contact, ...state]);
    return result;
  };

  const filterContacts = () => {
    const filterName = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterName)
    );
  };

  const deleteContact = contactId => {
    setContacts(state => state.filter(({ id }) => id !== contactId));
  };

  const contactsFilterList = filterContacts();
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm addContacts={addContacts} />
      <Subtitle>Contacts</Subtitle>
      <Filter value={filter} onChange={evt => setFilter(evt.target.value)} />
      {contactsFilterList.length > 0
        ? <ContactsList
          contacts={contactsFilterList}
          deleteContact={deleteContact}
        />
        : <Message>❌ Your query did not find anything</Message>}
      <ToastContainer />
    </Container>
  );
};
