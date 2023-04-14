import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button } from "react-bootstrap";
import loginImg from "./imgs/loginImg.jpg";

function Login() {
  const [formState, setFormState] = useState({ email: "", pasword: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formState;
    try {
      const token = (await login({ variables: { email, password } })).data.login
        .token;
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
  <div className="d-flex justify-content-center align-items-center  vh-100 mt-5 mx-auto">       
      <Card  className="bg-dark text-white text-center mt-5 mx-auto">
      <Card.Title className="text-center">Login </Card.Title>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Card.Img
            src={loginImg}
            style={{ width: "100%", height: "500px" , objectFit: "cover" }}
          />
           </div>
        <Form onSubmit={handleFormSubmit} className="w-100 mb-5 mt-3">
          <Form.Group controlId="email" className="mb-4 mx-auto mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email..."
              name="email"
              id="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-5 mx-auto mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password..."
              name="password"
              id="pwd"
              onChange={handleChange}
            />
            {error ? (
              <p className="error-text">Incorrect email or password</p>
            ) : null}
          </Form.Group>
          <div className="d-flex justify-content-center mt-3">
          <Button variant="primary" type="submit">
            Submit
          </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;