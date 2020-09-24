import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import axios from "axios";
import Parser from "html-react-parser";
import Banner from "../Components/Banner";
import VideoPlayer from "../Components/VideoPlayer";

class SingleMovie extends Component {
  state = {
    movie: {},
  };

  componentDidUpdate(nextProps) {
    window.scrollTo(0, 0);
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.getData(nextProps.match.params.id);
    }
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    let movieId = this.props.match.params.id;
    axios
      .get("http://api.tvmaze.com/shows/" + movieId + "?embed=cast")
      .then((res) => {
        this.setState({
          movie: res.data,
        });
      });
  };

  render() {
    return (
      <div>
        <Banner banner="head-subpage">
          <div className="overlay"></div>
          <h2 className="movie-name">{this.state.movie.name}</h2>
          <span className="movie-genres">
            {this.state.movie.genres ? this.state.movie.genres.join(" , ") : ""}
          </span>
        </Banner>
        <Container>
          <div className="box-movie">
            <Row>
              <Col sm={4} xs={12}>
                <div className="img-box">
                  <img
                    className="img-fluid"
                    src={
                      this.state.movie.image
                        ? this.state.movie.image.original
                        : ""
                    }
                  />
                </div>
              </Col>
              <Col sm={8} xs={12}>
                <div className="title">
                  <h3>
                    {this.state.movie.name}{" "}
                    <span>
                      (
                      {this.state.movie.premiered
                        ? this.state.movie.premiered.substr(0, 4)
                        : ""}
                      )
                    </span>
                  </h3>
                  <span>
                    {this.state.movie.type == "Reality"
                      ? "TV Program"
                      : this.state.movie.type == "Animation"
                      ? "Animation"
                      : this.state.movie.type == "Talk Show"
                      ? "Talk Show"
                      : this.state.movie.type == "Scripted"
                      ? "Series"
                      : "Series"}
                    {" - "}
                    {this.state.movie.runtime + " " + "Min"}
                  </span>
                </div>
                <div className="movie-details">
                  <div className="movie-summary">
                    <h5>Overview</h5>
                    {Parser(`${this.state.movie.summary}`)}
                  </div>
                  <Row>
                    <Col md={6}>
                      <div className="left-side">
                        <ul className="list-unstyled">
                          {this.state.movie.status ? (
                            <li>
                              <i className="f7-icons">hourglass</i>Status:
                              <span>{this.state.movie.status}</span>
                            </li>
                          ) : (
                            ""
                          )}
                          {this.state.movie.rating ? (
                            this.state.movie.rating.average !== null ? (
                              <li className="rating-star">
                                <i className="f7-icons">star_fill</i>Rating:
                                <span>{this.state.movie.rating.average}</span>
                              </li>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                          {this.state.movie.premiered ? (
                            <li>
                              <i className="f7-icons">calendar</i>Premiered:
                              <span>{this.state.movie.premiered}</span>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="right-side">
                        <ul className="list-unstyled">
                          <li>
                            <i className="f7-icons">videocam</i>Type:
                            <span>
                              {this.state.movie.type == "Reality"
                                ? "TV Program"
                                : this.state.movie.type == "Animation"
                                ? "Animation"
                                : this.state.movie.type == "Talk Show"
                                ? "Talk Show"
                                : this.state.movie.type == "Scripted"
                                ? "Series"
                                : "Series"}
                            </span>
                          </li>
                          <li>
                            <i className="f7-icons">clock</i>Runtime:
                            <span>
                              {this.state.movie.runtime + " " + "Min"}
                            </span>
                          </li>
                          <li>
                            <i className="f7-icons">globe</i>Language:
                            <span>{this.state.movie.language}</span>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                  {this.state.movie.officialSite ? (
                    <div className="official">
                      <span>Official Site</span>
                      <a target="_blank" href={this.state.movie.officialSite}>
                        {this.state.movie.officialSite}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <div className="trailer-movie">
            <h3>Trailer</h3>
            <VideoPlayer />
          </div>
          {this.state.movie._embedded ? (
            this.state.movie._embedded.cast.length > 0 ? (
              <div className="cast-movie">
                <h3>Cast</h3>
                <Row>
                  {this.state.movie._embedded.cast.map((actor, index) => {
                    return (
                      <Col key={index} md={3} xs={6}>
                        <div className="person-box">
                          <div className="person-cast">
                            <img
                              className="img-fluid"
                              src={
                                actor.person.image
                                  ? actor.person.image.original
                                  : ""
                              }
                            />
                          </div>
                          <h5>{actor.person.name}</h5>
                          <span>({actor.character.name})</span>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Container>
      </div>
    );
  }
}

export default withRouter(SingleMovie);
