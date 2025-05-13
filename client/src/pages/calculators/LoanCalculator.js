import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { calculateLoanPayments } from '../../utils/financialCalculators';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LoanCalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: 200000,
    interestRate: 4.5,
    loanTerm: 30,
    loanType: 'mortgage'
  });

  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    });
  };

  const calculateResults = () => {
    const { loanAmount, interestRate, loanTerm } = formData;
    
    // Convert interest rate to decimal
    const rateDecimal = interestRate / 100;
    
    const result = calculateLoanPayments(loanAmount, rateDecimal, loanTerm);
    setResults(result);
    
    // Generate chart data
    generateChartData(result);
  };

  const generateChartData = (result) => {
    // Extract data for chart
    const labels = [];
    const principalData = [];
    const interestData = [];
    const balanceData = [];
    
    // Group data by year for better visualization
    const yearlyData = [];
    const yearsCount = formData.loanTerm;
    const paymentsPerYear = 12;
    
    for (let year = 1; year <= yearsCount; year++) {
      labels.push(`Year ${year}`);
      
      const yearIndex = year * paymentsPerYear - 1;
      if (result.schedule[yearIndex]) {
        balanceData.push(result.schedule[yearIndex].balance);
        
        // Calculate total principal and interest for this year
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;
        
        for (let month = (year - 1) * paymentsPerYear; month < year * paymentsPerYear && month < result.schedule.length; month++) {
          yearlyPrincipal += result.schedule[month].principalPayment;
          yearlyInterest += result.schedule[month].interestPayment;
        }
        
        principalData.push(yearlyPrincipal);
        interestData.push(yearlyInterest);
        
        yearlyData.push({
          year,
          principal: yearlyPrincipal,
          interest: yearlyInterest,
          balance: result.schedule[yearIndex].balance
        });
      }
    }
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Remaining Balance',
          data: balanceData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y'
        },
        {
          label: 'Principal Paid',
          data: principalData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          yAxisID: 'y1',
          type: 'bar'
        },
        {
          label: 'Interest Paid',
          data: interestData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y1',
          type: 'bar'
        }
      ]
    };
    
    setChartData(data);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const getLoanTypeLabel = () => {
    switch (formData.loanType) {
      case 'mortgage':
        return 'Mortgage';
      case 'auto':
        return 'Auto Loan';
      case 'personal':
        return 'Personal Loan';
      case 'student':
        return 'Student Loan';
      default:
        return 'Loan';
    }
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Loan Repayment Calculator</h1>
      <p className="text-center mb-5">
        Calculate mortgage, auto loan, and personal loan payments with amortization schedules.
      </p>

      <Row>
        <Col lg={4}>
          <Card className="shadow calculator-container">
            <Card.Body>
              <h3 className="calculator-title">{getLoanTypeLabel()} Details</h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Loan Type</Form.Label>
                  <Form.Select
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                  >
                    <option value="mortgage">Mortgage</option>
                    <option value="auto">Auto Loan</option>
                    <option value="personal">Personal Loan</option>
                    <option value="student">Student Loan</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Loan Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Interest Rate (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                    step="0.01"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Loan Term (years)</Form.Label>
                  <Form.Control
                    type="number"
                    name="loanTerm"
                    value={formData.loanTerm}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={calculateResults}
                >
                  Calculate
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {results && (
            <div className="calculator-container shadow">
              <h3 className="calculator-title">Loan Summary</h3>
              
              <div className="result-container mb-4">
                <Row>
                  <Col md={6}>
                    <p>Loan Amount:</p>
                    <p>Interest Rate:</p>
                    <p>Loan Term:</p>
                    <p>Monthly Payment:</p>
                    <p>Total Interest:</p>
                    <p className="fw-bold">Total Cost of Loan:</p>
                  </Col>
                  <Col md={6} className="text-end">
                    <p>{formatCurrency(formData.loanAmount)}</p>
                    <p>{formData.interestRate}%</p>
                    <p>{formData.loanTerm} years</p>
                    <p className="fw-bold result-value">{formatCurrency(results.monthlyPayment)}</p>
                    <p>{formatCurrency(results.totalInterest)}</p>
                    <p className="fw-bold">{formatCurrency(results.totalCost)}</p>
                  </Col>
                </Row>
              </div>
              
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4"
              >
                <Tab eventKey="summary" title="Loan Summary">
                  {chartData && (
                    <div className="mt-4">
                      <h4 className="mb-3">Loan Balance & Payments Over Time</h4>
                      <div style={{ height: '400px' }}>
                        <Line
                          data={chartData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            interaction: {
                              mode: 'index',
                              intersect: false,
                            },
                            plugins: {
                              legend: {
                                position: 'top'
                              },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                      label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                      label += formatCurrency(context.parsed.y);
                                    }
                                    return label;
                                  }
                                }
                              }
                            },
                            scales: {
                              y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: {
                                  display: true,
                                  text: 'Remaining Balance'
                                },
                                ticks: {
                                  callback: function(value) {
                                    return formatCurrency(value);
                                  }
                                }
                              },
                              y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                title: {
                                  display: true,
                                  text: 'Payment Amount'
                                },
                                ticks: {
                                  callback: function(value) {
                                    return formatCurrency(value);
                                  }
                                },
                                grid: {
                                  drawOnChartArea: false
                                }
                              }
                            }
                          }}
                        />
                      </div>
                      
                      <div className="mt-4">
                        <h5>Payment Breakdown</h5>
                        <div className="d-flex">
                          <div className="p-3 flex-grow-1 text-center me-2" style={{ backgroundColor: 'rgba(75, 192, 192, 0.2)' }}>
                            <h6>Principal</h6>
                            <div className="fw-bold">{formatCurrency(formData.loanAmount)}</div>
                            <div>{Math.round((formData.loanAmount / results.totalCost) * 100)}% of total</div>
                          </div>
                          <div className="p-3 flex-grow-1 text-center" style={{ backgroundColor: 'rgba(255, 99, 132, 0.2)' }}>
                            <h6>Interest</h6>
                            <div className="fw-bold">{formatCurrency(results.totalInterest)}</div>
                            <div>{Math.round((results.totalInterest / results.totalCost) * 100)}% of total</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Tab>
                
                <Tab eventKey="schedule" title="Amortization Schedule">
                  <div className="table-responsive mt-4">
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Payment</th>
                          <th>Principal</th>
                          <th>Interest</th>
                          <th>Total Interest</th>
                          <th>Remaining Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.schedule
                          .filter((_, index) => (index + 1) % 12 === 0) // Show yearly data
                          .map((payment, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{formatCurrency(results.monthlyPayment)}</td>
                              <td>{formatCurrency(payment.principalPayment)}</td>
                              <td>{formatCurrency(payment.interestPayment)}</td>
                              <td>{formatCurrency(payment.totalInterest)}</td>
                              <td>{formatCurrency(payment.balance)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </Tab>
              </Tabs>
              
              <div className="mt-4">
                <h5>Tips for {getLoanTypeLabel()} Repayment</h5>
                <ul>
                  <li>Making extra payments toward principal can significantly reduce your total interest.</li>
                  <li>Consider refinancing if interest rates have dropped since you obtained your loan.</li>
                  <li>Setting up automatic payments can help ensure you never miss a payment.</li>
                  {formData.loanType === 'mortgage' && (
                    <li>Consider a 15-year mortgage instead of a 30-year to save on interest, if you can afford the higher monthly payments.</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoanCalculator;