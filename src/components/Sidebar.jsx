import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatList from './ChatList';
import EditProfile from './EditProfile';


const Sidebar = (props) => {

  const [ isEditProfile, setIsEditProfile ] = useState(false);

  const toggleEditProfile = () => {
    setIsEditProfile(prevIsEditProfile => !prevIsEditProfile);
  }

  return (
    <div>
      <button onClick={toggleEditProfile}>Edit Profile</button>
      <Link to="/">
        <button>Log Out</button>
      </Link>
      <ChatList />
      { isEditProfile && <EditProfile user={props.user} updateUserHandler={props.updateUserHandler} toggleEditProfile={toggleEditProfile} /> }
    </div>
  );
}

export default Sidebar;