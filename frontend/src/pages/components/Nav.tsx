import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Col, Row } from "react-bootstrap";

import Link from "next/link";

export default function Nav() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Row>
          <Col xs={3}>
            <Link href="/" className="brand">
              Product List
            </Link>
          </Col>
          <Col xs={9} className="d-flex justify-content-end">
            <Link href="/product_add">
              <Button variant="success">Add</Button>
            </Link>
            <Link href="/">
              <Button variant="danger">Mass Delete</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
