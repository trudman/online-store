import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../../utils/auth';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <h2>Online Store</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/profile'>
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Signup</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title id='signup-modal'>
            <Tab.Container defaultActiveKey='login'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Signup</Nav.Link>
                </Nav.Item>
              </Nav>
            </Tab.Container>
          </Modal.Title>
        </Modal.Header>

        <Tab.Content>
          <Tab.Pane eventKey='login'>
            <LoginForm handleModalClose={() => setShowModal(false)} />
          </Tab.Pane>
          <Tab.Pane eventKey='signup'>
            <SignUpForm handleModalClose={() => setShowModal(false)} />
          </Tab.Pane>
        </Tab.Content>
      </Modal>
    </>
  );
}

export default AppNavbar;