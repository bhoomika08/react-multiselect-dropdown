import React from 'react';
import DELETE_ICON from '../assets/images/delete-icon.png';
import '../styles/selected-users.css';

const SelectedUsers = ({ users, selectedUsers, deleteUser, deleteAllUsers}) => {
  return (
    <table className="table-view">
      <tbody>
        <tr className="column-header">
          <td>Name</td>
          <td>Email</td>
          <td>Website</td>
          <td className="align-center"><div className="button btn-border" onClick={deleteAllUsers}>Delete All Users</div></td>
        </tr>
        {selectedUsers.map(user => (
          <tr key={user} className="listElement">
            <td>{users[user].username}</td>
            <td>{users[user].email}</td>
            <td>{users[user].website}</td>
            <td className="align-center"><img src={DELETE_ICON} alt="delete" className="icon-delete" onClick={(event) => deleteUser(event, user)}></img></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SelectedUsers;