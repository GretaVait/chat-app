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
        const userData = setUserData(data.users[0]);

        const userConversations = setConversationsData(data.conversations, userData);
          
        setContactsData(data.users, userConversations, userData);
        
        setMessagesData(data.messages, userConversations);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])
  
  // ---- FUNCTIONS ---- //
  const setUserData = (user) => {
    const userAvatar = user.image ? user.image : Avatar
    const userData = {
      ...user,
      image: userAvatar
    }
    setUser(userData);

    return userData;
  }

  const setConversationsData = (conversations, userData) => {
    const userConversations = conversations.filter(conversation => (
      conversation.u1id === userData.id || conversation.u2id === userData.id
    ));

    setConversations(userConversations);
    return userConversations;
  }
  
  const setContactsData = (users, userConversations, userData) => {
    // filter contacts by convo id, if convo id matches user id it is our contact
    const userContacts = users.filter(contact => (
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
  }

  const setMessagesData = (messages, userConversations) => {
    // set messages if message id matches convo id
    const userMessages = messages.filter(message => (
      userConversations.map(conversation => message.conversationId === conversation.id).includes(true)
    ))

    setMessages(userMessages);
  }

  //
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

  const addContactHandler = (contact) => {
    console.log(contact.id)
    fetchData()
      .then(data => {
        const updatedConversations = conversations.concat({
          id: Math.floor(Math.random() * Math.pow(10, 6)).toString(),
          u1id: user.id,
          u2id: contact.id
        })

        setConversations(updatedConversations);
          
        setContactsData(data.users, updatedConversations, user);
        
        setMessagesData(data.messages, updatedConversations);

        openChatHandler(contact);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="chat-page">
      {user.id ?
        <Sidebar 
          user={user} 
          contacts={contacts} 
          messages={messages} 
          conversations={conversations} 
          currentContact={currentContact} 
          updateUserHandler={updateUserHandler} 
          openChatHandler={openChatHandler}
          addContactHandler={addContactHandler}
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