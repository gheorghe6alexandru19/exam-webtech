import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap';
import CompanyCard from '../components/CompanyCard';

function AllCompanies() {
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        const getCompanyData = async() => {
            const {data} = await axios.get('http://localhost:8080/companies')
            console.log(data);
            setCompanies(data);
        }
        getCompanyData();
    },[])
    
    return(<div>
        <Container>
            <h1 className="text-left">List of companies</h1>
            <hr></hr>
            <Row xs={1} md={2} className="g-4">
                {
                    companies.map(company => {
                        return <Col xs={12} sm={6} key={company.id}>
                            <CompanyCard company={company}/>
                        </Col>
                    })
                }
            </Row>
        </Container>
    </div>)
}

export default AllCompanies;