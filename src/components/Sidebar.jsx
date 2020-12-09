import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatList from './ChatList';
import EditProfile from './EditProfile';

import { Image } from 'react-bootstrap';

const Sidebar = (props) => {

  const [ isEditProfile, setIsEditProfile ] = useState(false);

  const toggleEditProfile = () => {
    setIsEditProfile(prevIsEditProfile => !prevIsEditProfile);
  }

  return (
    <div className="sidebar">
      <div>
        <button onClick={toggleEditProfile}>
          <Image
            width={64}
            height={64}
            className="mr-3"
            src={props.user.image}
            roundedCircle
          />
        </button>
        
        <Link to="/">
          <button>Log Out</button>
        </Link>
      </div>

      <ChatList 
        contacts={props.contacts} 
        messages={props.messages} 
        conversations={props.conversations} 
        openChatHandler={props.openChatHandler}
      />
      { isEditProfile && <EditProfile user={props.user} updateUserHandler={props.updateUserHandler} toggleEditProfile={toggleEditProfile} /> }
    </div>
  );
}

export default Sidebar;