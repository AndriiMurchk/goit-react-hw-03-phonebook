import { nanoid } from "nanoid";
import { Component } from "react";
import { ContactList } from "../ContactList/ContactList";
import { Filter } from "../Filter/Filter";
import { ContactForm } from "../Form/Form";
import { Wrap } from "./App.styled";


const STORAGE_KEY = 'contacts';

class App extends Component {
  state = {
    filter: '',
    contacts: []
  }

  componentDidMount() {
    try {
      const contacts = JSON.parse(localStorage.getItem(STORAGE_KEY))
      if (contacts) {
        this.setState({ contacts });
      }
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  addNewContact = (newContact) => {
    const { contacts } = this.state;
    const { name } = newContact

    const isExist = contacts.find(person => person.name === name.trim())

    if (isExist) {
      alert(`${name} is already in contacts.`)
      return false
    }

    const finallyNewContact = {
      id: nanoid(),
      ...newContact
    }

    this.setState((prevState) => ({
      contacts: [finallyNewContact, ...prevState.contacts]
    }))

    return true
  }

  onChangeFilter = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    })
  }

  onDeleteBtnClick = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(person => person.id !== id)
    }))
  }

  handlerFilterContacts = (e) => {
    const { contacts, filter } = this.state
    const normalizeName = filter.toLowerCase().trim()

    return contacts.filter(person => person.name.toLowerCase().includes(normalizeName))
  }

  render() {
    const filteredContacts = this.handlerFilterContacts();

    return (
      <Wrap>
        <h1>Phonebook</h1>
        <ContactForm
          addNewContact={this.addNewContact}
        />

        <h2>Contact List</h2>
        <Filter
          onChangeFilter={this.onChangeFilter}
          filter={this.state.filter}
        />

        <ContactList
          onDeleteBtnClick={this.onDeleteBtnClick}
          filteredContacts={filteredContacts}
        />

      </Wrap>
    )
  }
};

export { App };

