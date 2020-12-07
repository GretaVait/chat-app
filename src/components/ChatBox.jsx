import React from 'react';

const ChatBox = (props) => {
  return (
    <div>
      <p>My name is: {props.user.name}</p>
    </div>
  );
}

export default ChatBox;