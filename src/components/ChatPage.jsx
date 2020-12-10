import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import Sidebar from './Sidebar';
import Loading from './Loading';

import fetchData from '../api/jsonbin';

import Avatar from '../img/avatar.png';

const ChatPage = () => {

  const [ user, setUser ] = useState({
    id: null,
    name: 'user',
    image: Avatar
  });

  const [ contacts, setContacts ] = useState([]);

  const [ conversations, setConversations ] = useState([]);

  const [ messages, setMessages ] = useState([]);

  const [ currentContact, setCurrentContact ] = useState({});

  const [ openChat, setOpenChat ] = useState(false);

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
    setOpenChat(true);
  }

  const closeChatHandler = () => {
    setOpenChat(false);
    console.log(currentContact);
  }

  const sendMessageHandler = (message) => {
    setMessages(messages.concat(message));
  }

  const deleteMessageHandler = (messageId) => {
    const updatedMessages = messages.filter(message => message.id != messageId)
    setMessages(updatedMessages);
  }

  return (
    <div className="chat-page">
      {user.id ?
        <Sidebar 
          user={user} 
          contacts={contacts} 
          messages={messages} 
          conversations={conversations} 
          updateUserHandler={updateUserHandler} 
          openChatHandler={openChatHandler} 
        />
      : <Loading />}

      <ChatBox 
        user={user}
        contacts={contacts} 
        currentContact={currentContact} 
        conversations={conversations} 
        messages={messages}
        openChat={openChat}
        sendMessageHandler={sendMessageHandler}
        closeChatHandler={closeChatHandler}
        deleteMessageHandler={deleteMessageHandler}
      />
    </div>
  );
}

export default ChatPage;