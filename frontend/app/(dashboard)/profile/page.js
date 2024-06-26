'use client'
// import node module libraries
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { Col, Row, Container, Card, Form, Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isValidNumber } from 'libphonenumber-js'

import InputPhone from '../../../components/InputPhone';

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,    
    formState: { errors },
  } = useForm({ 
    resolver: yupResolver(yup.object({
      currentPassword: yup.string().min(6).required(),
      newPassword: yup.string().min(6).required(),      
      newPasswordConfirm: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    })) 
  })

  const onSubmit = useCallback(data => {
    // TODO: api integration
    console.log(data)
  }, [])

  return (
    <Card className="mt-6">
      {/* card body */}
      <Card.Body>
        <Card.Title as="h4">Change password</Card.Title>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* Password */}
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="**************"
              isInvalid={errors.currentPassword}
              {...register('currentPassword')}                       
            />
            <Form.Control.Feedback type="invalid">
              {errors.currentPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {/* Password */}
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="**************"
              isInvalid={errors.newPassword}
              {...register('newPassword')}                       
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3" controlId="newPasswordConfirm">
            <Form.Label>Confirm new Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="**************"
              isInvalid={errors.newPasswordConfirm}
              {...register('newPasswordConfirm')}                       
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPasswordConfirm?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">Change password</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

const Profile = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,    
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@gmail.com',
      phoneNumber: '+390304568798'
    }, 
    resolver: yupResolver(yup.object({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      email: yup.string().email().required(),      
      phoneNumber: yup.string()
    })) 
  })

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const onSubmit = useCallback(data => {
    // TODO: api integration
    console.log(data)
    // console.log(isValidNumber(data.phoneNumber))
  }, [])

  const onDeleteAccountButtonClick = useCallback(data => {
    // TODO: api integration
    alert('Delete account')
  }, [])

  return (
    <Container fluid className="p-6">      
      <Row className="mt-6">
        <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }} md={12} xs={12}>
          <div className="align-items-center">
            <div className="pt-20 rounded-top" style={{ background: 'url(/images/background/profile-cover.jpg) no-repeat', backgroundSize: 'cover' }}>
            </div>
            <div className="bg-white rounded-bottom smooth-shadow-sm ">
              <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                <div className="d-flex align-items-center">                
                  <div className="lh-1">
                    <h2 className="mb-0">John Doe</h2>
                    <p className="mb-0 d-block">john.doe@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* content */}
          <div className="py-6">
            <Card>
              {/* card body */}
              <Card.Body>
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

                  {/* email */}
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"        
                      isInvalid={errors.email}
                      {...register('email')}             
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
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

                  <Button variant="primary" type="submit">Save changes</Button>
                </Form>
              </Card.Body>
            </Card>

            <ChangePasswordForm />

            <Card className="mt-6">
              <Card.Body>
                <Card.Title as="h4">Delete account</Card.Title>            
                <div>
                  <p>Are you sure to delete your account?</p>
                  <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete Account</Button>
                </div>
              </Card.Body>
            </Card>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
              <Modal.Header closeButton>
                  <Modal.Title>Attention!</Modal.Title>
              </Modal.Header>
              <Modal.Body>You are deleting this user. This action is irreversible. Are you sure to proceed?</Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                      Abort
                  </Button>
                  <Button variant="danger" onClick={onDeleteAccountButtonClick}>
                      Delete
                  </Button>
              </Modal.Footer>
          </Modal>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile