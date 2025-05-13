import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { calculateRetirement } from '../../utils/financialCalculators';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RetirementPlanner = () => {
  const [formData, setFormData] = useState({
    currentAge: 35,
    retirementAge: 65,
    lifeExpectancy: 90,
    currentSavings: 50000,
    monthlyContribution: 1000,
    annualReturn: 7,
    inflationRate: 2.5,
    desiredIncome: 70000,
    socialSecurity: 24000
  });

  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    });
  };

  const calculateResults = () => {
    const result = calculateRetirement(
      formData.currentAge,
      formData.retirementAge,
      formData.lifeExpectancy,
      formData.currentSavings,
      formData.monthlyContribution,
      formData.annualReturn / 100,
      formData.inflationRate / 100,
      formData.desiredIncome,
      formData.socialSecurity
    );

    setResults(result);
    generateChartData();
  };

  const generateChartData = () => {
    // Extract parameters
    const {
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentSavings,
      monthlyContribution,
      annualReturn,
      inflationRate,
      desiredIncome,
      socialSecurity
    } = formData;

    // Convert rates to decimals
    const annualReturnRate = annualReturn / 100;
    const inflationRateDecimal = inflationRate / 100;

    // Generate data for chart
    const labels = [];
    const savingsData = [];
    const contributionsData = [];
    const retirementIncomeData = [];

    // Initialize values
    let age = currentAge;
    let savings = currentSavings;
    let totalContributions = currentSavings;
    let annualContribution = monthlyContribution * 12;

    // Pre-retirement phase (accumulation)
    while (age <= lifeExpectancy) {
      labels.push(age);

      if (age < retirementAge) {
        // Accumulation phase
        savingsData.push(savings);
        contributionsData.push(totalContributions);
        retirementIncomeData.push(0); // No retirement income yet

        // Update for next year
        savings = savings * (1 + annualReturnRate) + annualContribution;
        totalContributions += annualContribution;
      } else {
        // Distribution phase
        // Adjust desired income for inflation
        const yearsInRetirement = age - retirementAge;
        const inflationAdjustedIncome = desiredIncome * Math.pow(1 + inflationRateDecimal, yearsInRetirement);
        const inflationAdjustedSocialSecurity = socialSecurity * Math.pow(1 + inflationRateDecimal, yearsInRetirement);
        
        // Annual withdrawal needed
        const annualWithdrawal = inflationAdjustedIncome - inflationAdjustedSocialSecurity;
        
        retirementIncomeData.push(annualWithdrawal);
        savingsData.push(Math.max(0, savings));
        contributionsData.push(totalContributions);
        
        // Update savings after withdrawal
        savings = Math.max(0, (savings - annualWithdrawal) * (1 + annualReturnRate));
      }
      
      age++;
    }

    // Create chart data
    const data = {
      labels,
      datasets: [
        {
          label: 'Retirement Savings',
          data: savingsData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.1
        },
        {
          label: 'Total Contributions',
          data: contributionsData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1,
          borderDash: [5, 5]
        },
        {
          label: 'Annual Withdrawal',
          data: retirementIncomeData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1,
          yAxisID: 'y1'
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

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Retirement Planning Calculator</h1>
      <p className="text-center mb-5">
        Estimate your retirement savings needs based on your desired lifestyle and current savings rate.
      </p>

      <Row>
        <Col lg={5}>
          <Card className="shadow calculator-container">
            <Card.Body>
              <h3 className="calculator-title">Retirement Parameters</h3>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Age</Form.Label>
                      <Form.Control
                        type="number"
                        name="currentAge"
                        value={formData.currentAge}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Retirement Age</Form.Label>
                      <Form.Control
                        type="number"
                        name="retirementAge"
                        value={formData.retirementAge}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Life Expectancy</Form.Label>
                      <Form.Control
                        type="number"
                        name="lifeExpectancy"
                        value={formData.lifeExpectancy}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="mt-4 mb-3">Current Savings</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Retirement Savings</Form.Label>
                      <Form.Control
                        type="number"
                        name="currentSavings"
                        value={formData.currentSavings}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Monthly Contribution</Form.Label>
                      <Form.Control
                        type="number"
                        name="monthlyContribution"
                        value={formData.monthlyContribution}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="mt-4 mb-3">Growth & Inflation</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expected Annual Return (%)</Form.Label>
                      <Form.Control
                        type="number"
                        name="annualReturn"
                        value={formData.annualReturn}
                        onChange={handleChange}
                        step="0.1"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Inflation Rate (%)</Form.Label>
                      <Form.Control
                        type="number"
                        name="inflationRate"
                        value={formData.inflationRate}
                        onChange={handleChange}
                        step="0.1"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="mt-4 mb-3">Retirement Income</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Desired Annual Income</Form.Label>
                      <Form.Control
                        type="number"
                        name="desiredIncome"
                        value={formData.desiredIncome}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        In today's dollars
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expected Social Security</Form.Label>
                      <Form.Control
                        type="number"
                        name="socialSecurity"
                        value={formData.socialSecurity}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        Annual amount in today's dollars
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  className="w-100 mt-4"
                  onClick={calculateResults}
                >
                  Calculate Retirement Plan
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          {results && (
            <div className="calculator-container shadow">
              <h3 className="calculator-title">Retirement Projection</h3>

              <div className="result-container mb-4">
                <Row>
                  <Col md={8}>
                    <p>Years until retirement:</p>
                    <p>Expected years in retirement:</p>
                    <p>Total retirement savings at age {formData.retirementAge}:</p>
                    <p>Required savings for desired income:</p>
                    {results.savingsShortfall > 0 && (
                      <p className="text-danger">Projected shortfall:</p>
                    )}
                    <p>Current monthly contribution:</p>
                    <p className="fw-bold">Suggested monthly contribution:</p>
                  </Col>
                  <Col md={4} className="text-end">
                    <p>{results.yearsToRetirement} years</p>
                    <p>{results.yearsInRetirement} years</p>
                    <p>{formatCurrency(results.totalRetirementSavings)}</p>
                    <p>{formatCurrency(results.requiredSavings)}</p>
                    {results.savingsShortfall > 0 && (
                      <p className="text-danger">{formatCurrency(results.savingsShortfall)}</p>
                    )}
                    <p>{formatCurrency(results.currentMonthlyContribution)}</p>
                    <p className="fw-bold result-value">{formatCurrency(results.suggestedMonthlyContribution)}</p>
                  </Col>
                </Row>
              </div>

              {chartData && (
                <div>
                  <h4 className="mb-3">Retirement Savings Projection</h4>
                  <div style={{ height: '350px' }} className="mb-4">
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
                              text: 'Savings Balance'
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
                              text: 'Annual Withdrawal'
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
                    <h4>Retirement Income Sources</h4>
                    <div className="d-flex mt-3">
                      <div className="p-3 flex-grow-1 text-center me-2" style={{ backgroundColor: 'rgba(75, 192, 192, 0.2)' }}>
                        <h6>Retirement Savings Withdrawals</h6>
                        <div className="fw-bold">
                          {formatCurrency(formData.desiredIncome - formData.socialSecurity)} / year
                        </div>
                        <div>
                          {Math.round(((formData.desiredIncome - formData.socialSecurity) / formData.desiredIncome) * 100)}% of income
                        </div>
                      </div>
                      <div className="p-3 flex-grow-1 text-center" style={{ backgroundColor: 'rgba(53, 162, 235, 0.2)' }}>
                        <h6>Social Security</h6>
                        <div className="fw-bold">
                          {formatCurrency(formData.socialSecurity)} / year
                        </div>
                        <div>
                          {Math.round((formData.socialSecurity / formData.desiredIncome) * 100)}% of income
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4>Retirement Planning Tips</h4>
                    <ul className="mt-3">
                      <li>Consider increasing your savings rate if there's a projected shortfall.</li>
                      <li>Review your investment strategy to ensure it aligns with your retirement timeline.</li>
                      <li>Diversify your retirement accounts (401(k), IRA, Roth IRA) for tax advantages.</li>
                      <li>Reassess your retirement plan annually or when major life events occur.</li>
                      <li>Consider consulting with a financial advisor for personalized retirement planning.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RetirementPlanner;