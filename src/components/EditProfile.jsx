import React, { useState, useRef, useEffect } from 'react';
// React Icons imports
import { Form, Image, Button } from 'react-bootstrap';
import { FaArrowLeft, FaPen } from 'react-icons/fa';
// File imports
import Avatar from '../img/avatar.png';

const EditProfile = (props) => {
  // ---- HOOKS ---- //
  const [ image, setImage ] = useState(props.user.image);

  const [ name, setName ] = useState(props.user.name);

  const hiddenFileInput = useRef(null);

  useEffect(() => {
    setName(props.user.name);
  }, [props.user])

  // ---- FUNCTIONS ---- //
  const changeImageHandler = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const pickImageHandler = () => {
    hiddenFileInput.current.click();
  }

  const updateHandler = (e) => {
    e.preventDefault();

    props.updateUserHandler({
      ...props.user,
      name: e.target.elements.username.value,
      image: e.target.elements.avatar.files[0] ? URL.createObjectURL(e.target.elements.avatar.files[0]) : Avatar
    });
  }

  const changeNameHandler = (e) => {
    setName(e.target.value);
  }

  return (
    <div>
      <div className="edit-profile__header">
        <button onClick={props.toggleEditProfile} className="btn btn--back"><FaArrowLeft /></button>
        <h5>Profile</h5>
      </div>
      <Form className="edit-profile__form" onSubmit={updateHandler}>
        <Form.Group>
          <Form.Control style={{display: 'none'}} type="file" name="avatar" ref={hiddenFileInput} onChange={changeImageHandler} />
          <div onClick={pickImageHandler} className="edit-profile__form__image">
            <Image
              width={200}
              height={200}
              className="mr-3"
              src={image}
              alt=""
              roundedCircle
            />
          </div>
          <Form.Control type="text" value={name} onChange={changeNameHandler} name="username" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update <FaPen />
        </Button>
      </Form>
    </div>
  );
}

export default EditProfile;