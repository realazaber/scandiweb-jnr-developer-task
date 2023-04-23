import { useState } from "react";
import { Card, Col } from "react-bootstrap";

export default function Product(props) {
  const [isChecked, setIsChecked] = useState(false);

  let details;
  if (props.type === "DVD") {
    details = <h6>Megabytes {props.megabytes}</h6>;
  } else if (props.type === "book") {
    details = <h6>Weight {props.weight}</h6>;
  } else if (props.type === "furniture") {
    details = (
      <h6>
        Dimensions {props.width} x {props.height} x {props.depth}
      </h6>
    );
  }

  const handleCardClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Col xs={6} sm={4} md={3} className="m-1">
      <Card onClick={handleCardClick} className="product">
        <div className="position-absolute top-0 start-0 m-2">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isChecked}
            onChange={() => {}}
          />
        </div>
        <Card.Body className="text-center">
          <h3>{props.sku}</h3>
          <h4>{props.name}</h4>
          <h5>${props.price}</h5>
          {details}
        </Card.Body>
      </Card>
    </Col>
  );
}
