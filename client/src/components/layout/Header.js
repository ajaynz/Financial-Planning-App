import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Financial Planner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {currentUser && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
            
            <NavDropdown title="Calculators" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/calculators/interest">
                Interest & Savings
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calculators/net-worth">
                Net Worth
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calculators/pension">
                Pension Simulator
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calculators/retirement">
                Retirement Planning
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calculators/loan">
                Loan Repayment
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calculators/emergency-fund">
                Emergency Fund
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                <Navbar.Text className="me-3">
                  Welcome, {currentUser.name}
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="me-2">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="outline-light">Register</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;