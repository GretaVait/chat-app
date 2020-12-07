import React from 'react';
import Chat from './Chat';

const ChatList = (props) => {
  return (
    <div>
      Chat List:
      {props.contacts.map((contact, index) => (
        <Chat key={index} contact={contact} />
      ))}
    </div>
  );
}

export default ChatList;