import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
const [formState, setFormState]= useState ({email:'', pasword:''});
const [login, { error }] = useMutation(LOGIN);

const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formState;
    try {
      const token = (await login({ variables: { email, password } })).data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="Email..."
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="Password.."
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p>The login information entered is invalid.</p>
          </div>
        ) : null}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
