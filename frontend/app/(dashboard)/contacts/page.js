'use client'
// import node module libraries
import React, {Fragment, useState} from "react";
import Link from 'next/link';
import {Container, Col, Row, Table, Card} from 'react-bootstrap';

import { PageHeading } from 'widgets'

const ContactsPage = () => {
    const contacts = [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "phone": "123-456-7890",
            "email": "john@example.com",
            "category": "Employee"
        },
        {
            "id": 2,
            "first_name": "Jane",
            "last_name": "Smith",
            "phone": "456-789-1234",
            "email": "jane@example.com",
            "category": "Partner"
        },
        {
            "id": 3,
            "first_name": "Alice",
            "last_name": "Johnson",
            "phone": "789-123-4567",
            "email": "alice@example.com",
            "category": "Customer"
        },
        {
            "id": 4,
            "first_name": "Bob",
            "last_name": "Brown",
            "phone": "321-654-9870",
            "email": "bob@example.com",
            "category": "Employee"
        },
        {
            "id": 5,
            "first_name": "Emma",
            "last_name": "Davis",
            "phone": "987-654-3210",
            "email": "emma@example.com",
            "category": "Customer"
        },
        {
            "id": 6,
            "first_name": "Michael",
            "last_name": "Wilson",
            "phone": "741-852-9630",
            "email": "michael@example.com",
            "category": "Partner"
        },
        {
            "id": 7,
            "first_name": "Sarah",
            "last_name": "Taylor",
            "phone": "159-357-4806",
            "email": "sarah@example.com",
            "category": "Employee"
        },
        {
            "id": 8,
            "first_name": "David",
            "last_name": "Martinez",
            "phone": "369-258-1470",
            "email": "david@example.com",
            "category": "Other"
        },
        {
            "id": 9,
            "first_name": "Laura",
            "last_name": "Anderson",
            "phone": "258-369-1470",
            "email": "laura@example.com",
            "category": "Partner"
        },
        {
            "id": 10,
            "first_name": "James",
            "last_name": "Moore",
            "phone": "852-963-7410",
            "email": "james@example.com",
            "category": "Employee"
        },
        {
            "id": 11,
            "first_name": "Emily",
            "last_name": "White",
            "phone": "369-741-8520",
            "email": "emily@example.com",
            "category": "Customer"
        },
        {
            "id": 12,
            "first_name": "Daniel",
            "last_name": "Harris",
            "phone": "123-456-7890",
            "email": "daniel@example.com",
            "category": "Employee"
        },
        {
            "id": 13,
            "first_name": "Olivia",
            "last_name": "Martin",
            "phone": "456-789-1230",
            "email": "olivia@example.com",
            "category": "Partner"
        },
        {
            "id": 14,
            "first_name": "William",
            "last_name": "Thompson",
            "phone": "789-123-4560",
            "email": "william@example.com",
            "category": "Customer"
        },
        {
            "id": 15,
            "first_name": "Sophia",
            "last_name": "Garcia",
            "phone": "654-321-9870",
            "email": "sophia@example.com",
            "category": "Other"
        }
    ]
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    const sortByColumn = (column) => {
        if (sortedColumn === column) {
            // Toggle sort order
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Sort by the selected column in ascending order by default
            setSortedColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedContacts = [...contacts].sort((a, b) => {
        if (sortedColumn) {
            if (a[sortedColumn] < b[sortedColumn]) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a[sortedColumn] > b[sortedColumn]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });

    return (
        <Fragment>

            <Container className="p-6">
                <PageHeading 
                    heading={`Contacts(${contacts.length})`}
                    actions={
                        <Link className="btn btn-primary" href="/contacts/create">
                            <i className="fe fe-plus"></i> Add new contact
                        </Link>
                    }             
                />

                <Table striped responsive className="text-nowrap">
                    <thead >
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" onClick={() => sortByColumn('first_name')} style={{cursor: 'pointer'}}>
                            Name {sortedColumn === 'first_name' ? (
                            <>&nbsp;{sortOrder === 'asc' ? <>&darr;</> : <>&uarr;</>}</>
                        ) : (
                            <>&nbsp;&uarr;</>
                        )}
                        </th>
                        <th scope="col" onClick={() => sortByColumn('last_name')} style={{cursor: 'pointer'}}>
                            SurName {sortedColumn === 'last_name' ? (
                            <>&nbsp;{sortOrder === 'asc' ? <>&darr;</> : <>&uarr;</>}</>
                        ) : (
                            <>&nbsp;&uarr;</>
                        )}
                        </th>
                        <th scope="col" onClick={() => sortByColumn('phone')} style={{cursor: 'pointer'}}>
                            Phone {sortedColumn === 'phone' ? (
                            <>&nbsp;{sortOrder === 'asc' ? <>&darr;</> : <>&uarr;</>}</>
                        ) : (
                            <>&nbsp;&uarr;</>
                        )}
                        </th>
                        <th scope="col" onClick={() => sortByColumn('email')} style={{cursor: 'pointer'}}>
                            Email {sortedColumn === 'email' ? (
                            <>&nbsp;{sortOrder === 'asc' ? <>&darr;</> : <>&uarr;</>}</>
                        ) : (
                            <>&nbsp;&uarr;</>
                        )}
                        </th>
                        <th scope="col" onClick={() => sortByColumn('category')} style={{cursor: 'pointer'}}>
                            Category {sortedColumn === 'category' ? (
                            <>&nbsp;{sortOrder === 'asc' ? <>&darr;</> : <>&uarr;</>}</>
                        ) : (
                            <>&nbsp;&uarr;</>
                        )}
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedContacts.map((contact, index) => {
                        return (
                            <tr key={contact.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{contact.first_name}</td>
                                <td>{contact.last_name}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.email}</td>
                                <td>{contact.category}</td>
                                <td className="text-end">
                                    <Link href={`/contacts/${contact.id}`} className="btn btn-primary">
                                        <i className="fe fe-edit"></i> Edit
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Container>
        </Fragment>
    )
}
export default ContactsPage;
