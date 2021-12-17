import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AddType from "../components/modals/modalsType/AddType";
import CreateType from "../components/modals/modalsType/CreateType";
import DeleteType from "../components/modals/modalsType/DeleteType";
import {fetchTypeAPI} from "../http/typeAPI";

const TypePage = observer(() => {

    const {type} = useContext(Context)

    useEffect(()=>{
        fetchTypeAPI().then(data => type.setType(data))
    },[type.setType])

    const [addTypeVisible, setAddTypeVisible] = useState(false)
    const [createTypeVisible, setCreateTypeVisible] = useState(false)
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false)

    const fetchTypeFunction = () =>{
        fetchTypeAPI().then(data => type.setType(data))
        type.setSelectedType({})
    }

    return (
        <Container className="mt-3" style={{ background: '#3C5B74'}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_admin/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Типы произведения</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <Button variant="outline-info" onClick={()=> {
                            setAddTypeVisible(true)
                            type.setSelectedType({})
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
                        {type.type.map(types =>
                            <tr>
                                <td>{types.id}</td>
                                <td>{types.name}</td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                type.setSelectedType(types)
                                                setCreateTypeVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                type.setSelectedType(types)
                                                setDeleteTypeVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>

                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddType show={addTypeVisible} onHide={()=> {
                setAddTypeVisible(false)
                fetchTypeFunction()
            }}/>
            <CreateType show={createTypeVisible} onHide={()=> {
                setCreateTypeVisible(false)
                fetchTypeFunction()
            }}/>
            <DeleteType show={deleteTypeVisible} onHide={()=> {
                setDeleteTypeVisible(false)
                fetchTypeFunction()
            }}/>
        </Container>
    );
});

export default TypePage;