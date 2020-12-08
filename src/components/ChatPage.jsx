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

  const [ currentContact, setCurrentContact ] = useState({});

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

    setMessages(userMessages);
  }, [])

  
  const updateUserHandler = (updatedUser) => {
    setUser(updatedUser);
  }

  const openChatHandler = (contact) => {
    setCurrentContact(contact);
  }

  return (
    <div>
      <Sidebar 
        user={user} 
        contacts={contacts} 
        messages={messages} 
        conversations={conversations} 
        updateUserHandler={updateUserHandler} 
        openChatHandler={openChatHandler} 
      />
      <ChatBox user={user} currentContact={currentContact} conversations={conversations} messages={messages} />
    </div>
  );
}

export default ChatPage;