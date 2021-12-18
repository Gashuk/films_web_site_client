import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row, Table} from "react-bootstrap";
import Table_User from "../components/Table_User";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AddReviewAdmin from "../components/modals/modalsReviewAdmin/AddReviewAdmin";
import CreateReviewAdmin from "../components/modals/modalsReviewAdmin/CreateReviewAdmin";
import DeleteReviewAdmin from "../components/modals/modalsReviewAdmin/DeleteReviewAdmin";
import {fetchOneCompositionRatingReview, fetchUserReviewAPI} from "../http/userAPI";

const User_reviewPage = observer(() => {

    const {review} = useContext(Context)
    const {composition_admin} = useContext(Context)
    const {user} = useContext(Context)
    const userId = user.user.id



    useEffect(()=>{
        fetchUserReviewAPI(`${userId}`).then(data => {
            review.setReview(data)

        })
    },[review.setReview])


    const [addUser_reviewVisible, setAddUser_reviewGenreVisible] = useState(false)
    const [createUser_reviewVisible, setCreateUser_reviewVisible] = useState(false)
    const [deleteUser_reviewVisible, setDeleteUser_reviewVisible] = useState(false)

    const fetchUserReviewFunction = () =>{
        fetchUserReviewAPI(`${userId}`).then(data => review.setReview(data))
        composition_admin.setSelectedComposition({})
    }

    return (
        <Container className="mt-3" style={{ background: '#3C5B74',height: window.innerHeight - 54}}>
            <Row className="mt-2">
                <Col md={3}>
                    <Table_User/>
                </Col>
                <Col md={9}>
                    <div> <h2 style={{ color: 'white'}}>Мои рецензии</h2> </div>
                    <div className="d-flex justify-content-md-end align-items-center">
                        <button type="button" className="btn btn-success float-right m-3">Экпорт рецензий</button>

                        <Button variant="outline-info" onClick={()=> {
                            composition_admin.setSelectedComposition({})
                            setAddUser_reviewGenreVisible(true)
                        }} className="m-2" >Добавить</Button>
                    </div>


                    <Table striped bordered hover size="sm" style={{ background: 'white'}}>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Произведение</th>
                            <th>Постер</th>
                            <th>Заголовок</th>
                            <th>Текст</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {review.review.map((reviews, key) =>
                            <tr>
                                <td>{key+1}</td>
                                <td>{reviews.name_composition}</td>
                                <td><Image width={50} height={50} src={process.env.REACT_APP_API_URL + reviews.img_composition}/></td>
                                <td>{reviews.title}</td>
                                <td>{reviews.text}</td>
                                <td>
                                    <Button variant="outline-success" className="m-2"
                                            onClick={()=> {
                                                review.setSelectedReview(reviews)
                                                fetchOneCompositionRatingReview(`${reviews.compositionId}`).then(data => composition_admin.setSelectedComposition(data))
                                                setCreateUser_reviewVisible(true)
                                            }}
                                    >Изменить</Button>
                                    <Button variant="outline-danger" className="m-2"
                                            onClick={()=> {
                                                review.setSelectedReview(reviews)
                                                fetchOneCompositionRatingReview(`${reviews.compositionId}`).then(data => composition_admin.setSelectedComposition(data))
                                                setDeleteUser_reviewVisible(true)
                                            }}
                                    >Удалить</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <AddReviewAdmin show={addUser_reviewVisible} onHide={()=> {
                setAddUser_reviewGenreVisible(false)
                fetchUserReviewFunction()
            }}/>
            <CreateReviewAdmin show={createUser_reviewVisible} onHide={()=> {
                setCreateUser_reviewVisible(false)
                fetchUserReviewFunction()
            }}/>
            <DeleteReviewAdmin show={deleteUser_reviewVisible} onHide={()=> {
                setDeleteUser_reviewVisible(false)
                fetchUserReviewFunction()
            }}/>
        </Container>
    );
});

export default User_reviewPage;