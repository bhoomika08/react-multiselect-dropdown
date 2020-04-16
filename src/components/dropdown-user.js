import React from 'react';

const DropdownUser = React.memo(({optionId, optionLabel, onClick}) => {
  return (
    <div className="dropdown-option">
      <input type="checkbox" id={optionId} value={optionId} onClick={onClick}></input>
      <label htmlFor={optionId}>{optionLabel}</label>
    </div>
  )
});

export default DropdownUser;