import React from 'react';
import DropdownItems from './dropdown-user';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUsers: [],
    }
    this.getCheckedUsers = this.getCheckedUsers.bind(this);
  }

  getCheckedUsers = event => {
    event.stopPropagation()
    let newSelectedUsers = this.state.checkedUsers;
    let isChecked = event.target.checked;
    let userId = parseInt(event.target.value);
    this.setState({
      checkedUsers: isChecked ? newSelectedUsers.concat(userId) : this.state.checkedUsers.filter(user => user != userId),
    });
  }

  render() {
    return (
       <div className="dropdown-container">
        <div className="multiselect-dropdown scroll">
          {this.props.dropDownUsersList.map(user =>
            <DropdownItems key={user.id}
              optionId={user.id}
              optionLabel={user.label}
              onClick={this.getCheckedUsers}
            />
          )}
        </div>
        <div className="button submit-btn" onClick={() => this.props.submitClick(this.state.checkedUsers)}>
          <span className="bold">Submit</span>
          <span className="ml-50 bold">Checked Items: {this.state.checkedUsers.length}</span>
        </div>
      </div>
    )
  }
}

export default Dropdown;