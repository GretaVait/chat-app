import React from 'react';
import { Media, Image } from 'react-bootstrap';

const Chat = (props) => {

  return (
    <div>
      <Media as="li">
        <Image
          width={64}
          height={64}
          className="mr-3"
          src={props.contact.image}
          alt=""
          roundedCircle
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