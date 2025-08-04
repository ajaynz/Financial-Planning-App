import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheck, FaStar, FaCrown, FaRocket } from 'react-icons/fa';

const Pricing = () => {
  const freeFeatures = [
    'All basic financial calculators',
    'Interest & Savings Calculator',
    'Net Worth Calculator',
    'Pension Contribution Simulator',
    'Retirement Planning Calculator',
    'Loan Repayment Calculator',
    'Emergency Fund Estimator',
    'Save calculations to dashboard',
    'Basic data visualization'
  ];

  const premiumFeatures = [
    'All free features included',
    'AI-Powered Financial Advisor',
    'Personalized financial advice',
    'Scenario Planning & What-If Analysis',
    'Monte Carlo Simulations',
    'Tax Optimization Suggestions',
    'Automatic Data Sync with bank accounts',
    'Automated Budget Categorization',
    'Real-Time Net Worth Tracker',
    'Smart Alerts & Notifications',
    'Exclusive Webinars and Workshops',
    'Premium Goal Templates',
    'In-Depth Monthly Reports',
    'Historical Financial Trends & Market Data',
    'Data Backup & Restore',
    'Custom Dashboard Views',
    'Multi-User Access',
    'Audit Trails & Financial Journaling'
  ];

  const professionalFeatures = [
    'All premium features included',
    'Dedicated Financial Coach/Advisor Chat',
    'Monthly Q&A with certified advisor',
    'Advanced Retirement Planning',
    'Roth vs Traditional IRA modeling',
    'Social Security benefit projections',
    'Estate & Legacy Planning Templates',
    'Small Business Financial Planning',
    'Quarterly tax estimation tools',
    'Priority customer support',
    'Custom financial strategy development',
    'One-on-one consultation sessions'
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-4 fw-bold">Choose Your Plan</h1>
              <p className="lead">
                Start free and upgrade as your financial planning needs grow
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Pricing Cards */}
      <Container className="py-5">
        <Row className="justify-content-center">
          {/* Free Plan */}
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <FaStar className="text-warning" size={48} />
                </div>
                <h3 className="card-title">Free</h3>
                <div className="mb-4">
                  <span className="display-4 fw-bold">$0</span>
                  <span className="text-muted">/month</span>
                </div>
                <p className="text-muted mb-4">
                  Perfect for getting started with basic financial planning
                </p>
                <ListGroup variant="flush" className="mb-4">
                  {freeFeatures.map((feature, index) => (
                    <ListGroup.Item key={index} className="border-0 px-0">
                      <FaCheck className="text-success me-2" />
                      {feature}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Link to="/register">
                  <Button variant="outline-primary" size="lg" className="w-100">
                    Get Started Free
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Premium Plan */}
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 border-primary shadow-lg position-relative">
              <Badge 
                bg="primary" 
                className="position-absolute top-0 start-50 translate-middle px-3 py-2"
                style={{ zIndex: 1 }}
              >
                Most Popular
              </Badge>
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <FaCrown className="text-primary" size={48} />
                </div>
                <h3 className="card-title">Premium</h3>
                <div className="mb-4">
                  <span className="display-4 fw-bold">$50</span>
                  <span className="text-muted">/month</span>
                </div>
                <p className="text-muted mb-4">
                  Advanced tools and automation for serious financial planning
                </p>
                <ListGroup variant="flush" className="mb-4">
                  {premiumFeatures.slice(0, 10).map((feature, index) => (
                    <ListGroup.Item key={index} className="border-0 px-0">
                      <FaCheck className="text-success me-2" />
                      {feature}
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item className="border-0 px-0 text-muted">
                    <small>+ {premiumFeatures.length - 10} more features</small>
                  </ListGroup.Item>
                </ListGroup>
                <Link to="/register">
                  <Button variant="primary" size="lg" className="w-100">
                    Start Premium Trial
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Professional Plan */}
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <FaRocket className="text-info" size={48} />
                </div>
                <h3 className="card-title">Professional</h3>
                <div className="mb-4">
                  <span className="display-4 fw-bold">$500</span>
                  <span className="text-muted">/month</span>
                </div>
                <p className="text-muted mb-4">
                  Dedicated advisor and bespoke financial planning support
                </p>
                <ListGroup variant="flush" className="mb-4">
                  {professionalFeatures.slice(0, 8).map((feature, index) => (
                    <ListGroup.Item key={index} className="border-0 px-0">
                      <FaCheck className="text-success me-2" />
                      {feature}
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item className="border-0 px-0 text-muted">
                    <small>+ {professionalFeatures.length - 8} more features</small>
                  </ListGroup.Item>
                </ListGroup>
                <Link to="/register">
                  <Button variant="info" size="lg" className="w-100">
                    Contact Sales
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Feature Comparison */}
      <div className="bg-light py-5">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center mb-5">Compare All Features</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Feature Category</th>
                      <th className="text-center">Free</th>
                      <th className="text-center">Premium</th>
                      <th className="text-center">Professional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Basic Calculators</strong></td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                    </tr>
                    <tr>
                      <td><strong>AI-Powered Advisor</strong></td>
                      <td className="text-center">-</td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                    </tr>
                    <tr>
                      <td><strong>Automatic Bank Sync</strong></td>
                      <td className="text-center">-</td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                    </tr>
                    <tr>
                      <td><strong>Advanced Analytics</strong></td>
                      <td className="text-center">-</td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                    </tr>
                    <tr>
                      <td><strong>Dedicated Financial Coach</strong></td>
                      <td className="text-center">-</td>
                      <td className="text-center">-</td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                    </tr>
                    <tr>
                      <td><strong>Custom Strategy Development</strong></td>
                      <td className="text-center">-</td>
                      <td className="text-center">-</td>
                      <td className="text-center"><FaCheck className="text-success" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* FAQ Section */}
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto">
            <h2 className="text-center mb-5">Frequently Asked Questions</h2>
            <div className="accordion" id="pricingFAQ">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#faq1"
                  >
                    Can I change my plan anytime?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#pricingFAQ">
                  <div className="accordion-body">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#faq2"
                  >
                    Is there a free trial for premium plans?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                  <div className="accordion-body">
                    Yes, we offer a 14-day free trial for our Premium plan. No credit card required to start.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#faq3"
                  >
                    How secure is my financial data?
                  </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#pricingFAQ">
                  <div className="accordion-body">
                    We use bank-level encryption and security measures. Your data is never shared with third parties and is protected by industry-standard security protocols.
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2>Ready to Take Control of Your Finances?</h2>
              <p className="lead mb-4">Start with our free plan and upgrade when you're ready for more advanced features.</p>
              <Link to="/register">
                <Button variant="light" size="lg" className="me-3">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-light" size="lg">
                  Sign In
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Pricing;
