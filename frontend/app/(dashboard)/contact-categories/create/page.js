'use client'
// import node module libraries
import { useCallback } from 'react';
import Link from 'next/link';
import { Col, Row, Container, Card, Form, Button, Breadcrumb } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ContactCategoriesCreatePage = () => {
    const {
        register,        
        handleSubmit,    
        formState: { errors },
      } = useForm({         
        resolver: yupResolver(yup.object({
          name: yup.string().required()
        })) 
      })

    const onSubmit = useCallback(data => {
        // TODO: api integration
        console.log(data)
        // console.log(isValidNumber(data.phoneNumber))
    }, [])

    return (
        <Container fluid className="p-6">
            <Row>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }} md={12} xs={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} href="/contact-categories">Contact categories</Breadcrumb.Item>
                        <Breadcrumb.Item active>Create</Breadcrumb.Item>
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

                                <Button variant="primary" type="submit">Create contact category</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ContactCategoriesCreatePage