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

  const [ conversations, setConversations ] = useState([]);

  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    const userConversations = data.conversations.filter(conversation => (
      conversation.u1id === user.id || conversation.u2id === user.id
    ));

    setConversations(userConversations);

    const userContacts = data.users.filter(contact => (
      userConversations.map(userConversation => contact.id == (userConversation.u1id === user.id ? userConversation.u2id : userConversation.u1id)).includes(true)
    ));

    setContacts(userContacts);

    const userMessages = data.messages.filter(message => (
      userConversations.map(conversation => message.conversationId === conversation.id).includes(true)
    ))

    console.log(userConversations);
    console.log(userContacts);
    console.log(userMessages);
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