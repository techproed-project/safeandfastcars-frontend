import React, { useEffect, useState } from "react";
import { Container, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getReservations } from "../../../api/reservation-service";
import { formatDateTimelll } from "../../../utils/functions/date-time";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
 const navigate = useNavigate();

  const loadData = async (page) => {
    setLoading(true);

    try {
      const resp = await getReservations(page, 20);
      const {
        content,
        number,
        numberOfElements,
        size,
        totalElements,
        totalPages,
      } = resp.data;

      setReservations(content);
      setPagination({
        number,
        numberOfElements,
        size,
        totalElements,
        totalPages,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vehicle</th>
            <th>Pick-up</th>
            <th>Drop-off</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index} onClick={()=>navigate(`/user/reservations/${reservation.id}`)} >
              <td>{index+1}</td>
              <td>{reservation.car.model}</td>
              <td>
                    {reservation.pickUpLocation}, 
                    {formatDateTimelll(reservation.pickUpTime)}
              </td>
              <td>
                    {reservation.dropOffLocation}, 
                    {formatDateTimelll(reservation.dropOffTime)}
                </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {pagination.totalPages > 1 &&  <Pagination>
        <Pagination.First
          onClick={() => loadData(0)}
          disabled={pagination.number <= 0}
        />
        <Pagination.Prev
          onClick={() => loadData(pagination.number - 1)}
          disabled={pagination.number <= 0}
        />
        {[...Array(pagination.totalPages)].map((item, index) => (
          <Pagination.Item
            onClick={() => pagination.number !== index && loadData(index)}
            active={pagination.number === index}
            key={index}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => loadData(pagination.number + 1)}
          disabled={pagination.number >= pagination.totalPages - 1}
        />
        <Pagination.Last
          onClick={() => loadData(pagination.totalPages - 1)}
          disabled={pagination.number >= pagination.totalPages - 1}
        />
      </Pagination>}

     
    </Container>
  );
};

export default Reservations;
