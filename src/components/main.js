import React from 'react';
import axios from '../services/axios';
import SelectedUsers from './selected-users';
import Dropdown from './dropdown';
import APP_CONSTANTS from '../constants/app-constants';
import TransformDropdownItems from '../helper/transform-dropdown-items';
import '../styles/dropdown.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      users: [],
      selectedUsers: [],
      searchValue: '',
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.deleteAllUsers = this.deleteAllUsers.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {

    //---------- Should use Interceptors (Create an axios service which will return the transformed response)-------------------//

    axios.get(APP_CONSTANTS.dataFileUrl)
      .then(response => {
        const data = {}
        let data2 = []
        for (let i = 0; i < 500; i++) {
          const refData = response.data.map(ele => ({
            ...ele, id: `${ele.id}-${i}`
          }))
          data2 = [...data2, ...refData]
        }
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
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  }

  searchUser = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  }

  deleteUser = userId => {
    this.setState({
      selectedUsers: this.state.selectedUsers.filter(user => user != userId),
    });
  }

  deleteAllUsers() {
    this.setState({
      selectedUsers: [],
    })
  }

  submitHandler(checkedUsers) {
    const { selectedUsers } = this.state;
    this.setState({
      isDropdownOpen: false,
      selectedUsers: [...selectedUsers, ...checkedUsers],
      searchValue: '',
    });
  }

  closeDropdownOutsideClick = () => {
    this.setState({
      isDropdownOpen: false,
    });
  }

  render() {
    const { users, searchValue, selectedUsers, isDropdownOpen } = this.state;
    const dropDownUsersList = TransformDropdownItems(searchValue, selectedUsers, users);
    return (
      <div className="pd-40">
        <div className="d-flex users-detail-container">
          <input type="text" className="search" placeholder="Search user" value={searchValue} onChange={this.searchUser} onClick={this.toggleDropdown}></input>
          {isDropdownOpen &&
            <>
              <div className="dropdown-close-overlay"
                onClick={this.closeDropdownOutsideClick}>
              </div>
              <Dropdown
                dropDownUsersList={dropDownUsersList}
                submitClick={this.submitHandler}
              />
            </>
          }
        </div>
        {selectedUsers.length > 0 &&
          <SelectedUsers
            users={users}
            selectedUsers={selectedUsers}
            deleteUser={this.deleteUser}
            deleteAllUsers={this.deleteAllUsers}
          />
        }
      </div>
    )
  }
}

export default Main;