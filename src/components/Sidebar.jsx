import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Components imports
import ChatList from './ChatList';
import EditProfile from './EditProfile';
// Bootstrap imports
import { Image, Button, Media } from 'react-bootstrap';
// React Icons imports
import { FaPowerOff } from 'react-icons/fa';

const Sidebar = (props) => {
  // ---- HOOKS ---- //
  const [ isEditProfile, setIsEditProfile ] = useState(false);

  // ---- FUNCTIONS ---- //
  const toggleEditProfile = () => {
    setIsEditProfile(prevIsEditProfile => !prevIsEditProfile);
  }

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <Media as="li" className="sidebar__user__icon" onClick={toggleEditProfile}>
          <Image
            width={64}
            height={64}
            className="mr-3"
            src={props.user.image}
            roundedCircle
          />
          <Media.Body>
            <h5>{props.user.name}</h5>
          </Media.Body>
        </Media>
        
        <Link to="/">
          <Button variant="danger">
            Logout <FaPowerOff />
          </Button>
        </Link>
      </div>

      <ChatList 
        contacts={props.contacts} 
        messages={props.messages} 
        conversations={props.conversations} 
        openChatHandler={props.openChatHandler}
      />
      <div className={isEditProfile ? 'edit-profile visible' : 'edit-profile'}>
        <EditProfile user={props.user} updateUserHandler={props.updateUserHandler} toggleEditProfile={toggleEditProfile} />
      </div>
    </div>
  );
}

export default Sidebar;