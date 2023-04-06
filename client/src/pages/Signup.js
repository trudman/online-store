import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);
  
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { email, password, firstName, lastName } = formState;
        const mutationResponse = await addUser({ variables: { email, password, firstName, lastName } });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };
 };