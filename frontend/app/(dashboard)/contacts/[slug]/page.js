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

const UsersEditPage = ({ params }) => {
    const categoriesOptions = useMemo(() => {
        return [
            { value: 'employer', label: 'Employer' },
            { value: 'customer', label: 'Customer' },
            { value: 'partner', label: 'Partner' },
            { value: 'other', label: 'Other' }
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
          category: 'customer',
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@gmail.com',
          phoneNumber: '+390304568798',
          socials: 'https://linkedin.com/john-doe',
          companyName: 'John corporation',
          vat: '',
          sdi: '',
        }, 
        resolver: yupResolver(yup.object({
          category: yup.string().required(),
          firstname: yup.string().required(),
          lastname: yup.string().required(),
          email: yup.string().email().required(),      
          country: yup.string(),      
          region: yup.string(),      
          city: yup.string(),      
          address: yup.string(),      
          zipCode: yup.string(),      
          phoneNumber: yup.string().required(),
          socials: yup.string(),
          companyName: yup.string(),
          vat: yup.string(),
          sdi: yup.string(),
        })) 
      })

    const onSubmit = useCallback(data => {
        // TODO: api integration
        console.log(data)
        // console.log(isValidNumber(data.phoneNumber))
    }, [])

    const onDeleteUserButtonClick = useCallback(user => {
        // TODO: API integration
        alert('delete contact')
    }, [])    

    return (
        <Container fluid className="p-6">
            <Row>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }} md={12} xs={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} href="/contacts">Contacts</Breadcrumb.Item>
                        <Breadcrumb.Item active>John Doe</Breadcrumb.Item>
                    </Breadcrumb>

                    <hr/>

                    {/* content */}
                    <div className="py-6">
                        <Card>
                            {/* card body */}
                            <Card.Body>
                                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                                {/* Category */}
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="category">Contacts Category</Form.Label>                                                                        
                                    <Form.Select
                                        id="category"
                                        isInvalid={errors.category}
                                        {...register('category')}
                                    >
                                        <option value="" className="text-muted">Select a category</option>
                                        {categoriesOptions.map((item, index) => {
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

                                {/* country */}
                                <Form.Group className="mb-3" controlId="country">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Country"        
                                    isInvalid={errors.country}
                                    {...register('country')}             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {errors.country?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* region */}
                                <Form.Group className="mb-3" controlId="region">
                                    <Form.Label>Region</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="region"        
                                    isInvalid={errors.region}
                                    {...register('region')}             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {errors.region?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* city */}
                                <Form.Group className="mb-3" controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="city"        
                                    isInvalid={errors.city}
                                    {...register('city')}             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {errors.city?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* address */}
                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Address"        
                                    isInvalid={errors.address}
                                    {...register('address')}             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {errors.address?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* zipCode */}
                                <Form.Group className="mb-3" controlId="zipCode">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Zip Code"        
                                    isInvalid={errors.zipCode}
                                    {...register('zipCode')}             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {errors.zipCode?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* phoneNumber */}
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

                                {/* socials */}
                                <Form.Group className="mb-3" controlId="socials">
                                    <Form.Label>Socials links</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Social links"        
                                        isInvalid={errors.socials}
                                        {...register('socials')}             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.socials?.message}
                                    </Form.Control.Feedback>
                                    <Form.Text id="phoneNumberBlock" muted>
                                    Social links must be separated by comma ";"
                                    </Form.Text>
                                </Form.Group>

                                {/* Company name */}
                                <Form.Group className="mb-3" controlId="companyName">
                                    <Form.Label>Company name</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Company name"        
                                    isInvalid={errors.companyName}                  
                                    {...register('companyName')}             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {errors.companyName?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* VAT */}
                                <Form.Group className="mb-3" controlId="vat">
                                    <Form.Label>VAT</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="VAT"        
                                    isInvalid={errors.companyName}                  
                                    {...register('vat')}             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {errors.vat?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* SDI */}
                                <Form.Group className="mb-3" controlId="sdi">
                                    <Form.Label>SDI</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="SDI"        
                                    isInvalid={errors.sdi}                  
                                    {...register('sdi')}             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {errors.sdi?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit">Save changes</Button>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card className="mt-6">
                            <Card.Body>
                                <Card.Title as="h4">Delete contact</Card.Title>            
                                <div>
                                <p>Are you sure to delete this contact?</p>
                                <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete Contact</Button>
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

export default UsersEditPage