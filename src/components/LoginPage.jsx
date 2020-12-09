import React from 'react';
import { useHistory } from 'react-router-dom';
//
import { Container, Form, Button } from 'react-bootstrap';


const LoginPage = () => {
  const history = useHistory();

  const startLogin = (e) => {
    e.preventDefault();
    history.push('/chat');
  }
  return (
    <Container className="flex-column align-items-center justify-content-center d-flex" style={{ height: '100vh', width: '100vw' }}>
      <div className="login">
        <h1 className="login__title">Login</h1>
        <Form onSubmit={startLogin}>
          <Form.Group>
            <Form.Label>Enter Your Email</Form.Label>
            <Form.Control type="email" id="email" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Your Password</Form.Label>
            <Form.Control type="password" id="password" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;