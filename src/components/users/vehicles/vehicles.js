import React, { useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { getVehiclesByPage } from "../../../api/vehicle-service";
import Loading from "../../common/loading/loading";
import Spacer from "../../common/spacer/spacer";
import SectionHeader from "../common/section-header/section-header";
import VehicleCard from "./vehicle-card";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  const loadData = async (page) => {
    setLoading(true);

    try {
      const resp = await getVehiclesByPage(page, 8);
      const {
        content,
        number,
        numberOfElements,
        size,
        totalElements,
        totalPages,
      } = resp.data;

      setVehicles(content);
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
      <SectionHeader
        title="Vehicle Models"
        subtitle="Lux &amp; Economic"
        desc="To contribute to positive change and achieve our sustainability goals with many extraordinary"
      />
      <Spacer />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Row className="gy-3">
            {vehicles.map((vehicle) => (
              <Col lg={3} md={4} sm={6} key={vehicle.id}>
                <VehicleCard {...vehicle} />
              </Col>
            ))}
          </Row>

          {pagination.totalPages > 1 && (
            <Row className="mt-5 text-center">
              <Pagination>
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
                    onClick={() =>
                      pagination.number !== index && loadData(index)
                    }
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
              </Pagination>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default Vehicles;
