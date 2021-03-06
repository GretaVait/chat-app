import React from 'react';
// Bootstrap imports
import { Media, Image } from 'react-bootstrap';

const Chat = (props) => {

  return (
    <Media as="li" className={props.currentContact.id === props.contact.id ? 'contact visible' : 'contact'} >
      <Image
        width={64}
        height={64}
        className="mr-3"
        src={props.contact.image}
        alt=""
        roundedCircle
      />
      <Media.Body className="contact__content">
        <h5 className="contact__content__name">{props.contact.name}</h5>
        <p className="contact__content__faded">{props.lastMessage}</p>
      </Media.Body>
    </Media>
  );
}

export default Chat;