import React from 'react';
import axios from 'axios';
import SearchHighlight from '../helper/search-highlight';
import DropdownUser from './dropdown-user';
import SelectedUsers from './selected-users';
import '../styles/dropdown.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownVisible: false,
      users: [],
      checkedUsers: [],
      searchedList: [],
      selectedUsers: [],
      searchValue: '',
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.deleteAllUsers = this.deleteAllUsers.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    axios.get('/assets/users_data.json')
      .then(response => {
        const data = {}
        for (const record of response.data) {
          data[record.id] = record;
        }
        this.setState({
          users: data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  toggleDropdown() {
    this.setState(prevState => ({
      isDropdownVisible: !prevState.isDropdownVisible,
      checkedUsers: [],
    }));
  }

  getCheckedUsers = event => {
    let newSelectedUsers = this.state.checkedUsers;
    let isChecked = event.target.checked;
    let userId = parseInt(event.target.value);
    this.setState({
      checkedUsers: isChecked ? newSelectedUsers.concat(userId) : this.state.checkedUsers.filter(user => user !== userId),
    });
  }

  searchUser = (event) => {
    this.setState({
      isDropdownVisible: true,
      searchValue: event.target.value,
    });
  }

  deleteUser = (event, userId) => {
    this.setState({
      selectedUsers: this.state.selectedUsers.filter(user => user !== userId),
    });
  }

  deleteAllUsers() {
    this.setState({
      selectedUsers: [],
    })
  }

  submitHandler() {
    const { selectedUsers, checkedUsers } = this.state;
    this.setState({
      isDropdownVisible: checkedUsers.length > 0 ? false : true,
      isSubmitted: true,
      selectedUsers: [...selectedUsers, ...checkedUsers],
      checkedUsers: [],
      searchValue: '',
    });
  }

  transformDropdownUsers = () => {
    const { searchValue, selectedUsers, users } = this.state;
    let updatedList = Object.values(users).filter(user => !selectedUsers.includes(user.id));
    if (searchValue) {
      updatedList = updatedList.filter(user => user.username.toLowerCase().search(searchValue.toLowerCase()) !== -1);
      updatedList = updatedList.map(user => {
        let modifiedUsername = SearchHighlight(user.username, searchValue);
        return { ...user, username: modifiedUsername };
      });
    }
    return updatedList;
  }

  closeDropdownOutsideClick = (event) => {
    const { checkedUsers } = this.state;
    if (event.target.contains(this.dropdown)) {
      this.setState({
        isDropdownVisible: checkedUsers.length > 0 ? true : false,
        checkedUsers: checkedUsers.length > 0 ? checkedUsers : [],
      });
    }
  }

  render() {
    const { users, searchValue, selectedUsers, checkedUsers, isDropdownVisible, isSubmitted } = this.state;
    let dropDownUsersList = this.transformDropdownUsers();
    return (
      <div className={isDropdownVisible ? "overlay" : ''} onClick={this.closeDropdownOutsideClick}>
        <div className="d-flex users-detail-container mtop-30">
          <div className="search-container">
            <input type="text" className="search" placeholder="Search user" value={searchValue} onChange={this.searchUser} onClick={this.toggleDropdown}></input>
            {isDropdownVisible &&
              <div className="dropdown-container" ref={node => { this.dropdown = node; }}>
                <div className="multiselect-dropdown scroll">
                  {dropDownUsersList.map(user =>
                    <DropdownUser key={user.id}
                      id={user.id}
                      username={user.username}
                      onClick={this.getCheckedUsers}
                    />
                  )}
                </div>
                <div className="button" onClick={this.submitHandler}>Submit {checkedUsers.length}</div>
              </div>
            }
          </div>
          {selectedUsers.length > 0 && isSubmitted &&
            <SelectedUsers
              users={users}
              selectedUsers={selectedUsers}
              deleteUser={(event, user) => this.deleteUser(event, user)}
              deleteAllUsers={this.deleteAllUsers}
            />
          }
        </div>
      </div>
    )
  }
}

export default Dropdown;