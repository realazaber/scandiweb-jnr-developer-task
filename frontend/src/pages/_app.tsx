import type { AppProps } from "next/app";
import "../styles/styles.scss";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Col, Container, Row } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Nav />
        </Col>
      </Row>
      <Row>
        <Col>
          <Component {...pageProps} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}
