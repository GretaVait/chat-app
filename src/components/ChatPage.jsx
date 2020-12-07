import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import Sidebar from './Sidebar';

import Avatar from '../img/avatar.png';

const ChatPage = () => {
  const [ user, setUser ] = useState({
    name: 'user',
    image: Avatar
  });

  
  const updateUserHandler = (updatedUser) => {
    setUser(updatedUser);
  }

  return (
    <div>
      <Sidebar user={user} updateUserHandler={updateUserHandler} />
      <ChatBox user={user} />
    </div>
  );
}

export default ChatPage;