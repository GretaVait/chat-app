import React, {useEffect, useState} from 'react';
import moment from 'moment';

import { Form, InputGroup, FormControl, Button, Image } from 'react-bootstrap';

import { FaPaperPlane } from 'react-icons/fa';

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
      {!Object.keys(props.currentContact).length && <p>Select a contact to send a message!</p>}
      {!!Object.keys(props.currentContact).length &&
        <div>
          <div className="chat-box__header">
            <Image
              width={64}
              height={64}
              src={props.currentContact.image}
              alt=""
              roundedCircle
            />
            <h5 className="chat-box__header__name">{props.currentContact.name}</h5>
          </div>
          <div className="chat-box__send">
            {displayedMessages.map(displayedMessage => (
            <div key={displayedMessage.id}>
              <p className={displayedMessage.senderId === props.user.id ? 'chat-box__message chat-box__message--sender' : 'chat-box__message chat-box__message--receiver'}>{displayedMessage.message}</p>
            </div>
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
                    <Button variant="primary" type="submit"><FaPaperPlane /></Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
        </div>
      }
    </div>
  );
}

export default ChatBox;