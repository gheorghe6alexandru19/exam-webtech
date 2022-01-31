import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import AllCompanies from './display/AllCompanies';
import AddCompany from './display/AddCompany';

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <AddCompany />
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col md={12}>
            <AllCompanies />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
