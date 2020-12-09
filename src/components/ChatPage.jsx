import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import Sidebar from './Sidebar';

import data, {fetchData} from '../api/jsonbin';

import Avatar from '../img/avatar.png';

const ChatPage = () => {

  const [ user, setUser ] = useState({
    id: '000',
    name: 'user',
    image: Avatar
  });

  const [ contacts, setContacts ] = useState([]);

  const [ conversations, setConversations ] = useState([]);

  const [ messages, setMessages ] = useState([]);

  const [ currentContact, setCurrentContact ] = useState({});

  useEffect(() => {
    //
    fetchData()
      .then(data => {
        const userAvatar = data.users[0].image ? data.users[0].image : Avatar
        const userData = {
          ...data.users[0],
          image: userAvatar
        }
        setUser(userData);

        const userConversations = data.conversations.filter(conversation => (
          conversation.u1id === userData.id || conversation.u2id === userData.id
        ));

        setConversations(userConversations);
    
        const userContacts = data.users.filter(contact => (
          userConversations.map(userConversation => contact.id == (userConversation.u1id === userData.id ? userConversation.u2id : userConversation.u1id)).includes(true)
        ));

        const formattedContacts = userContacts.map(contact => {
          const contactAvatar = contact.image ? contact.image : Avatar
          return ({
            ...contact,
            image: contactAvatar
          })
        });
    
        setContacts(formattedContacts);
    
        const userMessages = data.messages.filter(message => (
          userConversations.map(conversation => message.conversationId === conversation.id).includes(true)
        ))
    
        setMessages(userMessages);
      });
  }, [])
  
  const updateUserHandler = (updatedUser) => {
    setUser(updatedUser);
  }

  const openChatHandler = (contact) => {
    setCurrentContact(contact);
  }

  const sendMessageHandler = (message) => {
    setMessages(messages.concat(message))
  }

  return (
    <div className="chat-page">
      <Sidebar 
        user={user} 
        contacts={contacts} 
        messages={messages} 
        conversations={conversations} 
        updateUserHandler={updateUserHandler} 
        openChatHandler={openChatHandler} 
      />

      <ChatBox 
        user={user}
        contacts={contacts} 
        currentContact={currentContact} 
        conversations={conversations} 
        messages={messages}
        sendMessageHandler={sendMessageHandler}
      />
    </div>
  );
}

export default ChatPage;