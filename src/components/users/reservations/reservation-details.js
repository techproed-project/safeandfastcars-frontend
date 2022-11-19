import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getReservation } from "../../../api/reservation-service";
import { formatDateTimelll } from "../../../utils/functions/date-time";
import { settings } from "../../../utils/settings";
import Loading from "../../common/loading/loading";
import { RiGasStationFill, RiCarLine, RiCaravanLine } from "react-icons/ri";
import { IoIosSnow } from "react-icons/io";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { GiJoystick, GiCalendarHalfYear } from "react-icons/gi";

const ReservationDetails = () => {
  const [reservation, setReservation] = useState({});
  const [loading, setLoading] = useState(true);
  const { reservationId } = useParams();

  const loadData = async () => {
    try {
      const resp = await getReservation(reservationId);
      setReservation(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const navigate = useNavigate();
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Row className="gy-5">
          <Col lg={6}>
            <h2>{reservation.car.model}</h2>
            <img
              src={`${settings.apiURL}/files/display/${reservation.car.image[0]}`}
              className="img-fluid"
              alt={reservation.car.model}
            />
            <Button variant="primary" onClick={() => navigate(-1)}>
              Back to the reservations
            </Button>
          </Col>
          <Col lg={6}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Reservation Details</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Pick-up Location</td>
                        <td>{reservation.pickUpLocation}</td>
                      </tr>
                      <tr>
                        <td>Drop-off Location</td>
                        <td>{reservation.dropOffLocation}</td>
                      </tr>
                      <tr>
                        <td>Pick-up Time</td>
                        <td>{formatDateTimelll(reservation.pickUpTime)}</td>
                      </tr>
                      <tr>
                        <td>Drop-off Time</td>
                        <td>{formatDateTimelll(reservation.dropOffTime)}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{reservation.status}</td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>${reservation.totalPrice}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Vehicle Details</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>
                          <RiCarLine /> Model
                        </td>
                        <td>{reservation.car.model}</td>
                      </tr>
                      <tr>
                        <td>
                          <RiCarLine /> Doors
                        </td>
                        <td>{reservation.car.doors}</td>
                      </tr>
                      <tr>
                        <td>
                          <MdOutlineAirlineSeatReclineExtra /> Seats
                        </td>
                        <td>{reservation.car.seats}</td>
                      </tr>
                      <tr>
                        <td>
                          <RiCaravanLine /> Luggage
                        </td>
                        <td>{reservation.car.luggage}</td>
                      </tr>
                      <tr>
                        <td>
                          <GiJoystick /> Transmission
                        </td>
                        <td>{reservation.car.transmission}</td>
                      </tr>
                      {reservation.car.airConditioning && (
                        <tr>
                          <td colSpan={2}>
                            <RiCarLine /> Air conditioning
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td>
                          <RiGasStationFill /> Fuel Type
                        </td>
                        <td>{reservation.car.fuelType}</td>
                      </tr>
                      <tr>
                        <td>
                          <GiCalendarHalfYear /> Age
                        </td>
                        <td>{reservation.car.age}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ReservationDetails;
