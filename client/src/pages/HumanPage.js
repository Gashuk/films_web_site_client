import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Nav, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import CreateHuman from "../components/modals/modalsHuman/CreateHuman";
import {observer} from "mobx-react-lite";
import AddHuman from "../components/modals/modalsHuman/AddHuman";
import DeleteHuman from "../components/modals/modalsHuman/DeleteHuman";
import {fetchHumanAPI} from "../http/humanAPI";
import {useHistory} from "react-router-dom";
import {fetchGenreAPI} from "../http/genreAPI";

const HumanPage = observer(() => {

    const {human} = useContext(Context)

    useEffect(()=>{
        fetchHumanAPI().then(data => human.setHuman(data))
    },[human.setHuman])

    const [addHumanVisible, setAddHumanVisible] = useState(false)
    const [createHumanVisible, setCreateHumanVisible] = useState(false)
    const [deleteHumanVisible, setDeleteHumanVisible] = useState(false)

    const fetchHumanFunction = () =>{
        fetchHumanAPI().then(data => human.setHuman(data))
        human.setSelectedHuman({})
    }

    return (
        <Container className="mt-3" style={{ background: '#3C5B74'}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_admin/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Персоны</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <Button variant="outline-info" onClick={()=> {
                            human.setSelectedHuman({})
                            setAddHumanVisible(true)
                        }} className="m-2" >Добавить</Button>
                    </div>


                    <Table striped bordered hover size="sm" style={{ background: 'white'}}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>ФИО</th>
                            <th>Автарка</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {human.human.map(humans =>
                            <tr>
                                <td>{humans.id}</td>
                                <td>{humans.fio}</td>
                                <td><Image width={50} height={50}  src={process.env.REACT_APP_API_URL + humans.img}/></td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                human.setSelectedHuman(humans)
                                                setCreateHumanVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                human.setSelectedHuman(humans)
                                                setDeleteHumanVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddHuman show={addHumanVisible} onHide={()=> {
                setAddHumanVisible(false)
                fetchHumanFunction()
            }}/>
            <CreateHuman show={createHumanVisible} onHide={()=> {
                setCreateHumanVisible(false)
                fetchHumanFunction()
            }}/>
            <DeleteHuman show={deleteHumanVisible} onHide={()=> {
                setDeleteHumanVisible(false)
                fetchHumanFunction()
            }}/>
        </Container>
    );
});

export default HumanPage;