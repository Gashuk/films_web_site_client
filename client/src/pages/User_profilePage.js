import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Nav, Row, Table} from "react-bootstrap";
import Table_User from "../components/Table_User";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CreateUser_profile from "../components/modals/CreateUser_profile";
import {fetchUser_profiles} from "../http/userAPI";

const User_profilePage = observer(() => {

    const {user} = useContext(Context)
    const id = user.user.id
    const [value, setValue] = useState(user.user)

    useEffect(()=>{
        fetchUser_profiles(`${id}`).then(data => {
            setValue(data)
        })
    },[])

    const [createUser_profileVisible, setCreateUser_profileVisible] = useState(false)
    return (
        <Container className="mt-3" style={{ background: '#3C5B74',height: window.innerHeight - 54}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_User/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Профиль</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <Button variant="outline-success" className="m-2"
                                onClick={()=> {setCreateUser_profileVisible(true)}}
                        >Изменить</Button>
                    </div>

                    <div className="d-flex justify-content-between align-items-center" style={{width: 300}}>
                        <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + value.img}/>
                        <div>
                            <h5 className="text-black-50">ФИО: </h5><h5 style={{ color: 'white'}}>{value.fio}</h5>
                            <h5 className="text-black-50">Почта: </h5><h5 style={{ color: 'white'}}>{value.email}</h5>
                        </div>

                    </div>
                </Col>
            </Row>
            <CreateUser_profile show={createUser_profileVisible} onHide={()=> {
                setCreateUser_profileVisible(false)
                fetchUser_profiles(`${id}`).then(data => {setValue(data)})
            }}/>
        </Container>
    );
});

export default User_profilePage;