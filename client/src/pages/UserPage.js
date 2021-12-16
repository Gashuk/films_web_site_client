import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Nav, Row, Table} from "react-bootstrap";
import Table_admin from "../components/Table_admin";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import AddType from "../components/modals/modalsType/AddType";
import CreateType from "../components/modals/modalsType/CreateType";
import DeleteType from "../components/modals/modalsType/DeleteType";
import {fetchHumanAPI, fetchTypeAPI, fetchUser_profiles} from "../http/compositionAPI";
import Table_User from "../components/Table_User";

const UserPage = observer(() => {
    const {table} = useContext(Context)

    useEffect(()=>{
        // fetchUser_profiles().then(data => table.setUser_auth(data))
    },[])
    const [addTypeVisible, setAddTypeVisible] = useState(false)
    const [createTypeVisible, setCreateTypeVisible] = useState(false)
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false)
// console.log(table.user_auth)
    return (
        <Container className="mt-3">
            <Row className="mt-2">
                <Col md={3}>
                    <Table_User/>
                </Col>
                <Col md={9}>
                    {/*<div> <h2>Типы произведения</h2> </div>*/}
                    {/*<div className="d-flex justify-content-md-end align-items-center">*/}
                    {/*    <Button variant="outline-info" onClick={()=> setAddTypeVisible(true)} className="m-2" >Добавить</Button>*/}
                    {/*    {table.selectedColTypeTable ?*/}
                    {/*        <div>*/}
                    {/*            <Button variant="outline-success" onClick={()=> setCreateTypeVisible(true)} className="m-2" >Изменить</Button>*/}
                    {/*            <Button variant="outline-danger" onClick={()=> setDeleteTypeVisible(true)} className="m-2">Удалить</Button>*/}
                    {/*        </div>*/}
                    {/*        :*/}
                    {/*        <div>*/}
                    {/*            <Button variant="outline-success" onClick={()=> setCreateTypeVisible(true)} className="m-2" disabled>Изменить</Button>*/}
                    {/*            <Button variant="outline-danger" onClick={()=> setDeleteTypeVisible(true)} className="m-2" disabled>Удалить</Button>*/}
                    {/*        </div>*/}

                    {/*    }*/}

                    {/*</div>*/}


                    <Table striped bordered hover size="sm" >
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Название</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{table.user_auth.map(user =>*/}
                        {/*    <tr>*/}
                        {/*        <td>{user.id}</td>*/}
                        {/*        <td>{user.email}</td>*/}
                        {/*        <td><Button*/}
                        {/*            variant="outline-primary" className="mt-2"*/}
                        {/*            // onClick={()=> table.setSelectedType(user)}*/}
                        {/*            // border={user.id === table.selectedType.id ? 'danger' : 'light'}*/}
                        {/*        >Выбрать</Button></td>*/}
                        {/*    </tr>*/}
                        {/*)}*/}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddType show={addTypeVisible} onHide={()=> setAddTypeVisible(false)}/>
            <CreateType show={createTypeVisible} onHide={()=> setCreateTypeVisible(false)}/>
            <DeleteType show={deleteTypeVisible} onHide={()=> setDeleteTypeVisible(false)}/>
        </Container>
    );
});

export default UserPage;