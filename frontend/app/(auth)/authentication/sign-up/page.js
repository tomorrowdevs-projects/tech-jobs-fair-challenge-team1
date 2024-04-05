'use client'

// import node module libraries
import { useCallback } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { isValidNumber } from 'libphonenumber-js'
// import hooks
import useMounted from 'hooks/useMounted';

import InputPhone from '../../../../components/InputPhone';

const SignUp = () => {
  const hasMounted = useMounted();

  const {
    register,
    watch,
    setValue,
    handleSubmit,    
    formState: { errors },
  } = useForm({ 
    resolver: yupResolver(yup.object({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      password: yup.string().min(6).required(),      
      passwordConfirm: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
      phoneNumber: yup.string()
    })) 
  })

  const onSubmit = useCallback(data => {
    // TODO: api integration
    console.log(data)
    // console.log(isValidNumber(data.phoneNumber))
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
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted && 
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              {/* Firstname */}
              <Form.Group className="mb-3" controlId="firstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Firstname"        
                  isInvalid={errors.firstname}                  
                  {...register('firstname')}             
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstname?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* lastname */}
              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lastname"        
                  isInvalid={errors.lastname}
                  {...register('lastname')}             
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastname?.message}
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

              {/* Confirm Password */}
              <Form.Group className="mb-3" controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**************"
                  isInvalid={errors.passwordConfirm}
                  {...register('passwordConfirm')}                       
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirm?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <InputPhone 
                  defaultCountry='us'
                  isInvalid={errors.phoneNumber}                  
                  value={watch("phoneNumber")}
                  onChange={data => setValue("phoneNumber", data)}
                  name="phoneNumber"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber?.message}
                </Form.Control.Feedback>
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