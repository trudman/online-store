import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button } from "react-bootstrap";
import signupImg from "./imgs/signup.jpg";

function Signup() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password, firstName, lastName } = formState;
    const mutationResponse = await addUser({
      variables: { email, password, firstName, lastName },
    });
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

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 mt-5 mx-auto">
      <Card className=" bg-dark text-white text-center mt-5 mx-auto" >
        <Card.Title className="text-center ">Sign Up </Card.Title>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card.Img
            src={signupImg}
            style={{ width: "100%", height: "500px" , objectFit: "cover"}}
          />
        </div>
        <Form onSubmit={handleFormSubmit} className="w-100 mb-5">
          <Form.Group controlId="firstName" className="mb-6 mx-auto">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              placeholder="First Name.."
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="mb-5 mx-auto ">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              placeholder="Last Name..."
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email" className=" mx-auto">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              placeholder="Email..."
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="password" className=" mx-auto">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password..."
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
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

export default Signup;
