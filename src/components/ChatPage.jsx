import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import Sidebar from './Sidebar';

const ChatPage = () => {
  const [ user, setUser ] = useState({
    name: 'Burbuliukas',
    image: null
  });

  const updateUser = (updatedUser) => {
    console.log(user)
    setUser(updatedUser);
    console.log(user)
  }

  return (
    <div>
      <Sidebar user={user} updateUser={updateUser} />
      <ChatBox user={user} />
    </div>
  );
}

export default ChatPage;