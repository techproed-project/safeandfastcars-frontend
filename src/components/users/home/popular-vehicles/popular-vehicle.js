import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { settings } from "../../../../utils/settings";
import { RiGasStationFill, RiCarLine, RiCaravanLine } from "react-icons/ri";
import { IoIosSnow } from "react-icons/io";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { GiJoystick, GiCalendarHalfYear } from "react-icons/gi";
import "./popular-vehicle.scss";
import Spacer from "../../../common/spacer/spacer";
import { Link } from "react-router-dom";

const PopularVehicle = (props) => {
  const { activeVehicle } = props;

  const {
    id,
    image,
    pricePerHour,
    age,
    airConditioning,
    doors,
    fuelType,
    luggage,
    model,
    seats,
    transmission,
  } = activeVehicle;

  return (
    <Container className="popular-vehicle">
      <Row>
        <Col md={8}>
          <img
            src={`${settings.apiURL}/files/display/${image[0]}`}
            alt=""
            className="img-fluid"
          />
        </Col>
        <Col md={4}>
          <h2>
            <sup>$</sup>
            <span>{pricePerHour}</span>
          </h2>
          <p>rent per hour</p>

          <ul>
            <li>
              <RiCarLine /> Model: {model}
            </li>
            <li>
              <RiCarLine /> Doors: {doors}
            </li>
            <li>
              <MdOutlineAirlineSeatReclineExtra /> Seats: {seats}
            </li>
            <li>
              <RiCaravanLine /> Luggage: {luggage}
            </li>
            <li>
              <GiJoystick /> Transmission: {transmission}
            </li>
            {airConditioning && (
              <li>
                <IoIosSnow /> Air Conditioning
              </li>
            )}

            <li>
              <RiGasStationFill /> Fuel Type: {fuelType}
            </li>
            <li>
              <GiCalendarHalfYear /> Age: {age}
            </li>
          </ul>
          <Spacer height={30} />
          <Button variant="primary" as={Link} to={`/vehicles/${id}`}>Rent Now</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PopularVehicle;
