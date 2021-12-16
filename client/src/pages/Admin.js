import React, {useContext, useEffect} from 'react';
import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import GenreBar from "../components/GenreBar";
import CompositionList from "../components/CompositionList";
import Table_admin from "../components/Table_admin";
import Table_User from "../components/Table_User";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {
    fetchCompositionAllProfessionAPI, fetchCompositionAllReviewAPI,
    fetchCompositionCountryAPI, fetchCompositionGenreAPI, fetchCompositionHumanAPI,
    fetchCompositionTypeAPI,
    fetchOneCompositionAPI
} from "../http/compositionAPI";
import {fetchUser_profiles} from "../http/userAPI";
import {COMPOSITION_ROUTE_ADMIN, USER_PROFILE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const Admin = observer(() => {
    const {user} = useContext(Context)
    console.log(!user.isADMIN)
    const {table} = useContext(Context)
    const history = useHistory()

    if(!user.isADMIN)
    {
        useEffect(()=>{
            table.setSelectedTable_USER({id: 1, name: 'Профиль', url:USER_PROFILE_ROUTE})
            history.push(USER_PROFILE_ROUTE)
        },[])
    }
    else
    {
        useEffect(()=>{
            table.setSelectedTable_ADMIN({id: 1, name: 'Произведения', url:COMPOSITION_ROUTE_ADMIN})
            history.push(COMPOSITION_ROUTE_ADMIN)
        },[])
    }

    return (
        <Container style = {{background: '#3C5B74'}}>
        <Row className="mt-2">
                <Col md={3}>
                    {user.isADMIN ?
                         <Table_admin/>
                         :
                         <Table_User/>
                    }

                </Col>
                <Col md={9}>
                </Col>
            </Row>
        </Container>
    );
});

export default Admin;