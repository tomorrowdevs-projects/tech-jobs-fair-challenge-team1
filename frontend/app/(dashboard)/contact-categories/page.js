'use client'
// import node module libraries
import { useCallback } from 'react';
import Link from 'next/link';
import { Col, Row, Container, Card, Form, Button, Table } from 'react-bootstrap';

import { PageHeading } from 'widgets'

const ContactCategoriesPage = () => {
    return (
        <Container className="p-6">
            <PageHeading heading="Contact categories" />

            <Table striped responsive className="text-nowrap">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Employee</td>
                        <td className="text-end">
                            <Link href="/contact-categories/123" className="btn btn-primary me-2">
                                <i className="fe fe-edit"></i> Edit
                            </Link>
                        </td>
                    </tr>
                    {/* API INTEGRATION */}
                </tbody>
            </Table>

        </Container>
    )
}

export default ContactCategoriesPage