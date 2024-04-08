// import node module libraries
import Link from 'next/link';

import {    
    Image,
    Dropdown,
    ListGroup,
} from 'react-bootstrap';

const QuickMenu = () => {
    return (
        <ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap ms-auto d-flex nav-top-wrap">            
            <Dropdown as="li" className="ms-2">
                <Dropdown.Toggle
                    as="a"
                    bsPrefix=' '
                    className="rounded-circle"
                    id="dropdownUser"
                >
                    <div className="avatar avatar-md">
                        <Image alt="avatar" src={`https://ui-avatars.com/api/?name=John+Doe`} className="rounded-circle" />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="dropdown-menu dropdown-menu-end"
                    align="end"
                    aria-labelledby="dropdownUser"
                    show
                >                    
                    <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=' '>
                        <div className="lh-1 ">
                            <h5 className="mb-1">Hi John!</h5>
                        </div>
                        <div className=" dropdown-divider mt-3 mb-2"></div>
                    </Dropdown.Item>
                    <Dropdown.Item as="div">
                        <Link href="/profile">
                            <i className="fe fe-user me-2"></i> Profile
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <i className="fe fe-power me-2"></i>Sign Out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </ListGroup>
    )
}

export default QuickMenu;