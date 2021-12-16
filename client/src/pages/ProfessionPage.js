import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import CreateProfession from "../components/modals/modalsProfession/CreateProfession";
import {observer} from "mobx-react-lite";
import AddProfession from "../components/modals/modalsProfession/AddProfession";
import DeleteProfession from "../components/modals/modalsProfession/DeleteProfession";
import {fetchProfessionAPI} from "../http/professionAPI";

const ProfessionPage = observer(() => {

    const {profession} = useContext(Context)

    useEffect(()=>{
        fetchProfessionAPI().then(data => profession.setProfession(data))
    },[profession.setProfession])

    const [addProfessionVisible, setAddProfessionVisible] = useState(false)
    const [createProfessionVisible, setCreateProfessionVisible] = useState(false)
    const [deleteProfessionVisible, setDeleteProfessionVisible] = useState(false)

    const fetchProfessionFunction = () =>{
        fetchProfessionAPI().then(data => profession.setProfession(data))
        profession.setSelectedProfession({})
    }

    return (
        <Container className="mt-3" style={{ background: '#3C5B74'}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_admin/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Профессии</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <Button variant="outline-info" onClick={()=> {
                            setAddProfessionVisible(true)
                            profession.setSelectedProfession({})
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
                        {profession.profession.map(professions =>
                            <tr>
                                <td>{professions.id}</td>
                                <td>{professions.name}</td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                profession.setSelectedProfession(professions)
                                                setCreateProfessionVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                profession.setSelectedProfession(professions)
                                                setDeleteProfessionVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddProfession show={addProfessionVisible} onHide={()=> {
                setAddProfessionVisible(false)
                fetchProfessionFunction()
            }}/>
            <CreateProfession show={createProfessionVisible} onHide={()=> {
                setCreateProfessionVisible(false)
                fetchProfessionFunction()
            }}/>
            <DeleteProfession show={deleteProfessionVisible} onHide={()=> {
                setDeleteProfessionVisible(false)
                fetchProfessionFunction()
            }}/>
        </Container>
    );
});

export default ProfessionPage;