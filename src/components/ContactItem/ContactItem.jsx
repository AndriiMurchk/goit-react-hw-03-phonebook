import PropTypes from "prop-types";
import React from "react";


const ContactItem = ({ personName, personNumber, id, onDeleteBtnClick }) => {
  return (
    <li>
      {personName}: {personNumber}
      <button onClick={() => onDeleteBtnClick(id)} type="button">Delete</button>
    </li>
  )
}

export { ContactItem };


ContactItem.propTypes = {
  onDeleteBtnClick: PropTypes.func,
  personName: PropTypes.string.isRequired,
  personNumber: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}