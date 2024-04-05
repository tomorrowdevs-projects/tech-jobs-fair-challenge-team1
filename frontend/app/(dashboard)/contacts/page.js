'use client'
// import node module libraries
import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link';
import {Container, Table,} from 'react-bootstrap';

import {PageHeading} from 'widgets'
import ContactFilter from "../components/contact-filter/page";

const ContactsPage = () => {
    const initialContacts = [
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
    const [contacts,setContacts] = useState(initialContacts)
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [filters, setFilters] = useState({
        category: {
            label: "Category",
            options: ['Employee','Partner','Customer','Other'],
            selected: ""
        },
        company: {
            label: "Company",
            options: ['Google','Amazon', 'Hyundai','Tech Solutions'],
            selected: ""
        },
        department: {
            label: "Department",
            options: ['IT','Marketing','Sales'],
            selected: ""
        }
    });
const [searchQuery,setSearchQuery] = useState('')
    // Function to handle filter changes
    const handleFilterChange = (name,value) => {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: {
                    ...prevFilters[name],
                    selected: value,
                },
            }));
    };
const handleSearchQueryChange = (value)=>{

        setSearchQuery(value)

}
    useEffect(() => {
        console.log(searchQuery,!searchQuery)
        if (!searchQuery) {
            // Reset contacts to initialContacts
            setContacts(initialContacts);
            return; // Exit early to prevent further processing
        }
            // Filter contacts based on search query
            const filteredContacts = initialContacts.filter(contact => {
                const fullName = `${contact.first_name} ${contact.last_name}`;
                return fullName.toLowerCase().includes(searchQuery.toLowerCase());
            });

            // Sort filtered contacts by similarity
            filteredContacts.sort((a, b) => {
                const fullNameA = `${a.first_name} ${a.last_name}`;
                const fullNameB = `${b.first_name} ${b.last_name}`;
                // Calculate similarity score
                const similarityA = getSimilarity(fullNameA.toLowerCase(), searchQuery.toLowerCase());
                const similarityB = getSimilarity(fullNameB.toLowerCase(), searchQuery.toLowerCase());
                // Sort by similarity score (higher similarity first)
                return similarityB - similarityA;
            });
            setContacts(filteredContacts)

        // Pass the filtered contacts to the parent component using onFilterChange
    },[ searchQuery]);
    function getSimilarity(str1, str2) {
        // Convert strings to sets of characters
        const set1 = new Set(str1.toLowerCase());
        const set2 = new Set(str2.toLowerCase());

        // Intersection of characters
        const intersection = new Set([...set1].filter(char => set2.has(char)));

        // Union of characters
        const union = new Set([...set1, ...set2]);

        return intersection.size / union.size;
    }
    useEffect(() => {
        // Apply filters
        applyFilters();
    }, [ filters]);

    const applyFilters = () => {
        let filteredContacts = initialContacts;

        // Apply category filter
        if (filters.category.selected) {
            filteredContacts = filteredContacts.filter(
                (contact) => contact.category === filters.category.selected
            );
        }

        // Apply company filter
        if (filters.company.selected) {
            filteredContacts = filteredContacts.filter(
                (contact) => contact.company === filters.company.selected
            );
        }

        // Apply department filter
        if (filters.department.selected) {
            filteredContacts = filteredContacts.filter(
                (contact) => contact.department === filters.department.selected
            );
        }

        // Update contacts state with filtered results
        setContacts(filteredContacts);
    };

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
                <ContactFilter filters={filters} onFilterChange={handleFilterChange} onSearchQueryChange={handleSearchQueryChange} searchQuery={searchQuery}/>
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
                                <td>{contact.first_name + ' '+ contact.last_name}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.email}</td>
                                <td>{contact.category}</td>
                                <td className="text-end">
                                    <Link href={`/contacts/${contact.id}`} className="btn btn-primary">
                                        <i className="fe fe-book-open"></i> Show more
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
