import React from 'react';
import { useHistory } from 'react-router-dom';


const LoginPage = () => {
  const history = useHistory();

  const startLogin = (e) => {
    e.preventDefault();
    history.push('/chat');
  }
  return (
    <div>
      <form onSubmit={startLogin}>
        <label htmlFor="email">Enter Your Email</label>
        <input type="email" required id="email" />
        <label htmlFor="">Enter Your Password</label>
        <input type="password" required />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;