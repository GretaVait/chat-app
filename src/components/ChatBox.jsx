import React from 'react';

const ChatBox = (props) => {
  return (
    <div>
      <p>My name is: {props.user.name}</p>
      <img src={props.user.image} alt=""/>
    </div>
  );
}

export default ChatBox;