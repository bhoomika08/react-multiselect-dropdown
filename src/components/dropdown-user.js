import React from 'react';

const DropdownUser = React.memo(({id, username, onClick}) => {
  return (
    <div className="dropdown-option">
      <input type="checkbox" id={id} value={id} onClick={onClick}></input>
      <label htmlFor={id}>{username}</label>
    </div>
  )
});

export default DropdownUser;