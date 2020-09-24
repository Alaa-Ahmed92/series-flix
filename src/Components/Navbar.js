import React, { Component } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";

class NavbarContent extends Component {
  render() {
    const { listOfMovie } = this.props;
    return (
      <div>
        <Navbar expand="lg" fixed="top">
          <Container fluid>
            <NavLink className="navbar-brand" to="/">
              Series Flix
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/series"
                >
                  Series
                </NavLink>
                <NavDropdown
                  title={`Favourites [${listOfMovie.length}]`}
                  id="basic-nav-dropdown"
                >
                  {listOfMovie.map((movie) => {
                    return (
                      <Link
                        key={movie.id}
                        className="dropdown-item"
                        to={"/series/" + movie.id}
                      >
                        {movie.name}
                      </Link>
                    );
                  })}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavbarContent);
