import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChartLine, FaCalculator, FaPiggyBank, FaUniversity, FaClipboardList, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaCalculator />,
      title: 'Interest Calculator',
      description: 'Calculate simple and compound interest on your savings and investments.',
      link: '/calculators/interest'
    },
    {
      icon: <FaClipboardList />,
      title: 'Net Worth Calculator',
      description: 'Track your assets and liabilities to calculate your total net worth.',
      link: '/calculators/net-worth'
    },
    {
      icon: <FaPiggyBank />,
      title: 'Pension Simulator',
      description: 'Simulate your pension growth based on contributions and employer matching.',
      link: '/calculators/pension'
    },
    {
      icon: <FaChartLine />,
      title: 'Retirement Planning',
      description: 'Plan for your retirement by estimating required savings based on your lifestyle.',
      link: '/calculators/retirement'
    },
    {
      icon: <FaUniversity />,
      title: 'Loan Repayment',
      description: 'Calculate payment schedules for mortgages, car loans, and personal loans.',
      link: '/calculators/loan'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Emergency Fund',
      description: 'Determine how much you should save for emergencies based on your expenses.',
      link: '/calculators/emergency-fund'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold">Take Control of Your Financial Future</h1>
              <p className="lead my-4">
                Plan, track, and visualize your finances with our comprehensive suite of financial planning tools.
              </p>
              <Link to="/register">
                <Button variant="light" size="lg" className="me-3">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-light" size="lg">
                  Login
                </Button>
              </Link>
            </Col>
            <Col lg={6} className="text-center d-none d-lg-block">
              <img
                src="https://placehold.co/600x400/3498db/FFFFFF/png?text=Financial+Planning+App"
                alt="Financial Planning"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Our Financial Planning Tools</h2>
        <Row>
          {features.map((feature, index) => (
            <Col md={6} lg={4} className="mb-4" key={index}>
              <Card className="h-100 feature-card shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon">{feature.icon}</div>
                  <Card.Title className="mb-3">{feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                  <Link to={feature.link}>
                    <Button variant="outline-primary" className="mt-3">
                      Try Calculator
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Why Choose Us Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Why Choose Our Financial Planning App</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="text-center">
                <div className="p-3 bg-primary text-white rounded-circle mx-auto mb-3" style={{ width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-lock fa-2x"></i>
                </div>
                <h4>Secure & Private</h4>
                <p>Your financial data is encrypted and never shared with third parties.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div className="p-3 bg-primary text-white rounded-circle mx-auto mb-3" style={{ width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-chart-pie fa-2x"></i>
                </div>
                <h4>Comprehensive Tools</h4>
                <p>All the financial calculators you need in one place for better planning.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div className="p-3 bg-primary text-white rounded-circle mx-auto mb-3" style={{ width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-sync fa-2x"></i>
                </div>
                <h4>Always Up-to-Date</h4>
                <p>Our calculators are regularly updated to reflect current financial standards.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Call to Action */}
      <Container className="py-5 text-center">
        <h2>Ready to Start Planning Your Financial Future?</h2>
        <p className="lead mb-4">Create a free account and start using our financial planning tools today.</p>
        <Link to="/register">
          <Button variant="primary" size="lg" className="px-5 py-3">
            Sign Up Now
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Home;