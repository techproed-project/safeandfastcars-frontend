import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getVehicle } from "../../../api/vehicle-service";
import { settings } from "../../../utils/settings";
import Spacer from "../../common/spacer/spacer";
import { RiGasStationFill, RiCarLine, RiCaravanLine } from "react-icons/ri";
import { IoIosSnow } from "react-icons/io";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { GiJoystick, GiCalendarHalfYear } from "react-icons/gi";
import BookingForm from "./booking-form";
import "./vehicle-details.scss";
import Loading from "../../common/loading/loading";

const VehicleDetails = ({ setTitle }) => {
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(true);
  const { vehicleId } = useParams();

  const loadData = async () => {
    try {
      const resp = await getVehicle(vehicleId);
      setVehicle(resp.data);
      setTitle(resp.data.model);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className="vehicle-details">
      {loading ? (
        <Loading />
      ) : (
        <Row className="gy-5">
          <Col lg={8}>
            <div className="title">
              <h1>{vehicle.model}</h1>
              <h3>
                <Badge bg="primary">{vehicle.pricePerHour}/hour</Badge>
              </h3>
            </div>

            <Card>
              <img
                src={`${settings.apiURL}/files/display/${vehicle.image[0]}`}
                className="img-fluid"
                alt={vehicle.model}
              />
            </Card>

            <Spacer />

            <h2>Property Highlights</h2>
            <ul>
              <li>
                <RiCarLine /> {vehicle.model}
              </li>
              <li>
                <RiCarLine /> Doors: {vehicle.doors}
              </li>
              <li>
                <MdOutlineAirlineSeatReclineExtra /> Seats: {vehicle.seats}
              </li>
              <li>
                <RiCaravanLine /> Luggage: {vehicle.luggage}
              </li>
              <li>
                <GiJoystick /> Transmission: {vehicle.transmission}
              </li>
              {vehicle.airConditioning && (
                <li>
                  <IoIosSnow /> Air Conditioning
                </li>
              )}

              <li>
                <RiGasStationFill /> Fuel Type: {vehicle.fuelType}
              </li>
              <li>
                <GiCalendarHalfYear /> Age: {vehicle.age}
              </li>
            </ul>
          </Col>
          <Col lg={4}>
            <BookingForm vehicleId={vehicleId}/>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default VehicleDetails;
