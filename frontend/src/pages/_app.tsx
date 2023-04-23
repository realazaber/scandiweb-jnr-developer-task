import type { AppProps } from "next/app";
import "../styles/styles.scss";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Col, Container, Row } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Nav />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Component {...pageProps} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}
