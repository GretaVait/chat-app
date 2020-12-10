import React, { useEffect, useState } from 'react';
// Components imports
import ChatBox from './ChatBox';
import Sidebar from './Sidebar';
import Loading from './Loading';
// Data imports
import fetchData from '../api/jsonbin';
// File imports
import Avatar from '../img/avatar.png';

const ChatPage = () => {
  // ---- HOOKS ---- //
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
    // fetch data and set states
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
          
        // filter contacts by convo id, if convo id matches user id it is our contact
        const userContacts = data.users.filter(contact => (
          userConversations.map(userConversation => contact.id == (userConversation.u1id === userData.id ? userConversation.u2id : userConversation.u1id)).includes(true)
        ));
        
        // set contacts image to Avatar if user image is null
        const formattedContacts = userContacts.map(contact => {
          const contactAvatar = contact.image ? contact.image : Avatar
          return ({
            ...contact,
            image: contactAvatar
          })
        });
    
        setContacts(formattedContacts);
        
        // set messages if message id matches convo id
        const userMessages = data.messages.filter(message => (
          userConversations.map(conversation => message.conversationId === conversation.id).includes(true)
        ))
    
        setMessages(userMessages);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])
  
  // ---- FUNCTIONS ---- //
  const updateUserHandler = (updatedUser) => {
    setUser(updatedUser);
  }

  const openChatHandler = (contact) => {
    setCurrentContact(contact);
    setOpenChat(true);
  }

  const closeChatHandler = () => {
    setOpenChat(false);
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