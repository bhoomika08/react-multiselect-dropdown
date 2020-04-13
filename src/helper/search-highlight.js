import React from 'react';

const SearchHighlight = (text, highlightText) => {
  const nameParts = text.split(new RegExp(`(${highlightText})`, 'gi'));
  return (
    <span>
      {nameParts.map((part, index) => part.toLowerCase() === highlightText.toLowerCase() ? <b className="blue" key={index}>{part}</b> : part)}
    </span>
  )
}

export default SearchHighlight;