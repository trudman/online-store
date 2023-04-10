import React from "react";


const Jumbotron = ({ children }) => (
  <div
    style={{ height: 600, clear: 'both', paddingTop: 100, textAlign: 'center' }}
  >
    {children}
  </div>
);

export default Jumbotron;
