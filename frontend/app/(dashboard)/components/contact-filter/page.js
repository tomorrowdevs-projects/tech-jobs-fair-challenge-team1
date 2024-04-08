import {Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

const ContactFilter = ({ filters, onFilterChange,searchQuery, onSearchQueryChange }) => {
    return (
        <Card className="card mb-3 border-4">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-7">
                        <div className="mb-3 ">
                            {/* Search Form */}
                            <label className='mb-2'>Search Contacts</label>
                            <Form className="d-flex align-items-center">
                                <Form.Control
                                    value={searchQuery}
                                    onChange={(e) => onSearchQueryChange(e.target.value)}
                                    type="search"
                                    placeholder="Please type at least 3 characters"
                                    style={{width: "100%"}}
                                    />
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {Object.keys(filters).map((filterKey) => (
                        <div className="col-md-4" key={filterKey}>
                            <label className="fw-bold mb-2">{filters[filterKey].label}:</label>
                            <select
                                className="form-control"
                                defaultValue=""
                                value={filters[filterKey].selected}
                                onChange={(e) => onFilterChange(filterKey, e.target.value)}
                            >
                                <option value="">No preference</option>
                                {filters[filterKey].options.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        ))}
                    </div>
                </div>
        </Card>
);
};
export default ContactFilter;