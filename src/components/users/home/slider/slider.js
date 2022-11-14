import React from "react";
import { Carousel } from "react-bootstrap";
import slides from "./slider.json";
import "./slider.scss";

const Slider = () => {
  return (
    <div className="slider">
      <Carousel>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              src={require(`../../../../assets/img/slider/${slide.image}`)}
              alt={slide.title}
            />
            <Carousel.Caption>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
