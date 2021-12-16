import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {Context} from "../index";
import {
    fetchCompositionReviewAPI,
    fetchOneCompositionAPI,
    fetchCompositionRatingAPI,
    fetchCompositionAllProfessionAPI,
    fetchCompositionTypeAPI,
    fetchCompositionCountryAPI,
    fetchCompositionGenreAPI,
    fetchCompositionHumanAPI,
    fetchCompositionAllReviewAPI
} from "../http/compositionAPI";
import AddRating from "../components/modals/modalsRating/AddRating";
import CreateRating from "../components/modals/modalsRating/CreateRating";
import DeleteRating from "../components/modals/modalsRating/DeleteRating";
import AddReview from "../components/modals/modalsReview/AddReview";
import CreateReview from "../components/modals/modalsReview/CreateReview";
import DeleteReview from "../components/modals/modalsReview/DeleteReview";
import AddRatingReview from "../components/modals/AddRatingReview";
import {observer} from "mobx-react-lite";

const CompositionPage = observer(() => {
    const {user} = useContext(Context)
    const {rating} = useContext(Context)
    const {review} = useContext(Context)
    const {id} = useParams()
    const userId = user.user.id

    const [oneComposition, setComposition] = useState({})
    const [year, setYear] = useState('')
    const [rate, setRate] = useState('')
    const [professions, setProfession] = useState([])
    const [types, setType] = useState({})
    const [countrys, setCountry] = useState([])
    const [genres, setGenre] = useState([])
    const [humans, setHuman] = useState([])
    const [reviews, setReview] = useState([])
    const [oneRating, setOneRating] = useState(null)
    const [oneReview, setOneReview] = useState(null)
    // console.log(oneRating)
    {!user.isAuth ?
        useEffect(()=>{
            fetchOneCompositionAPI(id).then(data => {
                fetchOneCompositionFunction(data)
                // setComposition(data)
                // setYear(data.year1.substr(8, 2) + "." + data.year1.substr(5, 2) + "." + data.year1.substr(0, 4))
                // const new_rate = data.rating / 10
                // if((`${new_rate}`).length == 1 || new_rate == 10)
                // {
                //     setRate(data.rating / 10 + ".0")
                // }
                // else
                // {
                //     setRate(data.rating / 10)
                // }
            })
            fetchCompositionAllProfessionAPI(id).then(data => setProfession(data))
            fetchCompositionTypeAPI(id).then(data => setType(data))
            fetchCompositionCountryAPI(id).then(data => setCountry(data))
            fetchCompositionGenreAPI(id).then(data => setGenre(data))
            fetchCompositionHumanAPI(id).then(data => setHuman(data))
            fetchCompositionAllReviewAPI(id).then(data => setReview(data))
        },[])
        :
        useEffect(()=>{
            fetchOneCompositionAPI(id).then(data => {
                fetchOneCompositionFunction(data)
                // setComposition(data)
                // setYear(data.year1.substr(8, 2) + "." + data.year1.substr(5, 2) + "." + data.year1.substr(0, 4))
                //
                // const new_rate = data.rating / 10
                // if((`${new_rate}`).length == 1 || new_rate == 10)
                // {
                //     setRate(data.rating / 10 + ".0")
                // }
                // else
                // {
                //     setRate(data.rating / 10)
                // }
            })
            fetchCompositionAllProfessionAPI(id).then(data => setProfession(data))
            fetchCompositionTypeAPI(id).then(data => setType(data))
            fetchCompositionCountryAPI(id).then(data => setCountry(data))
            fetchCompositionGenreAPI(id).then(data => setGenre(data))
            fetchCompositionHumanAPI(id).then(data => setHuman(data))
            fetchCompositionAllReviewAPI(id).then(data => setReview(data))
            fetchCompositionRatingFunction()
            fetchCompositionReviewFunction()
        },[])
    }

    const fetchCompositionRatingFunction = () =>{
        fetchCompositionRatingAPI(id, userId).then(data => {
            setOneRating(data)
            rating.setSelectedRating(data)
            if(data != null)
            {
                rating.setSelectedRate(data.rate)
            }
        })
        fetchOneCompositionAPI(id).then(data => {
            fetchOneCompositionFunction(data)
            // setComposition(data)
            // setYear(data.year1.substr(8, 2) + "." + data.year1.substr(5, 2) + "." + data.year1.substr(0, 4))
            //
            // const new_rate = data.rating / 10
            // if((`${new_rate}`).length == 1 || new_rate == 10)
            // {
            //     setRate(data.rating / 10 + ".0")
            // }
            // else
            // {
            //     setRate(data.rating / 10)
            // }
        })
    }
    const fetchOneCompositionFunction = (data) =>{
        setComposition(data)
        setYear(data.year1.substr(8, 2) + "." + data.year1.substr(5, 2) + "." + data.year1.substr(0, 4))

        const new_rate = data.rating / 10
        if((`${new_rate}`).length == 1 || new_rate == 10)
        {
            setRate(data.rating / 10 + ".0")
        }
        else
        {
            setRate(data.rating / 10)
        }
    }
    const fetchCompositionReviewFunction = () =>{
        fetchCompositionAllReviewAPI(id).then(data => setReview(data))
        fetchCompositionReviewAPI(id, userId).then(data => {
            setOneReview(data)
            review.setSelectedReview(data)
        })
    }


    const [addRatingVisible, setAddRatingVisible] = useState(false)
    const [createRatingVisible, setCreateRatingVisible] = useState(false)
    const [deleteRatingVisible, setDeleteRatingVisible] = useState(false)

    const [addReviewVisible, setAddReviewVisible] = useState(false)
    const [createReviewVisible, setCreateReviewVisible] = useState(false)
    const [deleteReviewVisible, setDeleteReviewVisible] = useState(false)

    const [addRatingReviewVisible, setAddRatingReviewVisible] = useState(false)

    return (
        <Container className="mt-3"  style={{cursor: 'pointer', background: '#3C5B74', color: 'white',height: window.innerHeight + 50}}>
            <Row className="m-2">
                <Col md={4} >
                    <Image width={300} height={440} className="m-2"src={process.env.REACT_APP_API_URL + oneComposition.img}/>
                </Col>
                <Col md={2}>
                    <Row>

                        <div className="d-flex flex-column mt-3">
                            <h2  style={{color: '#B67929',}}>{oneComposition.name}</h2>
                            <div className="d-flex text-black-50" style = {{height: 10}}></div>
                            <div className="d-flex" style = {{height: 27}}> <h5 className="text-black-50" >Информация</h5></div>
                            <div className="d-flex text-black-50" style = {{height: 10}}></div>
                            <div className="d-flex" style = {{height: 27}}> <h6 className="text-black-50">Рейтинг</h6></div>
                            <div className="d-flex" style = {{height: 27}}> <h6 className="text-black-50">Тип</h6></div>
                            <div className="d-flex" style = {{height: 27}}> <h6 className="text-black-50">Страны</h6></div>
                            <div className="d-flex" style = {{height: 27}}> <h6 className="text-black-50">Жанры</h6></div>


                            {professions.map(info =>
                                <div className="d-flex" style = {{height: 27}}>
                                    <h6 className="text-black-50">
                                        {info.name}
                                    </h6>
                                </div>
                            )}
                            <div className="d-flex" style = {{height: 27}}> <h6 className="text-black-50">Дата примьеры</h6></div>
                            <div className="d-flex" style = {{height: 27}}> <h6 className="text-black-50">Описание</h6></div>
                        </div>



                    </Row>
                </Col>
                <Col md={6}>
                    <Row>
                        <div className="d-flex flex-column mt-3">

                            <div className="ml-auto" >
                                {oneRating != null ?
                                    <div className="ml-auto" style = {{height: 48.4}}>
                                        <Button
                                            variant={"outline-info"}
                                            className="ml-2"
                                            onClick={() => {
                                                setCreateRatingVisible(true)
                                            }}
                                        >
                                            Изменить оценку
                                        </Button>
                                        <Button
                                            variant={"outline-danger"}
                                            className="ml-2"
                                            onClick={() => {
                                                setDeleteRatingVisible(true)
                                            }}
                                        >
                                            Удалить оценку
                                        </Button>

                                        <div className="d-flex text-black-50" style = {{height: 10}}></div>

                                    </div>

                                    :
                                    <div className="ml-auto" style = {{height: 48.4}}>
                                        <Button
                                            variant={"outline-info"}
                                            className="ml-2"
                                            onClick={() => {
                                                {!user.isAuth ?
                                                    setAddRatingReviewVisible(true)
                                                    :
                                                    setAddRatingVisible(true)
                                                }
                                            }}
                                        >
                                            Оценить
                                        </Button>

                                        <div className="d-flex text-black-50" style = {{height: 10}}></div>

                                    </div>
                                }
                                <div className="ml-auto">
                                    {oneReview != null ?
                                        <div className="ml-auto" style = {{height: 48.4}}>
                                            <Button
                                                variant={"outline-info"}
                                                className="ml-2"
                                                onClick={() => {
                                                    setCreateReviewVisible(true)
                                                }}
                                            >
                                                Изменить рецензию
                                            </Button>
                                            <Button
                                                variant={"outline-danger"}
                                                className="ml-2"
                                                onClick={() => {
                                                    setDeleteReviewVisible(true)
                                                }}
                                            >
                                                Удалить рецензию
                                            </Button>
                                        </div>

                                        :
                                        <div className="ml-auto" style = {{height: 38}}>
                                            <Button
                                                variant={"outline-info"}
                                                className="ml-2"
                                                onClick={() => {
                                                    {!user.isAuth ?
                                                        setAddRatingReviewVisible(true)
                                                        :
                                                        setAddReviewVisible(true)
                                                    }
                                                }}
                                            >
                                                Оставить рецензию
                                            </Button>
                                        </div>
                                    }
                                </div>
                            </div>



                            <div className="d-flex text-black-50" style = {{height: 10}}></div>
                            <div className="d-flex" style = {{height: 27}}>

                                    {rate >= 7 ?
                                        <h6 style = {{color: 'green'}}> {rate}</h6>
                                    :
                                        <div>
                                            {rate >= 5 ?
                                                <h6 style = {{color: 'gray'}}> {rate}</h6>
                                                :
                                                <h6 style = {{color: 'red'}}> {rate}</h6>
                                            }
                                        </div>
                                    }
                            </div>
                            <div className="d-flex" style = {{height: 27}}> <h6 >{types.name}</h6></div>



                            <div className="d-flex" style = {{height: 27}}>
                                {countrys.map(info =>
                                    <h6 className="d-flex">
                                        {info.name + ','}
                                    </h6>
                                )}
                            </div>
                            <div className="d-flex" style = {{height: 27}}>
                                {genres.map(info =>
                                    <h6 className="d-flex">
                                        {info.name + ','}
                                    </h6>
                                )}
                            </div>
                            {humans.map(info =>
                                <div className="d-flex" style = {{height: 27}}>
                                    {info && info.map(info_2 =>
                                        <h6 className="d-flex">
                                            {info_2.fio}
                                        </h6>
                                    )}
                                </div>
                            )}
                            {/*<div className="d-flex" style = {{height: 27}}> <h6 >{oneComposition.year1.substr(8, 2)}.{oneComposition.year1.substr(5, 2)}.{oneComposition.year1.substr(0, 4)}</h6></div>*/}
                            <div className="d-flex" style = {{height: 27}}> <h6 >{year}</h6></div>
                            <div className="d-flex" style = {{height: 27}}> <h6 >{oneComposition.description}</h6></div>


                        </div>

                    </Row>
                </Col>
            </Row>
            <h5 className="text-black-50" >Рецензии</h5>
            <Row className="m-2">

                {reviews.map(review =>
                    <Col md={3} className={"mt-3"}>
                        <Card style={{width: 250,height: 250, cursor: 'pointer', background: '#B67929',border:'#3C5B74', color: "white"}} >

                            <div className="d-flex justify-content-between align-items-center" style={{width: 125}}>
                                <Image width={45} height={45} src={process.env.REACT_APP_API_URL + review.img_user}/>
                                <h10 style={{fontSize: '13px'}} >{review.fio_user}</h10>
                            </div>
                            <div>{review.title}</div>
                            <div>{review.text}</div>
                            <div className="d-flex justify-content-between align-items-center">


                                <div className="d-flex align-items-center">
                                    {/*<div>{composition.rating}</div>*/}
                                </div>
                            </div>
                            {/*<div>moment().format("MMM Do YY")</div>*/}
                        </Card>
                    </Col>
                )}
            </Row>
            <AddRating show={addRatingVisible} onHide={()=> {
                setAddRatingVisible(false)
                fetchCompositionRatingFunction()
            }}/>

            <CreateRating show={createRatingVisible} onHide={()=> {
                setCreateRatingVisible(false)
                fetchCompositionRatingFunction()
            }}/>
            <DeleteRating show={deleteRatingVisible} onHide={()=> {
                setDeleteRatingVisible(false)
                fetchCompositionRatingFunction()
            }}/>

            <AddReview show={addReviewVisible} onHide={()=> {
                setAddReviewVisible(false)
                fetchCompositionReviewFunction()
            }}/>
            <CreateReview show={createReviewVisible} onHide={()=> {
                setCreateReviewVisible(false)
                fetchCompositionReviewFunction()
            }}/>
            <DeleteReview show={deleteReviewVisible} onHide={()=> {
                setDeleteReviewVisible(false)
                fetchCompositionReviewFunction()
            }}/>

            <AddRatingReview show={addRatingReviewVisible} onHide={()=> setAddRatingReviewVisible(false)}/>
        </Container>

    );
});

export default CompositionPage;