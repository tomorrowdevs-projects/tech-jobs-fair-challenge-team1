// import node module libraries
import { Row, Col } from 'react-bootstrap';

const PageHeading = props => {
  const { heading, actions } = props;
  return (
    <Row>
      <Col lg={12} md={12} xs={12}>
        {/* Page header */}
        <div className="border-bottom pb-4 mb-4 d-flex justify-content-between align-items-center">
          <h3 className="mb-0 fw-bold">{heading}</h3>
          {
            actions && 
              <div>{actions}</div>
          }
        </div>
      </Col>
    </Row>
  )
}

export default PageHeading