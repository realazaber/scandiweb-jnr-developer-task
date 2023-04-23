import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Col, Row } from "react-bootstrap";

import Link from "next/link";

export default function CustomNav() {
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
                <Button variant="success">Add</Button>
              </Link>
              <Link href="/">
                <Button variant="danger">Mass Delete</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </Nav>
    </Navbar>
  );
}
