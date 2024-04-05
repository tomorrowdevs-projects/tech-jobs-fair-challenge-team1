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

const ContactsViewPage = ({ params }) => {
    const categoriesOptions = useMemo(() => {
        return [
            { value: 'employer', label: 'Employer' },
            { value: 'customer', label: 'Customer' },
            { value: 'partner', label: 'Partner' },
            { value: 'other', label: 'Other' }
          ]
    }, []);

    const departmentsOptions = useMemo(() => {
        return [
            { value: 'marketing', label: 'Marketing' },
            { value: 'it', label: 'IT' },
            { value: 'business', label: 'Business' },
            { value: 'account', label: 'Account' }
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
          department: yup.string().required(),
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

                    <div className="align-items-center">
                        <div className="pt-20 rounded-top" style={{ background: 'url(/images/background/profile-cover.jpg) no-repeat', backgroundSize: 'cover' }}>
                        </div>
                        <div className="bg-white rounded-bottom smooth-shadow-sm ">
                        <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                            <div className="lh-1">
                                <h2 className="mb-0">John Doe</h2>
                                <p className="mb-0 d-block">john.doe@gmail.com</p>
                            </div>
                            <div>
                                <Link className="btn btn-primary" href={`/contacts/${params.slug}/edit`}>
                                    <i className="fe fe-edit"></i> Edit
                                </Link>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* content */}
                    <div className="py-6">
                        <Card>
                            {/* card body */}
                            <Card.Body>
                                <Card.Title as="h4">Informations</Card.Title>
                                
                                <Row>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Category</h6>
                                        <p className="mb-0">Category name</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Department</h6>
                                        <p className="mb-0">Department name</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Firstname</h6>
                                        <p className="mb-0">John</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Lastname</h6>
                                        <p className="mb-0">Doe</p>
                                    </Col>
                                    <Col xs={12} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Email</h6>
                                        <p className="mb-0">john.doe@gmail.com</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Country</h6>
                                        <p className="mb-0">Country</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Region</h6>
                                        <p className="mb-0">Region</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">City</h6>
                                        <p className="mb-0">City</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Address</h6>
                                        <p className="mb-0">Address</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Phone number</h6>
                                        <p className="mb-0">+390304568798</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Socials</h6>
                                        <p className="mb-0">Social</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">Company name</h6>
                                        <p className="mb-0">Company name</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">VAT</h6>
                                        <p className="mb-0">VAT</p>
                                    </Col>
                                    <Col xs={6} className="mb-5">
                                        <h6 className="text-uppercase fs-5 ls-2">SDI</h6>
                                        <p className="mb-0">SDI</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ContactsViewPage