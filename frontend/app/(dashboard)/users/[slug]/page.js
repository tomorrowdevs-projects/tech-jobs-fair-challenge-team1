'use client'
// import node module libraries
import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { Col, Row, Container, Card, Form, Button, Breadcrumb, Modal } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isValidNumber } from 'libphonenumber-js'

import InputPhone from 'components/InputPhone';

const UsersPageEdit = ({ params }) => {
    const rolesOptions = useMemo(() => {
        return [
            { value: 'basic', label: 'Basic' },
            { value: 'maintainer', label: 'Maintainer' },
            { value: 'admin', label: 'Admin' },
            { value: 'super-admin', label: 'Super Admin' }
          ]
    }, []);

    const [showDeleteModal, setShowDeleteModal] = useState(false)

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
          phoneNumber: '+390304568798',
          role: 'admin'
        }, 
        resolver: yupResolver(yup.object({
          firstname: yup.string().required(),
          lastname: yup.string().required(),
          email: yup.string().email().required(),      
          phoneNumber: yup.string(),
          role: yup.string().required()
        })) 
      })

    const onSubmit = useCallback(data => {
        // TODO: api integration
        console.log(data)
        // console.log(isValidNumber(data.phoneNumber))
    }, [])

    const onDeleteUserButtonClick = useCallback(user => {
        // TODO: API integration
        alert('delete user')
    }, [])    

    return (
        <Container fluid className="p-6">
            <Row>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }} md={12} xs={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} href="/users">Users</Breadcrumb.Item>
                        <Breadcrumb.Item active>John Doe</Breadcrumb.Item>
                    </Breadcrumb>

                    <hr/>

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
                                
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="role">Role</Form.Label>                                                                        
                                    <Form.Select
                                        id="role"
                                        isInvalid={errors.role}
                                        {...register('role')}
                                    >
                                        <option value="" className="text-muted">Select a role</option>
                                        {rolesOptions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.value} className="text-dark">
                                                    {item.label}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.role?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit">Save changes</Button>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card className="mt-6">
                            <Card.Body>
                                <Card.Title as="h4">Delete user</Card.Title>            
                                <div>
                                <p>Are you sure to delete this user?</p>
                                <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete User</Button>
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
                                <Button variant="danger" onClick={onDeleteUserButtonClick}>
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

export default UsersPageEdit