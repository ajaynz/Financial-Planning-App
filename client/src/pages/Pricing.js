import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <Container className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 mb-3">Choose Your Plan</h1>
          <p className="lead">
            Start with our free tools or unlock advanced features with our premium plans
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {/* Free Plan */}
        <Col md={4} className="mb-4">
          <Card className="h-100 border-primary">
            <Card.Header className="bg-primary text-white text-center">
              <h3>Free</h3>
              <h2>$0<small>/month</small></h2>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>✓ Basic financial calculators</ListGroup.Item>
                <ListGroup.Item>✓ Interest & savings calculator</ListGroup.Item>
                <ListGroup.Item>✓ Net worth calculator</ListGroup.Item>
                <ListGroup.Item>✓ Loan repayment calculator</ListGroup.Item>
                <ListGroup.Item>✓ Emergency fund estimator</ListGroup.Item>
                <ListGroup.Item>✓ Basic retirement planning</ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="outline-primary" size="lg" as={Link} to="/register">
                Get Started Free
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        {/* Premium Plan */}
        <Col md={4} className="mb-4">
          <Card className="h-100 border-success shadow">
            <Card.Header className="bg-success text-white text-center">
              <h3>Premium</h3>
              <h2>$50<small>/month</small></h2>
              <span className="badge bg-warning text-dark">Most Popular</span>
            </Card.Header>
            <Card.Body>
              <p><strong>🧠 Advanced Financial Intelligence</strong></p>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item>✓ AI-Powered Financial Advisor</ListGroup.Item>
                <ListGroup.Item>✓ Scenario Planning & What-If Analysis</ListGroup.Item>
                <ListGroup.Item>✓ Monte Carlo Simulations</ListGroup.Item>
                <ListGroup.Item>✓ Tax Optimization Suggestions</ListGroup.Item>
              </ListGroup>

              <p><strong>🔄 Automation & Smart Sync</strong></p>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item>✓ Automatic Data Sync (Bank/Cards)</ListGroup.Item>
                <ListGroup.Item>✓ Automated Budget Categorization</ListGroup.Item>
                <ListGroup.Item>✓ Real-Time Net Worth Tracker</ListGroup.Item>
                <ListGroup.Item>✓ Smart Alerts & Notifications</ListGroup.Item>
              </ListGroup>

              <p><strong>📚 Premium Content & Tools</strong></p>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item>✓ Exclusive Webinars & Workshops</ListGroup.Item>
                <ListGroup.Item>✓ Premium Goal Templates</ListGroup.Item>
                <ListGroup.Item>✓ In-Depth Monthly Reports</ListGroup.Item>
                <ListGroup.Item>✓ Historical Market Data Access</ListGroup.Item>
              </ListGroup>

              <p><strong>🛡️ Security & Customization</strong></p>
              <ListGroup variant="flush">
                <ListGroup.Item>✓ Data Backup & Restore</ListGroup.Item>
                <ListGroup.Item>✓ Custom Dashboard Views</ListGroup.Item>
                <ListGroup.Item>✓ Multi-User Family Access</ListGroup.Item>
                <ListGroup.Item>✓ Audit Trails & Financial Journaling</ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="success" size="lg" as={Link} to="/register">
                Start Premium Trial
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        {/* Professional Plan */}
        <Col md={4} className="mb-4">
          <Card className="h-100 border-warning">
            <Card.Header className="bg-warning text-dark text-center">
              <h3>Professional</h3>
              <h2>$500<small>/month</small></h2>
            </Card.Header>
            <Card.Body>
              <p className="text-center mb-3">
                <strong>Everything in Premium, plus:</strong>
              </p>
              
              <p><strong>💼 Professional Tools & Support</strong></p>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item>✓ Dedicated Financial Coach/Advisor</ListGroup.Item>
                <ListGroup.Item>✓ Monthly Q&A with Certified Advisor</ListGroup.Item>
                <ListGroup.Item>✓ Advanced Retirement Planning</ListGroup.Item>
                <ListGroup.Item>✓ Estate & Legacy Planning Templates</ListGroup.Item>
                <ListGroup.Item>✓ Small Business Financial Planning</ListGroup.Item>
                <ListGroup.Item>✓ Bespoke Financial Strategy</ListGroup.Item>
                <ListGroup.Item>✓ Priority Support</ListGroup.Item>
              </ListGroup>

              <div className="alert alert-info">
                <small>
                  <strong>Perfect for:</strong> Business owners, high-net-worth individuals, 
                  or anyone needing personalized financial guidance
                </small>
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="warning" size="lg" as={Link} to="/register">
                Contact Sales
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="text-center">
          <h3>Frequently Asked Questions</h3>
          <Row className="mt-4">
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Can I cancel anytime?</Card.Title>
                  <Card.Text>
                    Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Is my financial data secure?</Card.Title>
                  <Card.Text>
                    We use bank-level encryption and security measures to protect your data. We never sell or share your personal information.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Pricing;
