import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getVehiclesByPage } from "../../../api/vehicle-service";
import Loading from "../../common/loading/loading";
import Spacer from "../../common/spacer/spacer";
import SectionHeader from "../common/section-header/section-header";
import VehicleCard from "./vehicle-card";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getVehiclesByPage(0, 8);
      setVehicles(resp.data.content);
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
        <Row className="gy-3">
          {vehicles.map((vehicle) => (
            <Col lg={3} md={4} sm={6} key={vehicle.id}>
              <VehicleCard {...vehicle} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Vehicles;
