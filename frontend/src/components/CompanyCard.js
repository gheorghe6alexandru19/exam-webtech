import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';

const CompanyCard = ({company}) => {
    const {id} = useState(company.id);
    const[name, setName] = useState(company.name);
    const[date, setDate] = useState(company.dateFounded);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    },[company])

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/companies/${id}`)
        window.location="/";
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const data = {
            name: name,
            dateFounded: date
        }

        await axios.put(`http://localhost:8080/companies/${company.id}`, data)
        window.location="/";
    }

    return(<>
        <Card className='shadow-lg' style={{width:'22rem'}}>
            <Card.Body>
                <Card.Title>{company.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{company.dateFounded}</Card.Subtitle>
                <Row>
                    <Col sm={2}>
                        <Button onClick = {handleShow} className="btn btn-primary" data-toggle="modal">Edit</Button>
                    </Col>
                    <Col sm={2}>
                        <Button className="btn btn-danger" onClick={() => handleDelete(company.id)}>Delete</Button>
                    </Col>
                    <Col sm={8}>

                    </Col>
                </Row>
            </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Company
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group className="mb-3" controlId="formNameEdit">
                            <Form.Label>Company name:</Form.Label>
                            <Form.Control value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="Enter company name"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDateEdit">
                            <Form.Label>Date founded:</Form.Label>
                            <Form.Control value={date} onChange={(e)=> setDate(e.target.value)} type="text" placeholder="Enter date"/>
                        </Form.Group>

                        <Row>
                            <Col sm={2}>
                                <Button variant="primary" type="submit" onClick={handleClose}>
                                    Finish
                                </Button>
                            </Col>
                            <Col sm={10}>

                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>

        </Modal>
    </>)
}

export default CompanyCard;