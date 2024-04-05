import {Card} from "react-bootstrap";

const ContactFilter = ({ filters, onFilterChange }) => {
    return (
        <Card className="card mb-3 border-4">
            <div className="card-body">
                <h5 className="card-title fw-bold">Filters</h5>
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