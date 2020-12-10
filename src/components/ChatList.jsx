import React from 'react';
// Components imports
import Chat from './Chat';

const ChatList = (props) => {
  let lastMessage;

  return (
    <div>
      { // get the last message and show it inside individual chat
      props.contacts.map(contact => {
        lastMessage = '';
        props.conversations.map(conversation => {
          if (conversation.u1id === contact.id || conversation.u2id === contact.id) {
            props.messages.map(message => {
              if (conversation.id === message.conversationId) {
                lastMessage = message.message;
              }
            })
          }
        })
        return (
          <div key={contact.id} onClick={() => props.openChatHandler(contact)}>
            <Chat contact={contact} lastMessage={lastMessage} />
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;