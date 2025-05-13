import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, Toast, ToastContainer } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { calculateCompoundInterest, calculateSimpleInterest } from '../../utils/financialCalculators';
import { saveCalculation } from '../../services/calculationService';
import { AuthContext } from '../../contexts/AuthContext';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InterestCalculator = () => {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    principal: 10000,
    interestRate: 5,
    years: 10,
    compoundFrequency: 12, // monthly
    calculationType: 'compound',
    contribution: 0,
    contributionFrequency: 'monthly',
    contributionType: 'end'
  });

  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    });
  };

  const calculateResults = () => {
    const {
      principal,
      interestRate,
      years,
      compoundFrequency,
      calculationType,
      contribution,
      contributionFrequency,
      contributionType
    } = formData;

    // Convert interest rate to decimal
    const rateDecimal = interestRate / 100;

    // Adjust contribution based on frequency
    let adjustedContribution = contribution;
    if (contributionFrequency === 'monthly') {
      adjustedContribution = contribution;
    } else if (contributionFrequency === 'quarterly') {
      adjustedContribution = contribution * 3;
    } else if (contributionFrequency === 'annually') {
      adjustedContribution = contribution * 12;
    }

    let result;
    if (calculationType === 'simple') {
      result = calculateSimpleInterest(principal, rateDecimal, years);
    } else {
      result = calculateCompoundInterest(
        principal,
        rateDecimal,
        years,
        compoundFrequency,
        adjustedContribution,
        contributionType
      );
    }

    setResults(result);

    // Generate chart data
    generateChartData();
  };

  const generateChartData = () => {
    const {
      principal,
      interestRate,
      years,
      compoundFrequency,
      calculationType,
      contribution,
      contributionFrequency,
      contributionType
    } = formData;

    const rateDecimal = interestRate / 100;
    const yearLabels = Array.from({ length: years + 1 }, (_, i) => i);
    const balanceData = [];
    const contributionData = [];
    const interestData = [];

    // Adjust contribution based on frequency
    let adjustedContribution = contribution;
    if (contributionFrequency === 'monthly') {
      adjustedContribution = contribution;
    } else if (contributionFrequency === 'quarterly') {
      adjustedContribution = contribution * 3;
    } else if (contributionFrequency === 'annually') {
      adjustedContribution = contribution * 12;
    }

    let totalContributions = principal;
    balanceData.push(principal);
    contributionData.push(principal);
    interestData.push(0);

    for (let year = 1; year <= years; year++) {
      let yearResult;
      if (calculationType === 'simple') {
        yearResult = calculateSimpleInterest(principal, rateDecimal, year);
        totalContributions = principal;
      } else {
        yearResult = calculateCompoundInterest(
          principal,
          rateDecimal,
          year,
          compoundFrequency,
          adjustedContribution,
          contributionType
        );
        totalContributions = principal + (adjustedContribution * compoundFrequency * year);
      }

      balanceData.push(yearResult.finalAmount);
      contributionData.push(totalContributions);
      interestData.push(yearResult.finalAmount - totalContributions);
    }

    const data = {
      labels: yearLabels,
      datasets: [
        {
          label: 'Total Balance',
          data: balanceData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.1
        },
        {
          label: 'Contributions',
          data: contributionData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1
        },
        {
          label: 'Interest Earned',
          data: interestData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1
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

  // Function to save calculation to user account
  const saveCalculationToAccount = async () => {
    try {
      const calculationData = {
        type: 'interest',
        title: `${formData.calculationType === 'compound' ? 'Compound' : 'Simple'} Interest - $${formData.principal}`,
        parameters: formData,
        results: results
      };
      
      await saveCalculation(calculationData);
      
      setToastMessage('Calculation saved successfully!');
      setToastVariant('success');
      setShowToast(true);
    } catch (error) {
      console.error('Error saving calculation:', error);
      setToastMessage('Failed to save calculation. Please try again.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  return (
    <Container className="py-5">
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={3000} 
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto">Interest Calculator</strong>
          </Toast.Header>
          <Toast.Body className={toastVariant === 'danger' ? 'text-white' : ''}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      
      <h1 className="text-center mb-4">Interest Calculator</h1>
      <p className="text-center mb-5">
        Calculate how your investments can grow over time with our interest calculator.
      </p>

      <Row>
        <Col lg={5}>
          <Card className="shadow calculator-container">
            <Card.Body>
              <h3 className="calculator-title">Calculation Settings</h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Initial Investment</Form.Label>
                  <Form.Control
                    type="number"
                    name="principal"
                    value={formData.principal}
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
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Time Period (years)</Form.Label>
                  <Form.Control
                    type="number"
                    name="years"
                    value={formData.years}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Calculation Type</Form.Label>
                  <Form.Select
                    name="calculationType"
                    value={formData.calculationType}
                    onChange={handleChange}
                  >
                    <option value="simple">Simple Interest</option>
                    <option value="compound">Compound Interest</option>
                  </Form.Select>
                </Form.Group>

                {formData.calculationType === 'compound' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Compound Frequency</Form.Label>
                      <Form.Select
                        name="compoundFrequency"
                        value={formData.compoundFrequency}
                        onChange={handleChange}
                      >
                        <option value={1}>Annually</option>
                        <option value={2}>Semi-Annually</option>
                        <option value={4}>Quarterly</option>
                        <option value={12}>Monthly</option>
                        <option value={365}>Daily</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Regular Contribution</Form.Label>
                      <Form.Control
                        type="number"
                        name="contribution"
                        value={formData.contribution}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    {formData.contribution > 0 && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>Contribution Frequency</Form.Label>
                          <Form.Select
                            name="contributionFrequency"
                            value={formData.contributionFrequency}
                            onChange={handleChange}
                          >
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="annually">Annually</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Contribution Timing</Form.Label>
                          <Form.Select
                            name="contributionType"
                            value={formData.contributionType}
                            onChange={handleChange}
                          >
                            <option value="end">End of Period</option>
                            <option value="start">Beginning of Period</option>
                          </Form.Select>
                        </Form.Group>
                      </>
                    )}
                  </>
                )}

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

        <Col lg={7}>
          {results && (
            <div className="calculator-container shadow">
              <h3 className="calculator-title">Results</h3>
              <div className="result-container mb-4">
                <Row>
                  <Col md={6}>
                    <p>Initial Investment:</p>
                    <p>Interest Earned:</p>
                    <p className="fw-bold">Final Amount:</p>
                  </Col>
                  <Col md={6} className="text-end">
                    <p>{formatCurrency(formData.principal)}</p>
                    <p>{formatCurrency(results.interestEarned)}</p>
                    <p className="fw-bold result-value">{formatCurrency(results.finalAmount)}</p>
                  </Col>
                </Row>
                
                {currentUser && (
                  <div className="text-end mt-3">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => saveCalculationToAccount()}
                    >
                      Save Calculation
                    </Button>
                  </div>
                )}
              </div>

              {formData.calculationType === 'compound' && formData.contribution > 0 && (
                <div className="mb-4">
                  <p>
                    Total Contributions: {formatCurrency(formData.principal + (formData.contribution * formData.compoundFrequency * formData.years))}
                  </p>
                </div>
              )}

              {chartData && (
                <div>
                  <h4 className="mb-3">Growth Projection</h4>
                  <div style={{ height: '300px' }}>
                    <Line
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top'
                          },
                          title: {
                            display: true,
                            text: 'Investment Growth Over Time'
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
                            ticks: {
                              callback: function(value) {
                                return formatCurrency(value);
                              }
                            }
                          }
                        }
                      }}
                    />
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

export default InterestCalculator;