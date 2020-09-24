import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import dataHead from "../Api/data/data.json";

class MainHeader extends Component {
  constructor() {
    super();
    this.state = {
      dataHead,
    };
  }

  render() {
    const { dataHead } = this.state;
    const seriesHeadList = dataHead.map((item) => {
      return (
        <div key={item.id} className="slide-item">
          <div className="test"></div>
          <img
            className="d-block w-100"
            src={require(`../images/${item.img}.jpg`)}
            alt={item.name}
          />
          <div className="slider-caption">
            <Container>
              <span className="duration">
                Duration: <span>{item.duration}</span>
              </span>
              <div className="details">
                <i className="f7-icons">star_fill</i>
                <h5>{item.rating}</h5>
                <span>{item.genres}</span>
              </div>
              <h2>{item.name}</h2>
              <p className="desc">{item.description}</p>
              <div className="action-bttns">
                <Link to={"/series/" + item.id} className="bttn btn-glow">
                  <i className="f7-icons">exclamationmark_octagon</i> Details
                </Link>
              </div>
            </Container>
          </div>
        </div>
      );
    });
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 1,
      speed: 1000,
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: "0",
            dots: false,
          },
        },
      ],
    };
    return (
      <div>
        <Slider {...settings}>{seriesHeadList}</Slider>
      </div>
    );
  }
}

export default MainHeader;
