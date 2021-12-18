import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row, Table} from "react-bootstrap";
import Table_User from "../components/Table_User";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AddRatingAdmin from "../components/modals/modalsRatingAdmin/AddRatingAdmin";
import CreateRatingAdmin from "../components/modals/modalsRatingAdmin/CreateRatingAdmin";
import DeleteRatingAdmin from "../components/modals/modalsRatingAdmin/DeleteRatingAdmin";
import ShowGistUser_rating from "../components/modals/modalsRatingAdmin/ShowGistUser_rating";
import {fetchOneCompositionRatingReview, fetchUserRatingAPI} from "../http/userAPI";



const User_ratingPage = observer(() => {

    const {rating} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const {user} = useContext(Context)
    const userId = user.user.id


    useEffect(()=>{
        fetchUserRatingAPI(`${userId}`).then(data => {
            rating.setRating(data)

        })
    },[rating.setRating])


    const [addUser_ratingVisible, setAddUser_ratingGenreVisible] = useState(false)
    const [createUser_ratingVisible, setCreateUser_ratingVisible] = useState(false)
    const [deleteUser_ratingVisible, setDeleteUser_ratingVisible] = useState(false)

    const [showGistUser_ratingVisible, setShowGistUser_ratingVisible] = useState(false)

    const fetchUserRatingFunction = () =>{
        fetchUserRatingAPI(`${userId}`).then(data => rating.setRating(data))
        composition_admin.setSelectedComposition({})
    }

    return (
        <Container className="mt-3" style={{ background: '#3C5B74',height: window.innerHeight - 54}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_User/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Мои оценки</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">

                        <Button variant="primary" onClick={()=> {
                            setShowGistUser_ratingVisible(true)
                        }} className="m-2" >График оценок</Button>
                        <button type="button" className="btn btn-success float-right m-3">Экпорт оценок</button>


                        <Button variant="outline-info" onClick={()=> {
                            composition_admin.setSelectedComposition({})
                            setAddUser_ratingGenreVisible(true)
                        }} className="m-2" >Добавить</Button>
                    </div>


                    <Table striped bordered hover size="sm" style={{ background: 'white'}}>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Произведение</th>
                            <th>Постер</th>
                            <th>Оценка</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {rating.rating.map((ratings, key) =>
                            <tr>
                                <td>{key+1}</td>
                                <td>{ratings.name_composition}</td>
                                <td><Image width={50} height={50} src={process.env.REACT_APP_API_URL +ratings.img_composition}/></td>
                                <td>{ratings.rate}</td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                rating.setSelectedRating(ratings)
                                                fetchOneCompositionRatingReview(`${ratings.compositionId}`).then(data => composition_admin.setSelectedComposition(data))
                                                setCreateUser_ratingVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                rating.setSelectedRating(ratings)
                                                fetchOneCompositionRatingReview(`${ratings.compositionId}`).then(data => composition_admin.setSelectedComposition(data))
                                                setDeleteUser_ratingVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <ShowGistUser_rating show={showGistUser_ratingVisible} onHide={()=> {
                setShowGistUser_ratingVisible(false)
            }}/>
            <AddRatingAdmin show={addUser_ratingVisible} onHide={()=> {
                setAddUser_ratingGenreVisible(false)
                fetchUserRatingFunction()
            }}/>
            <CreateRatingAdmin show={createUser_ratingVisible} onHide={()=> {
                setCreateUser_ratingVisible(false)
                fetchUserRatingFunction()
            }}/>
            <DeleteRatingAdmin show={deleteUser_ratingVisible} onHide={()=> {
                setDeleteUser_ratingVisible(false)
                fetchUserRatingFunction()
            }}/>
        </Container>
    );
});

export default User_ratingPage;