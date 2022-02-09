import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Users from './Users';
import SortFilter from './SortFilter';

const Dashboard = () => {
  return (
    <Container>
      <h1 className="m-10 pt-3 pb-3">Dashboard</h1>
      <Row className="border border-secondary rounded">
        <Col
          className="mb-5 mt-5 d-flex justify-content-between"
          sm="12"
          md={{ size: 10, offset: 1 }}
        >
          <h4>Users list</h4>
          <Link to="/add">
            <Button color="primary">Add new</Button>
          </Link>
        </Col>
        <Col
          className="mb-1 d-flex justify-flex-start"
          sm="12"
          md={{ size: 10, offset: 1 }}
        >
          <SortFilter />
        </Col>
        <Col sm="12" md={{ size: 10, offset: 1 }}>
          <Users />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
