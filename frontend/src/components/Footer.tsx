import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="p-3">
      <Container fluid>
        <Row>
          <Col>
            <h2 className="text-center">Scandiweb Test Assignment</h2>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
