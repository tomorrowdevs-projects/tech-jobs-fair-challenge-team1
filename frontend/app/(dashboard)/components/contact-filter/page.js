import {Card, Form} from "react-bootstrap";

const ContactFilter = ({ filters, onFilterChange }) => {
    return (
        <Card className="card mb-3 border-4">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-7">
                        <div className="mb-3 d-none d-md-none d-lg-block">
                            {/* Search Form */}
                            <label className='mb-2'>Search Contacts</label>
                            <Form className="d-flex align-items-center">
                                <Form.Control type="search" placeholder="Please type a least 3 characters" style={{width: "100%"}}></Form.Control>
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
                                    value={filters[filterKey].selected}
                                    onChange={(e) => onFilterChange(filterKey, e.target.value)}
                                >
                                    <option value="" disabled selected>---Select your option---</option>
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