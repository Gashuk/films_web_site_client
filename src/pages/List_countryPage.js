import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Nav, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CreateList_country from "../components/modals/modalsList_country/CreateList_country";
import AddList_country from "../components/modals/modalsList_country/AddList_country";
import DeleteList_country from "../components/modals/modalsList_country/DeleteList_country";
import {fetchList_countryAPI} from "../http/list_counrtyAPI";
import {fetchOneCountryAPI} from "../http/countryAPI";
import {fetchOneCompositionAPI} from "../http/compositionAPI";

const List_countryPage = observer(() => {

    const {country} = useContext(Context)
    const {list_country} = useContext(Context)
    const {composition_admin} = useContext(Context)

    useEffect(()=>{
        fetchList_countryAPI().then(data => list_country.setList_country(data))
    },[list_country.setList_country])

    const [addList_countryVisible, setAddList_countryVisible] = useState(false)
    const [createList_countryVisible, setCreateList_countryVisible] = useState(false)
    const [deleteList_countryVisible, setDeleteList_countryVisible] = useState(false)

    const fetchList_countryFunction = () =>{
        fetchList_countryAPI().then(data => list_country.setList_country(data))
        list_country.setSelectedList_country({})
        country.setSelectedCountry({})
        composition_admin.setSelectedComposition({})
    }

    return (
        <Container className="mt-3" style={{ background: '#3C5B74'}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_admin/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Список произвидение/страна</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <Button variant="outline-info" onClick={()=> {
                            country.setSelectedCountry({})
                            list_country.setSelectedList_country({})
                            composition_admin.setSelectedComposition({})
                            setAddList_countryVisible(true)
                        }} className="m-2" >Добавить</Button>
                    </div>


                    <Table striped bordered hover size="sm" style={{ background: 'white'}}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Код произведения</th>
                            <th>Произведение</th>
                            <th>Постер</th>
                            <th>Код страны</th>
                            <th>Страна</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {list_country.list_country.map(list_countries =>
                            <tr>
                                <td>{list_countries.id}</td>
                                <td>{list_countries.compositionId}</td>
                                <td>{list_countries.name_composition}</td>
                                <td><Image width={50} height={50} src={process.env.REACT_APP_API_URL +list_countries.img_composition}/></td>
                                <td>{list_countries.countryId}</td>
                                <td>{list_countries.name_country}</td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                fetchOneCompositionAPI(list_countries.compositionId).then(data => {composition_admin.setSelectedComposition(data)})
                                                fetchOneCountryAPI(list_countries.name_country).then(data => {country.setSelectedCountry(data)})
                                                list_country.setSelectedList_country(list_countries)
                                                setCreateList_countryVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                fetchOneCompositionAPI(list_countries.compositionId).then(data => {composition_admin.setSelectedComposition(data)})
                                                fetchOneCountryAPI(list_countries.name_country).then(data => {country.setSelectedCountry(data)})
                                                list_country.setSelectedList_country(list_countries)
                                                setDeleteList_countryVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddList_country show={addList_countryVisible} onHide={()=> {
                setAddList_countryVisible(false)
                fetchList_countryFunction()
            }}/>
            <CreateList_country show={createList_countryVisible} onHide={()=> {
                setCreateList_countryVisible(false)
                fetchList_countryFunction()
            }}/>
            <DeleteList_country show={deleteList_countryVisible} onHide={()=> {
                setDeleteList_countryVisible(false)
                fetchList_countryFunction()
            }}/>
        </Container>
    );
});

export default List_countryPage;