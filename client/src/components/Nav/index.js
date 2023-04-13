import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  function handleLogout() {
    Auth.logout();
  }

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav">
              {Auth.loggedIn() ? (
                <>
                  <li className="nav-item mr-3">
                    <Link className="nav-link" to="/orderHistory">
                      Order History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-primary my-2 my-sm-0"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Welcome to the Junk Store!</h1>
          <p className="lead">
            We sell all kinds of weird and wonderful things - from vintage
            electronics to antique furniture. Come browse our collection today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Nav;
