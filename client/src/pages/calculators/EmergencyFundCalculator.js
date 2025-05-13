import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar } from 'react-bootstrap';
import { calculateEmergencyFund } from '../../utils/financialCalculators';

const EmergencyFundCalculator = () => {
  const [formData, setFormData] = useState({
    housingExpense: 1500,
    utilitiesExpense: 300,
    foodExpense: 600,
    transportationExpense: 400,
    healthcareExpense: 300,
    debtPaymentsExpense: 500,
    otherExpenses: 300,
    desiredMonthsCoverage: 6,
    currentSavings: 5000
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    });
  };

  const calculateResults = () => {
    // Calculate total monthly expenses
    const monthlyExpenses = 
      formData.housingExpense + 
      formData.utilitiesExpense + 
      formData.foodExpense + 
      formData.transportationExpense + 
      formData.healthcareExpense + 
      formData.debtPaymentsExpense + 
      formData.otherExpenses;
    
    const result = calculateEmergencyFund(
      monthlyExpenses,
      formData.desiredMonthsCoverage,
      formData.currentSavings
    );
    
    setResults(result);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const getProgressBarVariant = (percentage) => {
    if (percentage < 25) return 'danger';
    if (percentage < 50) return 'warning';
    if (percentage < 75) return 'info';
    return 'success';
  };

  // Calculate total expenses for the form
  const totalMonthlyExpenses = 
    formData.housingExpense + 
    formData.utilitiesExpense + 
    formData.foodExpense + 
    formData.transportationExpense + 
    formData.healthcareExpense + 
    formData.debtPaymentsExpense + 
    formData.otherExpenses;

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Emergency Fund Calculator</h1>
      <p className="text-center mb-5">
        Determine how much you should save for emergencies based on your monthly expenses.
      </p>

      <Row>
        <Col lg={6}>
          <Card className="shadow calculator-container">
            <Card.Body>
              <h3 className="calculator-title">Monthly Expenses</h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Housing (Rent/Mortgage)</Form.Label>
                  <Form.Control
                    type="number"
                    name="housingExpense"
                    value={formData.housingExpense}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Utilities (Electric, Water, Internet)</Form.Label>
                  <Form.Control
                    type="number"
                    name="utilitiesExpense"
                    value={formData.utilitiesExpense}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Food & Groceries</Form.Label>
                  <Form.Control
                    type="number"
                    name="foodExpense"
                    value={formData.foodExpense}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Transportation</Form.Label>
                  <Form.Control
                    type="number"
                    name="transportationExpense"
                    value={formData.transportationExpense}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Healthcare</Form.Label>
                  <Form.Control
                    type="number"
                    name="healthcareExpense"
                    value={formData.healthcareExpense}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Minimum Debt Payments</Form.Label>
                  <Form.Control
                    type="number"
                    name="debtPaymentsExpense"
                    value={formData.debtPaymentsExpense}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Other Essential Expenses</Form.Label>
                  <Form.Control
                    type="number"
                    name="otherExpenses"
                    value={formData.otherExpenses}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="alert alert-info">
                  <strong>Total Monthly Expenses:</strong> {formatCurrency(totalMonthlyExpenses)}
                </div>

                <hr className="my-4" />

                <Form.Group className="mb-3">
                  <Form.Label>Desired Months of Coverage</Form.Label>
                  <Form.Select
                    name="desiredMonthsCoverage"
                    value={formData.desiredMonthsCoverage}
                    onChange={handleChange}
                  >
                    <option value="3">3 months (minimum recommended)</option>
                    <option value="6">6 months (standard recommendation)</option>
                    <option value="9">9 months (conservative)</option>
                    <option value="12">12 months (very conservative)</option>
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Financial experts typically recommend 3-6 months of expenses, or more if you have irregular income.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Current Emergency Savings</Form.Label>
                  <Form.Control
                    type="number"
                    name="currentSavings"
                    value={formData.currentSavings}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={calculateResults}
                >
                  Calculate Emergency Fund
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          {results ? (
            <Card className="shadow calculator-container h-100">
              <Card.Body>
                <h3 className="calculator-title">Your Emergency Fund</h3>

                <div className="result-container mb-4">
                  <Row className="mb-3">
                    <Col sm={8}>
                      <h5>Monthly Expenses:</h5>
                    </Col>
                    <Col sm={4} className="text-end">
                      <h5>{formatCurrency(results.monthlyExpenses)}</h5>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col sm={8}>
                      <h5>Recommended Emergency Fund:</h5>
                      <small className="text-muted">({formData.desiredMonthsCoverage} months of expenses)</small>
                    </Col>
                    <Col sm={4} className="text-end">
                      <h5 className="result-value">{formatCurrency(results.requiredFund)}</h5>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col sm={8}>
                      <h5>Current Savings:</h5>
                    </Col>
                    <Col sm={4} className="text-end">
                      <h5>{formatCurrency(results.currentSavings)}</h5>
                    </Col>
                  </Row>
                  
                  {results.shortfall > 0 && (
                    <Row className="mb-3">
                      <Col sm={8}>
                        <h5>Shortfall:</h5>
                      </Col>
                      <Col sm={4} className="text-end">
                        <h5 className="text-danger">{formatCurrency(results.shortfall)}</h5>
                      </Col>
                    </Row>
                  )}
                </div>

                <div className="mb-4">
                  <h5>Emergency Fund Progress</h5>
                  <ProgressBar 
                    now={results.fundingPercentage} 
                    label={`${results.fundingPercentage}%`}
                    variant={getProgressBarVariant(results.fundingPercentage)}
                    className="mb-2"
                    style={{ height: '25px' }}
                  />
                  <div className="d-flex justify-content-between">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {results.shortfall > 0 && (
                  <div className="mb-4">
                    <h5>Savings Plan</h5>
                    <p>To reach your emergency fund goal, you could save:</p>
                    <Row>
                      <Col sm={6} className="mb-2">
                        <Card className="text-center p-2">
                          <h6>In 6 months</h6>
                          <div className="fw-bold">
                            {formatCurrency(results.shortfall / 6)} /month
                          </div>
                        </Card>
                      </Col>
                      <Col sm={6} className="mb-2">
                        <Card className="text-center p-2">
                          <h6>In 12 months</h6>
                          <div className="fw-bold">
                            {formatCurrency(results.shortfall / 12)} /month
                          </div>
                        </Card>
                      </Col>
                      <Col sm={6} className="mb-2">
                        <Card className="text-center p-2">
                          <h6>In 18 months</h6>
                          <div className="fw-bold">
                            {formatCurrency(results.shortfall / 18)} /month
                          </div>
                        </Card>
                      </Col>
                      <Col sm={6} className="mb-2">
                        <Card className="text-center p-2">
                          <h6>In 24 months</h6>
                          <div className="fw-bold">
                            {formatCurrency(results.shortfall / 24)} /month
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                )}

                <div className="mt-4">
                  <h5>Emergency Fund Tips</h5>
                  <ul>
                    <li>Keep your emergency fund in a high-yield savings account for easy access.</li>
                    <li>Only use your emergency fund for true emergencies: job loss, medical expenses, or critical home/car repairs.</li>
                    <li>If you use your emergency fund, make it a priority to replenish it.</li>
                    <li>Review and adjust your emergency fund as your expenses or income change.</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card className="shadow calculator-container h-100">
              <Card.Body className="d-flex align-items-center justify-content-center text-center">
                <div>
                  <h4>Calculate Your Emergency Fund</h4>
                  <p>Enter your monthly expenses and click "Calculate Emergency Fund" to see how much you should save.</p>
                  <div className="mt-4">
                    <h5>Why Have an Emergency Fund?</h5>
                    <p>An emergency fund helps you handle unexpected expenses without going into debt. It provides financial security and peace of mind.</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EmergencyFundCalculator;