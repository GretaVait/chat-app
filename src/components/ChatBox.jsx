import React, {useEffect, useState} from 'react';
import moment from 'moment';

import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const ChatBox = (props) => {
  let filteredMessagesArray = [];
  const [ currentConversationId, setCurrentConversationId ] = useState('');
  const [ displayedMessages, setDisplayedMessages ] = useState([]);

  useEffect(() => {
    props.conversations.map(conversation => {
      if (conversation.u1id === props.currentContact.id || conversation.u2id === props.currentContact.id) {
        filteredMessagesArray = props.messages.filter(message => conversation.id === message.conversationId )
        setCurrentConversationId(conversation.id);
      }
    })
    setDisplayedMessages(filteredMessagesArray);
  }, [props.currentContact, props.messages]);
  
  const sendMessageHandler = (e) => {  
    e.preventDefault();
    props.sendMessageHandler({
      id: Math.floor(Math.random() * Math.pow(10, 6)).toString(),
      conversationId: currentConversationId,
      senderId: props.user.id,
      message: e.target.elements.message.value,
      time: moment().format()
    });
    e.target.elements.message.value = '';
  }
  return (
    <div className="chat-box">
      {!!Object.keys(props.currentContact).length &&
        <div>
          {displayedMessages.map(displayedMessage => (
            <p key={displayedMessage.id}>{displayedMessage.message}</p>
          ))}

          <Form onSubmit={sendMessageHandler}>
            <Form.Group>
              <InputGroup className="mb-3">
                <FormControl
                  as="textarea"
                  name="message"
                  required
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary" type="submit">Send</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form>
        
        </div>
      }
    </div>
  );
}

export default ChatBox;