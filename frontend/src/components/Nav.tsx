import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Col, Row } from "react-bootstrap";

import Link from "next/link";
import { baseUrl } from "@/helper";

export default function CustomNav() {
  const deleteProducts = () => {
    try {
      let productsStr = localStorage.getItem("selectedProducts");
      let productsArr = JSON.parse(productsStr);

      if (productsArr.length <= 0) {
        alert("Please select at least one product");
      } else {
        productsArr.forEach((prodSku) => {
          console.log("prod: ", prodSku);
          fetch(baseUrl + "/products", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sku: prodSku }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
        });
        localStorage.removeItem("selectedProducts");
        window.location.reload();
      }
    } catch (error) {}
  };

  const clearSelected = () => {
    localStorage.removeItem("selectedProducts");
  };

  return (
    <Navbar bg="dark" variant="dark" className="d-flex justify-content-center">
      <Nav className="w-100">
        <Container fluid>
          <Row>
            <Col xs={5} className="vert-align">
              <Link href="/">Product List</Link>
            </Col>
            <Col xs={7} className="d-flex justify-content-end">
              <Link href="/product_add">
                <Button onClick={clearSelected} variant="success">
                  Add
                </Button>
              </Link>
              <Link href="/">
                <Button onClick={deleteProducts} variant="danger">
                  Mass Delete
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </Nav>
    </Navbar>
  );
}
