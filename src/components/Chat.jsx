import React from 'react';

const Chat = (props) => {

  return (
    <div>
      <p>{props.contact.name}</p>
      <span>{props.lastMessage}</span>
    </div>
  );
}

export default Chat;