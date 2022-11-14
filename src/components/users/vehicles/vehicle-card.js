import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { settings } from "../../../utils/settings";
import "./vehicle-card.scss";

const VehicleCard = (props) => {
  const { id, model, image, pricePerHour } = props;

  return (
    <Card className="vehicle-card">
      <Card.Img
        variant="top"
        src={`${settings.apiURL}/files/display/${image[0]}`}
      />
      <Card.Body>
        <Card.Title>{model}</Card.Title>
        <Card.Text>
          <sup>$</sup>
          {pricePerHour}
          <span>/hour</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="dark" as={Link} to={`/vehicles/${id}`}>
          Rent car
        </Button>
        <Button variant="primary" as={Link} to={`/vehicles/${id}`}>
          Details
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default VehicleCard;
