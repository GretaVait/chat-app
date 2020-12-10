import React, { useState, useEffect } from 'react';
import Loading from './Loading';
//
import { Modal, Button, Image } from 'react-bootstrap';
//
import fetchData from '../api/jsonbin';
// File imports
import Avatar from '../img/avatar.png';

const AddChatModal = (props) => {
  const [ otherContacts, setOtherContacts ] = useState([]);
  useEffect(() => {
    setOtherContacts([]);
    if (props.show) {
      fetchData()
        .then(data => {
          const otherContacts = data.users.filter(contact => (
            !props.conversations.map(userConversation => contact.id == (userConversation.u1id === props.user.id ? userConversation.u2id : userConversation.u1id)).includes(true)
          ));

          const filteredContacts = otherContacts.filter(contact => props.user.id != contact.id)

          const formattedContacts = filteredContacts.map(contact => {
            const contactAvatar = contact.image ? contact.image : Avatar
            return ({
              ...contact,
              image: contactAvatar
            })
          });
          setOtherContacts(formattedContacts);
        })
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
        )) : <Loading />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddChatModal;