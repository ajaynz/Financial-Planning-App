import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');

  // Redirect to the page they tried to visit or to dashboard
  const redirectPath = location.state?.from || '/dashboard';

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const success = await login(values.email, values.password);
      if (success) {
        navigate(redirectPath);
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (err) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Login</h2>
              {loginError && <Alert variant="danger">{loginError}</Alert>}
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 py-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                  </Form>
                )}
              </Formik>
              <div className="text-center mt-3">
                Don't have an account?{' '}
                <Link to="/register">Register here</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;