import React, {useEffect, useState} from 'react';
import moment from 'moment';

import { Form, InputGroup, FormControl, Button, Image } from 'react-bootstrap';

import { FaPaperPlane, FaArrowLeft } from 'react-icons/fa';

import Illustration from '../img/illustration.svg';

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
    <div className={!!Object.keys(props.currentContact).length ? 'chat-box visible' : 'chat-box'}>
      {!Object.keys(props.currentContact).length && 
        <div className="chat-box__inactive">
          <img src={Illustration} alt="Illustration" />
          <h3>Select a contact to start a conversation</h3>
        </div>
      }
      {!!Object.keys(props.currentContact).length &&
        <div>
          <div className="chat-box__header">
            <FaArrowLeft className="chat-box__header__back" />
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
              <p className={displayedMessage.senderId === props.user.id ? 'chat-box__message chat-box__message--sender' : 'chat-box__message chat-box__message--receiver'}>{displayedMessage.message}
              <span className="time">{displayedMessage.time}</span>
              </p>
            </div>
            ))}

            <Form onSubmit={sendMessageHandler}>
              <Form.Group>
                <InputGroup className="mb-3">
                  <FormControl
                    className="chat-box__send__text"
                    as="textarea"
                    name="message"
                    required
                  />
                  <InputGroup.Append>
                    <Button variant="primary" type="submit" className="chat-box__send__btn"><FaPaperPlane /></Button>
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