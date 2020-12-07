import React, { useState, useRef } from 'react';

const EditProfile = (props) => {
  const [ image, setImage ] = useState(props.user.image);
  const hiddenFileInput = useRef(null);

  const changeImageHandler = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const pickImageHandler = () => {
    hiddenFileInput.current.click();
  }

  const updateHandler = (e) => {
    e.preventDefault();

    props.updateUserHandler({
      name: e.target.elements.username.value,
      image: URL.createObjectURL(e.target.elements.avatar.files[0])
    });
  }

  return (
    <div>
      <button onClick={props.toggleEditProfile}>Hide Edit Profile</button>
      <form onSubmit={updateHandler}>
        <input style={{display: 'none'}} type="file" name="avatar" ref={hiddenFileInput} onChange={changeImageHandler} />
        <div onClick={pickImageHandler}>
          <img src={image} alt=""/>
        </div>
        <input type="text" defaultValue={props.user.name} name="username" />
        <button>Update</button>
      </form>
    </div>
  );
}

export default EditProfile;