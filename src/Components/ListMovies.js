import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Parser from "html-react-parser";
import { Link } from "react-router-dom";

class ListMovies extends Component {
  render() {
    const { dataIcon, moviesToList } = this.props;

    const talkShow = moviesToList.map((movie) => {
      if (movie.type === "Talk Show") {
        return (
          <Col key={movie.id} xl={3} lg={4} md={6} sm={12}>
            <div className="movie-box">
              <div className="single-comp">
                <Link to={"/series/" + movie.id}>
                  <div className="image">
                    <div
                      className="img1"
                      style={{
                        backgroundImage: `url(${movie.image.original})`,
                      }}
                    ></div>
                    <div
                      className="img2"
                      style={{
                        backgroundImage: `url(${movie.image.original})`,
                      }}
                    ></div>
                  </div>
                </Link>
                <div className="comp-text">{Parser(movie.summary)}</div>
              </div>
              <div className="movie-details">
                <div className="det-name">
                  <Link to={"/series/" + movie.id}>{movie.name}</Link>
                  {movie.rating.average !== null ? (
                    <span className="average">
                      <i className="f7-icons">star_fill</i>{" "}
                      {movie.rating.average}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="details-type">
                  <span>{movie.genres.join(", ")}</span>
                  <button
                    onClick={(e) => this.props.dataMovie(movie, movie.id, e)}
                  >
                    {this.props.dataIcon.some((item) => movie.id == item)
                      ? Parser('<i class="f7-icons filledOne">heart_fill</i>')
                      : Parser('<i class="f7-icons">heart</i>')}
                  </button>
                </div>
              </div>
            </div>
          </Col>
        );
      }
    });

    const animationMovies = moviesToList.map((movie) => {
      if (movie.type === "Animation") {
        return (
          <Col key={movie.id} xl={3} lg={4} md={6} sm={12}>
            <div className="movie-box">
              <div className="single-comp">
                <Link to={"/series/" + movie.id}>
                  <div className="image">
                    <div
                      className="img1"
                      style={{
                        backgroundImage: `url(${movie.image.original})`,
                      }}
                    ></div>
                    <div
                      className="img2"
                      style={{
                        backgroundImage: `url(${movie.image.original})`,
                      }}
                    ></div>
                  </div>
                </Link>
                <div className="comp-text">{Parser(movie.summary)}</div>
              </div>
              <div className="movie-details">
                <div className="det-name">
                  <Link to={"/series/" + movie.id}>{movie.name}</Link>
                  {movie.rating.average !== null ? (
                    <span className="average">
                      <i className="f7-icons">star_fill</i>{" "}
                      {movie.rating.average}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="details-type">
                  <span>{movie.genres.join(", ")}</span>
                  <button
                    onClick={(e) => this.props.dataMovie(movie, movie.id, e)}
                  >
                    {this.props.dataIcon.some((item) => movie.id == item)
                      ? Parser('<i class="f7-icons filledOne">heart_fill</i>')
                      : Parser('<i class="f7-icons">heart</i>')}
                  </button>
                </div>
              </div>
            </div>
          </Col>
        );
      }
    });

    const realityMovies = moviesToList.map((movie) => {
      if (movie.type === "Reality") {
        return (
          <Col key={movie.id} xl={3} lg={4} md={6} sm={12}>
            <div className="movie-box">
              <div className="single-comp">
                <Link to={"/series/" + movie.id}>
                  <div className="image">
                    <div
                      className="img1"
                      style={{
                        backgroundImage: `url(${movie.image.original})`,
                      }}
                    ></div>
                    <div
                      className="img2"
                      style={{
                        backgroundImage: `url(${movie.image.original})`,
                      }}
                    ></div>
                  </div>
                </Link>
                <div className="comp-text">{Parser(movie.summary)}</div>
              </div>
              <div className="movie-details">
                <div className="det-name">
                  <Link to={"/series/" + movie.id}>{movie.name}</Link>
                  {movie.rating.average !== null ? (
                    <span className="average">
                      <i className="f7-icons">star_fill</i>{" "}
                      {movie.rating.average}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="details-type">
                  <span>{movie.genres.join(", ")}</span>
                  <button
                    onClick={(e) => this.props.dataMovie(movie, movie.id, e)}
                  >
                    {this.props.dataIcon.some((item) => movie.id == item)
                      ? Parser('<i class="f7-icons filledOne">heart_fill</i>')
                      : Parser('<i class="f7-icons">heart</i>')}
                  </button>
                </div>
              </div>
            </div>
          </Col>
        );
      }
    });

    const listMovies = moviesToList.map((movie) => {
      if (
        movie.type !== "Reality" &&
        movie.type !== "Animation" &&
        movie.type !== "Talk Show"
      ) {
        return (
          <Col key={movie.id} xl={3} lg={4} md={6} sm={12}>
            <div className="movie-box">
              <div className="single-comp">
                <Link to={"/series/" + movie.id}>
                  <div className="image">
                    <div
                      className="img1"
                      style={{
                        backgroundImage: `url(${movie.image.original})`,
                      }}
                    ></div>
                    <div
                      className="img2"
                      style={{
                        backgroundImage: `url(${movie.image.original})`,
                      }}
                    ></div>
                  </div>
                </Link>
                <div className="comp-text">{Parser(movie.summary)}</div>
              </div>
              <div className="movie-details">
                <div className="det-name">
                  <Link to={"/series/" + movie.id}>{movie.name}</Link>
                  {movie.rating.average !== null ? (
                    <span className="average">
                      <i className="f7-icons">star_fill</i>{" "}
                      {movie.rating.average}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="details-type">
                  <span>{movie.genres.join(", ")}</span>
                  <button
                    onClick={(e) => this.props.dataMovie(movie, movie.id, e)}
                  >
                    {this.props.dataIcon.some((item) => movie.id == item)
                      ? Parser('<i class="f7-icons filledOne">heart_fill</i>')
                      : Parser('<i class="f7-icons">heart</i>')}
                  </button>
                </div>
              </div>
            </div>
          </Col>
        );
      }
    });

    return (
      <div>
        <div className="films-box top-level reality-movies">
          <div className="category-title">
            <h3>TV Programs</h3>
            <img src={require("../images/brushstroke.png")} alt="Brush" />
          </div>
          <Row>{realityMovies}</Row>
        </div>
        <div className="films-box animation-movies">
          <div className="category-title">
            <h3>Animation</h3>
            <img src={require("../images/brushstroke.png")} alt="Brush" />
          </div>
          <Row>{animationMovies}</Row>
        </div>
        <div className="films-box animation-movies">
          <div className="category-title">
            <h3>Talk Show</h3>
            <img src={require("../images/brushstroke.png")} alt="Brush" />
          </div>
          <Row>{talkShow}</Row>
        </div>
        <div className="films-box animation-movies">
          <div className="category-title">
            <h3>List of Series</h3>
            <img src={require("../images/brushstroke.png")} alt="Brush" />
          </div>
          <Row>{listMovies}</Row>
        </div>
      </div>
    );
  }
}

export default ListMovies;
