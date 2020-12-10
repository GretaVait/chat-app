import React, { useState, useEffect } from 'react';
// Bootstrap imports
import { Modal, Button, Image } from 'react-bootstrap';
// File imports
import Avatar from '../img/avatar.png';

const AddChatModal = (props) => {
  // ---- HOOKS ---- //
  const [ otherContacts, setOtherContacts ] = useState([]);

  useEffect(() => {
    if (props.show) {
      // filter users that does not belong to our contact list ( including our user )
      const otherContacts = props.allUsers.filter(contact => (
        !props.conversations.map(userConversation => contact.id == (userConversation.u1id === props.user.id ? userConversation.u2id : userConversation.u1id)).includes(true)
      ));
      // filter users without our user
      const filteredContacts = otherContacts.filter(contact => props.user.id != contact.id)
      // set contacts image to Avatar if user image is null
      const formattedContacts = filteredContacts.map(contact => {
        const contactAvatar = contact.image ? contact.image : Avatar
        return ({
          ...contact,
          image: contactAvatar
        })
      });
      setOtherContacts(formattedContacts);
    }
  }, [props.show])

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Contacts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!otherContacts.length ?
        otherContacts.map(contact => (
          <div key={contact.id} onClick={() => {props.addContactHandler(contact); props.onHide()}} className="modal-contact">
            <Image
              width={64}
              height={64}
              className="mr-3"
              src={contact.image}
              alt=""
              roundedCircle
            />
            <h5>{contact.name}</h5>
          </div>
        )) : "No Contacts!"}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddChatModal;