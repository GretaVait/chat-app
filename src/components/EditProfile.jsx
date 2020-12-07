import React from 'react';

const EditProfile = (props) => {
  const changeName = () => {
    props.user.name = 'Taduliukas';
    console.log(props.user);
    props.updateUser(props.user);
  }

  return (
    <div>
      <button onClick={props.toggleEditProfile}>Hide Edit Profile</button>
      <input type="image" />
      <input type="text" value={props.user.name} />
      <button onClick={changeName}>Pakeisk varda</button>
    </div>
  );
}

export default EditProfile;