'use client'

import {useCallback, useContext} from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import useMounted from 'hooks/useMounted';
import {AuthContext} from "../../../../context/AuthContext";
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const hasMounted = useMounted();
  const router = useRouter();

  const {
    register,
    handleSubmit,    
    formState: { errors },
  } = useForm({ 
    resolver: yupResolver(yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(5).required()
    })) ,
    defaultValues: {
      email: 'maintainer@maintainer.com',
      password: 'maintainer'
    }
  })
  const { login,user } = useContext(AuthContext);


  const onSubmit = useCallback(async data => {
    await login(data.email, data.password)
    if(user.role === 'user') router.push('/contacts')
    else
    router.push('/')

  }, [login])
  
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

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="**************"
                    isInvalid={errors.password}
                    {...register('password')}                       
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <div className="d-md-flex flex-column justify-content-center">
                  {/* Button */}
                  <Button variant="primary" type="submit">Sign In</Button>
                  <div className="mt-4 text-center">                    
                    <Link href="/authentication/forget-password" className="text-inherit fs-5">
                      <small>Forgot your password?</small>
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


export default SignIn
