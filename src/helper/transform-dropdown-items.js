import SearchHighlight from './search-highlight';

const TransformDropdownItems = ( searchedText, removedItems, AllItems ) => {
  let updatedList = [];
  for(const item of Object.values(AllItems)) {
    if(!removedItems.includes(item.id)) {
      if(item.username.toLowerCase().search(searchedText.toLowerCase()) != -1) {
        let modifiedUsername = SearchHighlight(item.username, searchedText);
        updatedList.push({id: item.id, label: modifiedUsername})
      }
    }
  }
  return updatedList;
}

export default TransformDropdownItems;