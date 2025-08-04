import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheck, FaStar, FaCrown } from 'react-icons/fa';

const Pricing = () => {
  const plans = [
    {
      name: 'Free Plan',
      price: '$0',
      period: 'forever',
      icon: <FaCheck className="text-success" />,
      features: [
        'Basic financial calculators',
        'Interest & savings calculator',
        'Net worth calculator',
        'Loan repayment calculator',
        'Emergency fund estimator',
        'Basic retirement planning',
        'Pension contribution simulator'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline-primary',
      popular: false
    },
    {
      name: 'Premium Plan',
      price: '$50',
      period: 'month',
      icon: <FaStar className="text-warning" />,
      features: [
        'All Free Plan features',
        'AI-Powered Financial Advisor',
        'Personalized advice and recommendations',
        'Scenario Planning & What-If Analysis',
        'Monte Carlo Simulations',
        'Tax Optimization Suggestions',
        'Automatic Data Sync with bank accounts',
        'Real-Time Net Worth Tracker',
        'Smart Alerts and Notifications',
        'Premium Goal Templates',
        'In-Depth Monthly Reports',
        'Historical Financial Trends',
        'Data Backup & Restore',
        'Custom Dashboard Views',
        'Multi-User Family Access'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'primary',
      popular: true
    },
    {
      name: 'Dedicated Advisor',
      price: '$500',
      period: 'month',
      icon: <FaCrown className="text-gold" />,
      features: [
        'All Premium Plan features',
        'Dedicated Financial Coach/Advisor Chat',
        'Monthly Q&A with certified advisor',
        'Advanced Retirement Planning',
        'Roth vs Traditional IRA modeling',
        'Social Security benefit projections',
        'Estate & Legacy Planning Templates',
        'Small Business Financial Planning',
        'Quarterly tax estimation tools',
        'Personalized investment strategies',
        'Priority customer support'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'warning',
      popular: false
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-4 fw-bold">Pricing</h1>
              <p className="lead">Choose the plan that fits your financial planning needs</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Pricing Cards */}
      <Container className="py-5">
        <Row className="justify-content-center">
          {plans.map((plan, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card className={`h-100 ${plan.popular ? 'border-primary shadow-lg' : 'shadow-sm'}`}>
                {plan.popular && (
                  <div className="bg-primary text-white text-center py-2">
                    <small className="fw-bold">MOST POPULAR</small>
                  </div>
                )}
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    {plan.icon}
                  </div>
                  <Card.Title className="h3 mb-3">{plan.name}</Card.Title>
                  <div className="mb-4">
                    <span className="display-5 fw-bold">{plan.price}</span>
                    <span className="text-muted">/{plan.period}</span>
                  </div>
                  <ListGroup variant="flush" className="mb-4">
                    {plan.features.map((feature, featureIndex) => (
                      <ListGroup.Item key={featureIndex} className="border-0 px-0 py-2">
                        <FaCheck className="text-success me-2" />
                        {feature}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <div className="d-grid">
                    <Button
                      variant={plan.buttonVariant}
                      size="lg"
                      as={Link}
                      to="/register"
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* FAQ Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="mb-4">
                <h5>Can I upgrade or downgrade my plan anytime?</h5>
                <p>Yes, you can change your plan at any time. Changes take effect immediately, and billing is prorated.</p>
              </div>
              <div className="mb-4">
                <h5>Is my financial data secure?</h5>
                <p>Absolutely. We use bank-level encryption and never store sensitive information like account passwords. Your data is always protected.</p>
              </div>
              <div className="mb-4">
                <h5>What payment methods do you accept?</h5>
                <p>We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
              </div>
              <div className="mb-4">
                <h5>Is there a free trial for premium features?</h5>
                <p>Yes, we offer a 14-day free trial for all premium features. No credit card required to start.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Pricing;
