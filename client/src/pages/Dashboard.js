import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaChartLine, FaPiggyBank, FaUniversity, FaClipboardList, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  // Sample user data - in a real app, this would come from the backend
  const userData = {
    netWorth: 145000,
    totalSavings: 85000,
    totalDebt: 120000,
    monthlyIncome: 5000,
    monthlyExpenses: 3500,
    recentCalculations: [
      { type: 'Retirement Planner', date: '2023-04-02', result: '$1,250,000 at age 65' },
      { type: 'Loan Calculator', date: '2023-03-28', result: '$1,532/month for mortgage' },
      { type: 'Net Worth', date: '2023-03-20', result: '$145,000 total net worth' }
    ]
  };

  const calculators = [
    {
      title: 'Interest Calculator',
      icon: <FaMoneyBillWave className="feature-icon" />,
      description: 'Calculate simple and compound interest on your investments.',
      link: '/calculators/interest'
    },
    {
      title: 'Net Worth Calculator',
      icon: <FaClipboardList className="feature-icon" />,
      description: 'Track your assets and liabilities to calculate your net worth.',
      link: '/calculators/net-worth'
    },
    {
      title: 'Pension Simulator',
      icon: <FaPiggyBank className="feature-icon" />,
      description: 'Simulate your pension growth with contributions and employer matching.',
      link: '/calculators/pension'
    },
    {
      title: 'Retirement Planner',
      icon: <FaChartLine className="feature-icon" />,
      description: 'Plan for your retirement based on your desired lifestyle.',
      link: '/calculators/retirement'
    },
    {
      title: 'Loan Calculator',
      icon: <FaUniversity className="feature-icon" />,
      description: 'Calculate payment schedules for mortgages and other loans.',
      link: '/calculators/loan'
    },
    {
      title: 'Emergency Fund',
      icon: <FaShieldAlt className="feature-icon" />,
      description: 'Determine how much you should save for emergencies.',
      link: '/calculators/emergency-fund'
    }
  ];

  return (
    <Container className="py-5">
      <div className="mb-5">
        <h1 className="mb-3">Welcome, {currentUser?.name || 'User'}!</h1>
        <p className="lead">
          Use our financial planning tools to help you achieve your financial goals.
        </p>
      </div>

      <Row className="mb-5">
        <Col lg={3} md={6} className="mb-4">
          <Card className="dashboard-stat-card">
            <Card.Body className="text-center">
              <h5 className="dashboard-stat-label">Net Worth</h5>
              <div className="dashboard-stat-value">${userData.netWorth.toLocaleString()}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="dashboard-stat-card">
            <Card.Body className="text-center">
              <h5 className="dashboard-stat-label">Total Savings</h5>
              <div className="dashboard-stat-value">${userData.totalSavings.toLocaleString()}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="dashboard-stat-card">
            <Card.Body className="text-center">
              <h5 className="dashboard-stat-label">Total Debt</h5>
              <div className="dashboard-stat-value">${userData.totalDebt.toLocaleString()}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="dashboard-stat-card">
            <Card.Body className="text-center">
              <h5 className="dashboard-stat-label">Monthly Cashflow</h5>
              <div className="dashboard-stat-value">
                ${(userData.monthlyIncome - userData.monthlyExpenses).toLocaleString()}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Your Financial Calculators</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                {calculators.map((calculator, index) => (
                  <Col md={6} key={index} className="mb-4">
                    <Card className="h-100 feature-card shadow-sm">
                      <Card.Body className="d-flex flex-column align-items-center text-center p-3">
                        <div className="mb-3">{calculator.icon}</div>
                        <Card.Title className="mb-2">{calculator.title}</Card.Title>
                        <Card.Text className="small mb-3">{calculator.description}</Card.Text>
                        <Link to={calculator.link} className="mt-auto">
                          <Button variant="outline-primary">Open Calculator</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Recent Calculations</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                {userData.recentCalculations.map((calc, index) => (
                  <div key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{calc.type}</h6>
                        <p className="small text-muted mb-0">{calc.date}</p>
                      </div>
                      <div>
                        <span className="badge bg-primary">{calc.result}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <Button variant="outline-primary" size="sm">
                  View All Calculations
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Financial Overview</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5>Income & Expenses</h5>
              <div className="d-flex mb-4">
                <div className="p-3 flex-grow-1 text-center me-2" style={{ backgroundColor: 'rgba(75, 192, 192, 0.2)' }}>
                  <h6>Monthly Income</h6>
                  <div className="fw-bold">${userData.monthlyIncome.toLocaleString()}</div>
                </div>
                <div className="p-3 flex-grow-1 text-center" style={{ backgroundColor: 'rgba(255, 99, 132, 0.2)' }}>
                  <h6>Monthly Expenses</h6>
                  <div className="fw-bold">${userData.monthlyExpenses.toLocaleString()}</div>
                </div>
              </div>
              <p>
                Your monthly cash flow is <strong>${(userData.monthlyIncome - userData.monthlyExpenses).toLocaleString()}</strong>. 
                Consider setting aside at least 20% of your income for savings and investments.
              </p>
            </Col>
            <Col md={6}>
              <h5>Debt to Assets Ratio</h5>
              <div className="d-flex mb-4">
                <div className="p-3 flex-grow-1 text-center me-2" style={{ backgroundColor: 'rgba(75, 192, 192, 0.2)' }}>
                  <h6>Total Assets</h6>
                  <div className="fw-bold">${(userData.netWorth + userData.totalDebt).toLocaleString()}</div>
                </div>
                <div className="p-3 flex-grow-1 text-center" style={{ backgroundColor: 'rgba(255, 99, 132, 0.2)' }}>
                  <h6>Total Debt</h6>
                  <div className="fw-bold">${userData.totalDebt.toLocaleString()}</div>
                </div>
              </div>
              <p>
                Your debt-to-assets ratio is <strong>
                  {Math.round((userData.totalDebt / (userData.netWorth + userData.totalDebt)) * 100)}%
                </strong>. 
                A lower ratio indicates better financial health.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Next Steps</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="mb-3">
                  <Card className="h-100 border-light">
                    <Card.Body>
                      <h5>Complete Your Profile</h5>
                      <p className="small">Finish setting up your financial profile to get more personalized recommendations.</p>
                      <Button variant="outline-primary" size="sm">Update Profile</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-3">
                  <Card className="h-100 border-light">
                    <Card.Body>
                      <h5>Set Financial Goals</h5>
                      <p className="small">Define your short-term and long-term financial goals to track your progress.</p>
                      <Button variant="outline-primary" size="sm">Set Goals</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-3">
                  <Card className="h-100 border-light">
                    <Card.Body>
                      <h5>Review Your Investments</h5>
                      <p className="small">Analyze your current investment portfolio and explore optimization opportunities.</p>
                      <Button variant="outline-primary" size="sm">Review Investments</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;