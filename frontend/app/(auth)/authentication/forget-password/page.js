'use client'

import { useCallback } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

import useMounted from 'hooks/useMounted';

const ForgetPassword = () => {
  const hasMounted = useMounted();

  const {
    register,
    handleSubmit,    
    formState: { errors },
  } = useForm({ 
    resolver: yupResolver(yup.object({
      email: yup.string().email().required()
    })) 
  })

  const onSubmit = useCallback(data => {
    // TODO: api integration
    console.log(data)
  }, [])

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
              <p className="mb-6">Don&apos;t worry, we&apos;ll send you an email to reset your password.</p>
            </div>
            {/* Form */}
            {hasMounted && 
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter address here"
                  isInvalid={errors.email}
                  {...register('email')}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-md-flex flex-column justify-content-center">                
                <Button variant="primary" type="submit">Reset Password</Button>
                <div className="mt-4 text-center">                    
                  <Link href="/authentication/sign-in" className="text-inherit fs-5">
                    <small>Back to login page</small>
                  </Link>                    
                </div>
              </div>
            </Form>
            }
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ForgetPassword