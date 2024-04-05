'use client'
// import node module libraries
import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { Col, Row, Container, Card, Form, Button, Breadcrumb, Modal } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const DepartmentsEditPage = ({ params }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const {
        register,
        watch,
        setValue,
        handleSubmit,    
        formState: { errors },
      } = useForm({
        defaultValues: {
          name: 'Marketing'
        }, 
        resolver: yupResolver(yup.object({
          name: yup.string().required()
        })) 
      })

    const onSubmit = useCallback(data => {
        // TODO: api integration
        console.log(data)
        // console.log(isValidNumber(data.phoneNumber))
    }, [])

    const onDeleteUserButtonClick = useCallback(user => {
        // TODO: API integration
        alert('delete department')
    }, [])    

    return (
        <Container fluid className="p-6">
            <Row>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }} md={12} xs={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} href="/departments">Departments</Breadcrumb.Item>
                        <Breadcrumb.Item active>Marketing</Breadcrumb.Item>
                    </Breadcrumb>

                    <hr/>

                    {/* content */}
                    <div className="py-6">
                        <Card>
                            {/* card body */}
                            <Card.Body>
                                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                                {/* Firstname */}
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="name"        
                                    isInvalid={errors.name}                  
                                    {...register('name')}             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit">Save changes</Button>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card className="mt-6">
                            <Card.Body>
                                <Card.Title as="h4">Delete department</Card.Title>            
                                <div>
                                <p>Are you sure to delete this department?</p>
                                <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete Department</Button>
                                </div>
                            </Card.Body>
                        </Card>

                        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Attention!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>You are deleting this department. This action is irreversible. Are you sure to proceed?</Modal.Body>
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

export default DepartmentsEditPage