import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
const [formState, setFormState]= useState ({email:'', pasword})
const [login, { error }] = useMutation(LOGIN);

const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = response.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };
}

export default Login;
