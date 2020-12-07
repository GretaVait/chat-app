import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import Sidebar from './Sidebar';

import data from '../api/jsonbin';

import Avatar from '../img/avatar.png';

const ChatPage = () => {
  const img = data.users[0].img ? data.users[0].img : Avatar;

  const [ user, setUser ] = useState({
    id: data.users[0].id,
    name: data.users[0].name,
    image: img
  });

  const [ contacts, setContacts ] = useState([]);

  useEffect(() => {
    const contactsData = data.contacts.filter(contact => (
      contact.u1id == user.id || contact.u2id == user.id
    ));
    
    const userContactIDs = contactsData.map(contact => (
      contact.u1id == user.id ? contact.u2id : contact.u1id
    ));

    const userContacts = data.users.filter(user => (
      userContactIDs.map(userContactID => user.id == userContactID).includes(true)
    ));
    console.log(userContacts);

    setContacts(userContacts);
  }, [])

  
  const updateUserHandler = (updatedUser) => {
    setUser(updatedUser);
  }

  return (
    <div>
      <Sidebar user={user} contacts={contacts} updateUserHandler={updateUserHandler} />
      <ChatBox user={user} />
    </div>
  );
}

export default ChatPage;