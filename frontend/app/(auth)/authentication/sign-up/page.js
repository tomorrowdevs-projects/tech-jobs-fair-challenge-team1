'use client'

// import node module libraries
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Link from 'next/link';

// import hooks
import useMounted from 'hooks/useMounted';

const SignUp = () => {
  const hasMounted = useMounted();
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <h1>
                <Link href="/">TechSolutions Inc</Link>
              </h1>              
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted && 
            <Form>
              {/* Firstname */}
              <Form.Group className="mb-3" controlId="firstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control type="text" name="firstname" placeholder="Firstname" required />
              </Form.Group>

              {/* lastname */}
              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control type="text" name="lastname" placeholder="Lastname" required />
              </Form.Group>              

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="**************" required />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirmPassword" placeholder="**************" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" name="phoneNumber" placeholder="Phone number" />
                <Form.Text id="phoneNumberBlock" muted>
                  Phone number is not required but is strongly recommended.
                </Form.Text>
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">Complete registration</Button>
              </div>               
            </Form>
            }
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default SignUp