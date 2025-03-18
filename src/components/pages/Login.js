import React, { useState } from 'react';
import { Button, Form, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa'; // Icons for username and password
import '../../Styles/login.css'; // Custom CSS for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setError('');

    const loginData = {
      username,
      password,
    };

    try {
      // const response = await fetch('https://example.com/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(loginData),
      // });

      const data = {
        "userId": 123,
        "username": "john_doe",
        "time": [
          { "id": 1, "slot": "Feb 1" },
          { "id": 2, "slot": "Feb 2" },
          { "id": 3, "slot": "Feb 3" }
        ],
        "token": "abc123xyz"
      };

      // if (response.ok) {
      //   console.log('Login response:', data);

      //   if (data.token) {
      //     localStorage.setItem('token', data.token);
      //   }

         navigate('/dashboard', { state: { userId: data.userId, username: data.username, time: data.time } });
      // } else {
      //   setError(data.message || 'Login failed. Please try again.');
      // }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Time Logging App</h2>
          <p className="text-center mb-4">Log in to track your time</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>
                <FaUser /> Username
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-4">
              <Form.Label>
                <FaLock /> Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;