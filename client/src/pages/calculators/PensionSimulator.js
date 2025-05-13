import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { calculatePension } from '../../utils/financialCalculators';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PensionSimulator = () => {
  const [formData, setFormData] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSalary: 60000,
    contributionPercent: 8,
    employerMatchPercent: 4,
    annualSalaryIncrease: 3,
    annualReturnRate: 7,
    currentPensionValue: 25000
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
    const result = calculatePension(
      formData.currentSalary,
      formData.contributionPercent,
      formData.employerMatchPercent,
      formData.annualSalaryIncrease,
      formData.annualReturnRate,
      formData.currentAge,
      formData.retirementAge,
      formData.currentPensionValue
    );

    setResults(result);
    generateChartData(result);
  };

  const generateChartData = (result) => {
    // Extract data for charts
    const labels = result.yearlyData.map(data => data.year);
    const pensionValues = result.yearlyData.map(data => data.pensionValue);
    const salaryValues = result.yearlyData.map(data => data.salary);
    const employeeContributions = result.yearlyData.map(data => data.employeeContribution);
    const employerContributions = result.yearlyData.map(data => data.employerContribution);
    const investmentReturns = result.yearlyData.map(data => data.investmentReturns);

    // Create chart data
    const data = {
      labels,
      datasets: [
        {
          label: 'Pension Value',
          data: pensionValues,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.1,
          yAxisID: 'y'
        },
        {
          label: 'Annual Salary',
          data: salaryValues,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1,
          yAxisID: 'y1',
          borderDash: [5, 5]
        }
      ]
    };

    // Create contributions chart data
    const contributionsData = {
      labels,
      datasets: [
        {
          label: 'Employee Contributions',
          data: employeeContributions,
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        },
        {
          label: 'Employer Contributions',
          data: employerContributions,
          backgroundColor: 'rgba(53, 162, 235, 0.7)'
        },
        {
          label: 'Investment Returns',
          data: investmentReturns,
          backgroundColor: 'rgba(255, 99, 132, 0.7)'
        }
      ]
    };

    setChartData({ main: data, contributions: contributionsData });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Pension Contribution Simulator</h1>
      <p className="text-center mb-5">
        Simulate your pension growth based on contributions, employer matching, and investment returns.
      </p>

      <Row>
        <Col lg={4}>
          <Card className="shadow calculator-container">
            <Card.Body>
              <h3 className="calculator-title">Pension Parameters</h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Current Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="currentAge"
                    value={formData.currentAge}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Retirement Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="retirementAge"
                    value={formData.retirementAge}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Current Annual Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="currentSalary"
                    value={formData.currentSalary}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Your Contribution (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="contributionPercent"
                    value={formData.contributionPercent}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Employer Match (% of salary)</Form.Label>
                  <Form.Control
                    type="number"
                    name="employerMatchPercent"
                    value={formData.employerMatchPercent}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Annual Salary Increase (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="annualSalaryIncrease"
                    value={formData.annualSalaryIncrease}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Expected Annual Return (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="annualReturnRate"
                    value={formData.annualReturnRate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Current Pension Value</Form.Label>
                  <Form.Control
                    type="number"
                    name="currentPensionValue"
                    value={formData.currentPensionValue}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={calculateResults}
                >
                  Simulate Pension Growth
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {results && (
            <div className="calculator-container shadow">
              <h3 className="calculator-title">Pension Projection</h3>

              <div className="result-container mb-4">
                <Row>
                  <Col md={7}>
                    <p>Years until retirement:</p>
                    <p>Starting pension value:</p>
                    <p>Total employee contributions:</p>
                    <p>Total employer contributions:</p>
                    <p>Total investment returns:</p>
                    <p className="fw-bold">Projected pension at retirement (age {formData.retirementAge}):</p>
                  </Col>
                  <Col md={5} className="text-end">
                    <p>{formData.retirementAge - formData.currentAge} years</p>
                    <p>{formatCurrency(formData.currentPensionValue)}</p>
                    <p>{formatCurrency(results.totalEmployeeContributions)}</p>
                    <p>{formatCurrency(results.totalEmployerContributions)}</p>
                    <p>{formatCurrency(results.totalInvestmentReturns)}</p>
                    <p className="fw-bold result-value">{formatCurrency(results.finalPensionValue)}</p>
                  </Col>
                </Row>
              </div>

              {chartData && (
                <>
                  <h4 className="mb-3">Pension Growth Projection</h4>
                  <div style={{ height: '350px' }} className="mb-4">
                    <Line
                      data={chartData.main}
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
                              text: 'Pension Value'
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
                              text: 'Salary'
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

                  <h4 className="mb-3">Contribution Breakdown</h4>
                  <div className="mb-4">
                    <div className="d-flex">
                      <div className="p-3 flex-grow-1 text-center me-2" style={{ backgroundColor: 'rgba(75, 192, 192, 0.2)' }}>
                        <h6>Your Contributions</h6>
                        <div className="fw-bold">{formatCurrency(results.totalEmployeeContributions)}</div>
                        <div>
                          {Math.round(
                            (results.totalEmployeeContributions / 
                            (results.totalEmployeeContributions + results.totalEmployerContributions + results.totalInvestmentReturns + formData.currentPensionValue)) * 100
                          )}% of total
                        </div>
                      </div>
                      <div className="p-3 flex-grow-1 text-center me-2" style={{ backgroundColor: 'rgba(53, 162, 235, 0.2)' }}>
                        <h6>Employer Contributions</h6>
                        <div className="fw-bold">{formatCurrency(results.totalEmployerContributions)}</div>
                        <div>
                          {Math.round(
                            (results.totalEmployerContributions / 
                            (results.totalEmployeeContributions + results.totalEmployerContributions + results.totalInvestmentReturns + formData.currentPensionValue)) * 100
                          )}% of total
                        </div>
                      </div>
                      <div className="p-3 flex-grow-1 text-center" style={{ backgroundColor: 'rgba(255, 99, 132, 0.2)' }}>
                        <h6>Investment Returns</h6>
                        <div className="fw-bold">{formatCurrency(results.totalInvestmentReturns)}</div>
                        <div>
                          {Math.round(
                            (results.totalInvestmentReturns / 
                            (results.totalEmployeeContributions + results.totalEmployerContributions + results.totalInvestmentReturns + formData.currentPensionValue)) * 100
                          )}% of total
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="mb-3">Yearly Breakdown</h4>
                  <div className="table-responsive">
                    <Table striped hover responsive size="sm">
                      <thead>
                        <tr>
                          <th>Age</th>
                          <th>Annual Salary</th>
                          <th>Your Contribution</th>
                          <th>Employer Match</th>
                          <th>Investment Returns</th>
                          <th>Pension Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.yearlyData
                          .filter((_, index) => index % 5 === 0 || index === results.yearlyData.length - 1) // Show every 5 years and the final year
                          .map((year, index) => (
                            <tr key={index}>
                              <td>{year.year}</td>
                              <td>{formatCurrency(year.salary)}</td>
                              <td>{formatCurrency(year.employeeContribution)}</td>
                              <td>{formatCurrency(year.employerContribution)}</td>
                              <td>{formatCurrency(year.investmentReturns)}</td>
                              <td>{formatCurrency(year.pensionValue)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PensionSimulator;