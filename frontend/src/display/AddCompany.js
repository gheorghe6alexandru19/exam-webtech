import axios from 'axios';
import React, { useState} from 'react';
import { Form, Container, Button} from 'react-bootstrap';

const AddCompany = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const addCompanyHandler = async(e) => {

        e.preventDefault()
        const data = {
            name: name,
            dateFounded: date
        }

        await axios.post('http://localhost:8080/companies', data);
        window.location="/";
    }

    return(<div>
        <Container>
            <h1>Add Project</h1>
            <hr></hr>

            <Form onSubmit={addCompanyHandler}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Company Name:</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter company name"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Date founded:</Form.Label>
                    <Form.Control value={date} onChange={(e) => setDate(e.target.value)} type="text" placeholder="Enter date"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
        </Container>
    </div>)
}

export default AddCompany;