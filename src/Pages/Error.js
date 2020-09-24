import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

export default class Error extends Component {
  render() {
    return (
      <div className="error-page">
        <Container>
          <div className="overlay"></div>
          <h1>404</h1>
          <p>Oops, The page you're looking for doesn't exist.</p>
          <Link className="bttn btn-glow" to="/">Back to Home</Link>
        </Container>
      </div>
    );
  }
}
