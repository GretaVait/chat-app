import React, {useEffect, useState} from 'react';

const ChatBox = (props) => {
  let filteredMessagesArray = [];
  const [ displayedMessages, setDisplayedMessages ] = useState([]);
  useEffect(() => {

    props.conversations.map(conversation => {
      if (conversation.u1id === props.currentContact.id || conversation.u2id === props.currentContact.id) {
        filteredMessagesArray = props.messages.filter(message => conversation.id === message.conversationId )
      }
    })
    setDisplayedMessages(filteredMessagesArray);
  }, [props.currentContact]);

  return (
    <div>
      {displayedMessages.map(displayedMessage => (
        <p key={displayedMessage.id}>{displayedMessage.message}</p>
      ))}
    </div>
  );
}

export default ChatBox;