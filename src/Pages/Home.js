import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MainHeader from "../Components/MainHeader";
import ListMovies from "../Components/ListMovies";

export default class Home extends Component {
  render() {
    return (
      <div>
        <MainHeader />
        <Container fluid>
          <ListMovies
            moviesToList={this.props.moviesList}
            dataIcon={this.props.listIcon}
            dataMovie={this.props.handlList}
          />
        </Container>
      </div>
    );
  }
}
