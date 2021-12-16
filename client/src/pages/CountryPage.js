import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CreateCountry from "../components/modals/modalsCountry/CreateCountry";
import AddCountry from "../components/modals/modalsCountry/AddCountry";
import DeleteCountry from "../components/modals/modalsCountry/DeleteCountry";
import {fetchCountryAPI} from "../http/countryAPI";

const CountryPage = observer(() => {

    const {country} = useContext(Context)

    useEffect(()=>{
        fetchCountryAPI().then(data => country.setCountry(data))
    },[country.setCountry])

    const [addCountryVisible, setAddCountryVisible] = useState(false)
    const [createCountryVisible, setCreateCountryVisible] = useState(false)
    const [deleteCountryVisible, setDeleteCountryVisible] = useState(false)

    const fetchCountryFunction = () =>{
        fetchCountryAPI().then(data => country.setCountry(data))
        country.setSelectedCountry({})
    }

    return (
        <Container className="mt-3 "style={{ background: '#3C5B74'}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_admin/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Страны</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <Button variant="outline-info" onClick={()=> {
                            country.setSelectedCountry({})
                            setAddCountryVisible(true)
                        }} className="m-2" >Добавить</Button>
                    </div>


                    <Table striped bordered hover size="sm" style={{ background: 'white'}}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Название</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {country.country.map(countries =>
                            <tr>
                                <td>{countries.id}</td>
                                <td>{countries.name}</td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                country.setSelectedCountry(countries)
                                                setCreateCountryVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                country.setSelectedCountry(countries)
                                                setDeleteCountryVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddCountry show={addCountryVisible} onHide={()=> {
                setAddCountryVisible(false)
                fetchCountryFunction()
            }}/>
            <CreateCountry show={createCountryVisible} onHide={()=> {
                setCreateCountryVisible(false)
                fetchCountryFunction()
            }}/>
            <DeleteCountry show={deleteCountryVisible} onHide={()=> {
                setDeleteCountryVisible(false)
                fetchCountryFunction()
            }}/>
        </Container>
    );
});

export default CountryPage;