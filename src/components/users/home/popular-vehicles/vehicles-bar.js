import React from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import "./vehicles-bar.scss";
import { useRef } from "react";

const VehiclesBar = (props) => {
  const { vehicles, setActiveVehicle, activeVehicle } = props;
  const swiperRef = useRef(null);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <Container className="vehicles-bar">
      <div className="arrow" onClick={handlePrev}>
        <IoIosArrowDropleft />
      </div>

      <Swiper
        ref={swiperRef}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          0: {
            spaceBetween: 10,
            slidesPerView: 1,
          },
          576: {
            spaceBetween: 20,
            slidesPerView: 2,
          },
          768: {
            spaceBetween: 20,
            slidesPerView: 3,
          },
          992: {
            spaceBetween: 20,
            slidesPerView: 5,
          },
          1200: {
            spaceBetween: 20,
            slidesPerView: 7,
          },
        }}
      >
        {vehicles.map((vehicle, index) => (
          <SwiperSlide
            key={index}
            className={vehicle.id === activeVehicle.id ? "active" : ""}
            onClick={() => setActiveVehicle(vehicle)}
          >
            {vehicle.model}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="arrow" onClick={handleNext}>
        <IoIosArrowDropright />
      </div>
    </Container>
  );
};

export default VehiclesBar;
