import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
// Bootstrap imports
import { Form, InputGroup, FormControl, Button, Image, Dropdown, DropdownButton } from 'react-bootstrap';
// React Icons imports
import { FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";
// File imports
import Illustration from '../img/illustration.svg';

const ChatBox = (props) => {
  let filteredMessagesArray = [];
  // ---- HOOKS ---- //
  const [ currentConversationId, setCurrentConversationId ] = useState('');

  const [ displayedMessages, setDisplayedMessages ] = useState([]);
  
  const scrollPoint = useRef();

  useEffect(() => {
    // get current convo id and store it to the state
    props.conversations.map(conversation => {
      if (conversation.u1id === props.currentContact.id || conversation.u2id === props.currentContact.id) {
        // by convo id filter messages
        filteredMessagesArray = props.messages.filter(message => conversation.id === message.conversationId )
        setCurrentConversationId(conversation.id);
      }
    })
    // filterd messages store it to the state
    setDisplayedMessages(filteredMessagesArray);
  }, [props.currentContact, props.messages]);

  useEffect(() => {
    // when displayedMessages state changes scroll down to the scroll point ref
    scrollPoint.current && scrollPoint.current.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages])
  
  // ---- FUNCTIONS ---- //
  // append new send messages
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

  const closeChatHandler = () => {
    props.closeChatHandler();
  }

  const deleteMessageHandler = (messageId) => {
    props.deleteMessageHandler(messageId);
  }

  return (
    <div className={props.openChat ? 'chat-box visible' : 'chat-box'}>
      {!props.openChat && 
        <div className="chat-box__inactive">
          <img src={Illustration} alt="Illustration" />
          <h3>Select a contact to start a conversation</h3>
        </div>
      }
      {!!Object.keys(props.currentContact).length &&
        <div>
          <div className="chat-box__header">
            <button className="btn" onClick={closeChatHandler}>
              <FaArrowLeft className="chat-box__header__back" />
            </button>
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
            <div className="chat-box__send__messages">
              {displayedMessages.map(displayedMessage => (
              <div key={displayedMessage.id}>
                <div className={
                  displayedMessage.senderId === props.user.id ? 
                    'message message--sender' 
                  : 'message message--receiver'
                  }>
                  <p>{displayedMessage.message}</p>
                  <DropdownButton title={<BsThreeDotsVertical />} className="message__aside">
                    <Dropdown.Item onClick={() => deleteMessageHandler(displayedMessage.id)}>Remove</Dropdown.Item>
                  </DropdownButton>
                  <span className="time">{moment(displayedMessage.time).format('HH:mm')}</span>
                </div>
              </div>
              ))}
            <div ref={scrollPoint} style={{ float: 'right', clear: 'both' }}></div>
            </div>

            <Form onSubmit={sendMessageHandler} className="chat-box__send__form">
              <Form.Group>
                <InputGroup className="mb-3">
                  <FormControl
                    className="form__message-input"
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