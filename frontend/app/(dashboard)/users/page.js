'use client'
// import node module libraries
import { useCallback } from 'react';
import Link from 'next/link';
import { Col, Row, Container, Card, Form, Button, Table } from 'react-bootstrap';

import { PageHeading } from 'widgets'

const UsersPage = () => {
    const onDeleteUserButtonClick = useCallback(user => {
        // TODO: API integration
        alert('delete user')
    }, [])

    return (
        <Container className="p-6">
            <PageHeading heading="Users" />

            <Table striped responsive className="text-nowrap">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john.doe@gmail.com</td>
                        <td>Admin</td>
                        <td className="text-end">
                            <Link href="/users/123" className="btn btn-primary me-2">
                                <i className="fe fe-edit"></i>
                            </Link>
                            <Button variant="danger" onClick={() => onDeleteUserButtonClick()}>
                                <i className="fe fe-trash"></i>
                            </Button>
                        </td>
                    </tr>
                    {/* API INTEGRATION */}
                </tbody>
            </Table>

        </Container>
    )
}

export default UsersPage