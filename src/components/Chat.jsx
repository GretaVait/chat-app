import React from 'react';
import { Media } from 'react-bootstrap';

const Chat = (props) => {

  return (
    <div>
      <Media as="li">
        <img
          width={64}
          height={64}
          className="mr-3"
          src={props.contact.image}
          alt="Generic placeholder"
        />
        <Media.Body>
          <h5>{props.contact.name}</h5>
          <p>{props.lastMessage}</p>
        </Media.Body>
      </Media>
    </div>
  );
}

export default Chat;