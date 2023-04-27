import { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";

export default function Product(props: any) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCardClick = () => {
    setIsChecked(!isChecked);
    const savedProducts: any = JSON.parse(
      localStorage.getItem("selectedProducts") || "[]"
    );
    if (!isChecked) {
      savedProducts.push(props.sku);
    } else {
      const index = savedProducts.indexOf(props.sku);
      if (index > -1) {
        savedProducts.splice(index, 1);
      }
    }
    localStorage.setItem("selectedProducts", JSON.stringify(savedProducts));
  };

  useEffect(() => {
    try {
      let productsStr: any = localStorage.getItem("selectedProducts");
      let productsArr: any = JSON.parse(productsStr || "[]");

      productsArr.forEach((sku: string) => {
        if (sku == props.sku) {
          setIsChecked(true);
        }
      });
    } catch {}
  }, []);

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
