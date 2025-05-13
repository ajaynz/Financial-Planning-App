import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, Modal } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { calculateNetWorth } from '../../utils/financialCalculators';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const NetWorthCalculator = () => {
  const { currentUser } = useContext(AuthContext);

  // Asset and liability categories
  const assetCategories = [
    'Cash & Bank Accounts',
    'Investments',
    'Real Estate',
    'Vehicles',
    'Personal Property',
    'Business Interests',
    'Other Assets'
  ];

  const liabilityCategories = [
    'Mortgages',
    'Car Loans',
    'Student Loans',
    'Credit Cards',
    'Personal Loans',
    'Medical Debt',
    'Other Debts'
  ];

  // State for assets and liabilities
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [netWorthResults, setNetWorthResults] = useState(null);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('asset'); // 'asset' or 'liability'
  const [currentItem, setCurrentItem] = useState({ name: '', value: '', category: '' });
  const [editIndex, setEditIndex] = useState(null); // For editing existing items

  // Handle input change for the modal form
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: name === 'value' ? parseFloat(value) || 0 : value });
  };

  // Open modal for adding a new item
  const openAddModal = (type) => {
    setModalType(type);
    setCurrentItem({ name: '', value: '', category: type === 'asset' ? assetCategories[0] : liabilityCategories[0] });
    setEditIndex(null);
    setShowModal(true);
  };

  // Open modal for editing an existing item
  const openEditModal = (type, index) => {
    setModalType(type);
    setCurrentItem(type === 'asset' ? assets[index] : liabilities[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  // Save item from modal
  const saveItem = () => {
    if (currentItem.name.trim() === '') {
      alert('Please enter a name for the item');
      return;
    }

    if (modalType === 'asset') {
      if (editIndex !== null) {
        // Update existing asset
        const updatedAssets = [...assets];
        updatedAssets[editIndex] = currentItem;
        setAssets(updatedAssets);
      } else {
        // Add new asset
        setAssets([...assets, currentItem]);
      }
    } else {
      if (editIndex !== null) {
        // Update existing liability
        const updatedLiabilities = [...liabilities];
        updatedLiabilities[editIndex] = currentItem;
        setLiabilities(updatedLiabilities);
      } else {
        // Add new liability
        setLiabilities([...liabilities, currentItem]);
      }
    }

    setShowModal(false);
    calculateNetWorthNow();
  };

  // Delete an item
  const deleteItem = (type, index) => {
    if (type === 'asset') {
      const updatedAssets = assets.filter((_, i) => i !== index);
      setAssets(updatedAssets);
    } else {
      const updatedLiabilities = liabilities.filter((_, i) => i !== index);
      setLiabilities(updatedLiabilities);
    }
    calculateNetWorthNow();
  };

  // Calculate net worth
  const calculateNetWorthNow = () => {
    if (assets.length === 0 && liabilities.length === 0) {
      setNetWorthResults(null);
      return;
    }

    const results = calculateNetWorth(assets, liabilities);
    setNetWorthResults(results);
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  // Generate chart data
  const generateChartData = (data, label) => {
    const backgroundColors = [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(199, 199, 199, 0.7)'
    ];

    return {
      labels: data.map(item => item.category),
      datasets: [
        {
          label,
          data: data.map(item => item.value),
          backgroundColor: backgroundColors.slice(0, data.length),
          borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
          borderWidth: 1
        }
      ]
    };
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Net Worth Calculator</h1>
      <p className="text-center mb-5">
        Track your assets and liabilities to calculate your total net worth.
      </p>

      <Row className="mb-5">
        <Col md={6}>
          <Card className="calculator-container shadow h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="calculator-title">Assets</h3>
                <Button variant="success" onClick={() => openAddModal('asset')}>
                  Add Asset
                </Button>
              </div>

              {assets.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Value</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset, index) => (
                      <tr key={`asset-${index}`}>
                        <td>{asset.name}</td>
                        <td>{asset.category}</td>
                        <td>{formatCurrency(asset.value)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                            onClick={() => openEditModal('asset', index)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteItem('asset', index)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center p-4 bg-light rounded">
                  <p className="mb-0">No assets added yet. Click "Add Asset" to get started.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="calculator-container shadow h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="calculator-title">Liabilities</h3>
                <Button variant="warning" onClick={() => openAddModal('liability')}>
                  Add Liability
                </Button>
              </div>

              {liabilities.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Value</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liabilities.map((liability, index) => (
                      <tr key={`liability-${index}`}>
                        <td>{liability.name}</td>
                        <td>{liability.category}</td>
                        <td>{formatCurrency(liability.value)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                            onClick={() => openEditModal('liability', index)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteItem('liability', index)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center p-4 bg-light rounded">
                  <p className="mb-0">No liabilities added yet. Click "Add Liability" to get started.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {netWorthResults && (
        <Row className="mb-5">
          <Col md={12}>
            <Card className="calculator-container shadow">
              <Card.Body>
                <h3 className="calculator-title">Net Worth Summary</h3>
                <Row className="mb-4">
                  <Col md={4}>
                    <div className="p-3 text-center rounded" style={{ backgroundColor: 'rgba(75, 192, 192, 0.2)' }}>
                      <h4>Total Assets</h4>
                      <h2 className="text-success">{formatCurrency(netWorthResults.totalAssets)}</h2>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3 text-center rounded" style={{ backgroundColor: 'rgba(255, 99, 132, 0.2)' }}>
                      <h4>Total Liabilities</h4>
                      <h2 className="text-danger">{formatCurrency(netWorthResults.totalLiabilities)}</h2>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="p-3 text-center rounded" style={{ backgroundColor: netWorthResults.netWorth >= 0 ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 159, 64, 0.2)' }}>
                      <h4>Net Worth</h4>
                      <h2 className={netWorthResults.netWorth >= 0 ? 'text-primary' : 'text-warning'}>
                        {formatCurrency(netWorthResults.netWorth)}
                      </h2>
                    </div>
                  </Col>
                </Row>

                <Row>
                  {netWorthResults.assetsByCategory.length > 0 && (
                    <Col md={6}>
                      <h4 className="text-center mb-3">Assets by Category</h4>
                      <div style={{ height: '300px' }}>
                        <Pie 
                          data={generateChartData(netWorthResults.assetsByCategory, 'Assets')} 
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    let label = context.label || '';
                                    label += ': ';
                                    label += formatCurrency(context.raw);
                                    return label;
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </Col>
                  )}
                  
                  {netWorthResults.liabilitiesByCategory.length > 0 && (
                    <Col md={6}>
                      <h4 className="text-center mb-3">Liabilities by Category</h4>
                      <div style={{ height: '300px' }}>
                        <Pie 
                          data={generateChartData(netWorthResults.liabilitiesByCategory, 'Liabilities')} 
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    let label = context.label || '';
                                    label += ': ';
                                    label += formatCurrency(context.raw);
                                    return label;
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {currentUser && (
        <div className="text-center mt-4">
          <Button variant="outline-primary" size="lg">
            Save Net Worth Calculation
          </Button>
        </div>
      )}

      {/* Modal for adding/editing assets and liabilities */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? 'Edit' : 'Add'} {modalType === 'asset' ? 'Asset' : 'Liability'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentItem.name}
                onChange={handleModalInputChange}
                placeholder={`Enter ${modalType} name`}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={currentItem.category}
                onChange={handleModalInputChange}
              >
                {(modalType === 'asset' ? assetCategories : liabilityCategories).map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="number"
                name="value"
                value={currentItem.value}
                onChange={handleModalInputChange}
                placeholder={`Enter ${modalType} value`}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveItem}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NetWorthCalculator;