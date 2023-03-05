
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ContactItem } from "../ContactItem/ContactItem";


class ContactList extends Component {

  render() {
    const { filteredContacts, onDeleteBtnClick } = this.props

    return (

      <ul>
        {filteredContacts.map(({ name, id, number }) => {
          return <ContactItem
            personName={name}
            personNumber={number}
            key={id}
            id={id}
            filteredContacts={filteredContacts}
            onDeleteBtnClick={onDeleteBtnClick} />
        })}
      </ul>
    )
  }
}

export { ContactList };

ContactList.propTypes = {
  onDeleteBtnClick: PropTypes.func,
  filteredContacts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}
