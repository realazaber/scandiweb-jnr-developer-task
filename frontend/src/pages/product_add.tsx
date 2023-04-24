import { useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { baseUrl } from "@/helper";

export default function ProductAdd() {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [megabytes, setMegabytes] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [weight, setWeight] = useState("");
  const [message, setMessage] = useState(<div></div>);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (type == "") {
      setMessage(<Alert variant="danger">Please select a type.</Alert>);
    } else {
      fetch(baseUrl + "/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku,
          name,
          price,
          type,
          megabytes,
          width,
          height,
          depth,
          weight,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == false) {
            setMessage(
              <Alert variant="danger">
                A product with the same SKU already exists.
              </Alert>
            );
          } else {
            setMessage(<Alert variant="success">Product added.</Alert>);
            console.log("new product", data);
          }
        })
        .catch((error) => {
          setMessage(
            <Alert variant="danger">
              An error occurred while adding the product.
            </Alert>
          );
          console.error(error);
        });
    }
  };

  return (
    <Row className="justify-content-center">
      <Col xs={8}>
        <h1>Add Product</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="sku">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              value={sku}
              onChange={(event) => setSku(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price $</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control as="select" value={type} onChange={handleTypeChange}>
              <option value="">Select a type</option>
              <option value="DVD">DVD</option>
              <option value="furniture">Furniture</option>
              <option value="book">Book</option>
            </Form.Control>
          </Form.Group>

          {type === "DVD" && (
            <Form.Group controlId="megabytes">
              <Form.Label>Megabytes</Form.Label>
              <Form.Control
                type="number"
                value={megabytes}
                onChange={(event) => setMegabytes(event.target.value)}
                required
              />
            </Form.Group>
          )}

          {type === "furniture" && (
            <>
              <Form.Group controlId="width">
                <Form.Label>Width cm</Form.Label>
                <Form.Control
                  type="number"
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="height">
                <Form.Label>Height cm</Form.Label>
                <Form.Control
                  type="number"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="depth">
                <Form.Label>Depth cm</Form.Label>
                <Form.Control
                  type="number"
                  value={depth}
                  onChange={(event) => setDepth(event.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}

          {type === "book" && (
            <Form.Group controlId="weight">
              <Form.Label>Weight kg</Form.Label>
              <Form.Control
                type="number"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                required
              />
            </Form.Group>
          )}

          <Button className="my-3" type="submit">
            Add Product
          </Button>
        </Form>
        {message}
      </Col>
    </Row>
  );
}
