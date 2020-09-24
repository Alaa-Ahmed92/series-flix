import React, { Component } from "react";
import { Container, FormControl, Row, Col, Form } from "react-bootstrap";
import Parser from "html-react-parser";
import { Link } from "react-router-dom";
import Banner from "../Components/Banner";
import { withRouter } from "react-router";

class Series extends Component {
  state = {
    series: this.props.moviesList,
    search: null,
    selectValue: "All",
    selectedSeries: this.props.moviesList,
    activeRate: null,
  };

  // componentDidMount = () => {
  //   getMovies().then((res) => {
  //     this.setState({ series: res.data, selectedSeries: res.data });
  //   });
  // };

  searchFilter = (e) => {
    let keyword = e.target.value;
    this.setState({ search: keyword });
  };

  sortByPriceAsc = (e) => {
    e.preventDefault();
    const { series } = this.state;
    let rateValue = series.sort((a, b) => {
      return b.rating.average - a.rating.average;
    });
    this.setState({ activeRate: 1, series: rateValue });
  };

  sortByPriceDesc = (e) => {
    e.preventDefault();
    const { series } = this.state;
    let rateValue = series.sort((a, b) => {
      return a.rating.average - b.rating.average;
    });
    this.setState({ activeRate: 2, series: rateValue });
  };

  handleSelect = (e) => {
    const { series, selectedSeries } = this.state;
    let res = this.menu.value;
    let seriesState = selectedSeries.filter((movie) => {
      if (movie.type == res) {
        return movie;
      } else if (res == "All") {
        return selectedSeries.map((movie) => {
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
        });
      }
    });
    this.setState({ series: seriesState });
  };

  render() {
    const { series, search } = this.state;
    const filterSeries = series
      .filter((movie) => {
        if (search == null) {
          return movie;
        } else if (movie.name.toLowerCase().includes(search.toLowerCase())) {
          return movie;
        }
      })
      .map((movie) => {
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
      });

    return (
      <>
        <Banner banner="head-subpage">
          <div className="overlay"></div>
          <h2 className="movie-name">Series</h2>
        </Banner>
        <div className="list-series">
          <Container fluid>
            <Form>
              <Form.Row>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Search by name</Form.Label>
                    <FormControl
                      className="mr-sm-2 search-input"
                      type="text"
                      placeholder="Enter item to be searched"
                      onChange={(e) => this.searchFilter(e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                  <Form.Group>
                    <Form.Label>Sort by Rate</Form.Label>
                    <button
                      className={this.state.activeRate === 1 ? "active" : ""}
                      onClick={(e) => this.sortByPriceAsc(e)}
                    >
                      <i className="f7-icons">chevron_up</i>
                    </button>
                    <button
                      className={this.state.activeRate === 2 ? "active" : ""}
                      onClick={(e) => this.sortByPriceDesc(e)}
                    >
                      <i className="f7-icons">chevron_down</i>
                    </button>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      onChange={this.handleSelect}
                      as="select"
                      custom
                      ref={(input) => (this.menu = input)}
                    >
                      <option value="All">All</option>
                      <option value="Reality">Tv Programs</option>
                      <option value="Talk Show">Talk Show</option>
                      <option value="Animation">Animation</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
            <Row>{filterSeries}</Row>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(Series);
