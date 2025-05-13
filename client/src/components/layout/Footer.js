import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Financial Planner</h5>
            <p className="small">
              Plan your financial future with our comprehensive suite of planning tools.
            </p>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/calculators/interest" className="text-light">Interest Calculator</a></li>
              <li><a href="/calculators/net-worth" className="text-light">Net Worth</a></li>
              <li><a href="/calculators/retirement" className="text-light">Retirement Planning</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Terms of Service</a></li>
              <li><a href="#" className="text-light">Privacy Policy</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col>
            <p className="text-center small mb-0">
              &copy; {new Date().getFullYear()} Financial Planner. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;