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
    <div className="container mx-auto d-block">
      <Card
        className="bg-dark text-white text-center"
        style={{ width: "1000px", height: "700px" }}
      >
        <Card.Title className="text-center">Login </Card.Title>
        <Card.Img
          className="mb-5"
          src={loginImg}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <Form onSubmit={handleFormSubmit} className="w-100">
          <Form.Group controlId="email" className="mb-5 mx-auto">
            <Form.Label>Email address</Form.Label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-5 mx-auto">
            <Form.Label>Password</Form.Label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              id="pwd"
              onChange={handleChange}
            />
            {error ? (
              <p className="error-text">Incorrect email or password</p>
            ) : null}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
