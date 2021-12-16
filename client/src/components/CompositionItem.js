import React, {useState} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import {COMPOSITION_ROUTE} from "../utils/consts";

const CompositionItem = ({composition}) => {
    const history = useHistory()
    const getRate = (rating) => {
        const new_rate = rating / 10
        if((`${new_rate}`).length == 1 || new_rate == 10)
        {
            return(rating / 10 + ".0")
        }
        else
        {
            return(rating / 10)
        }
    };
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(COMPOSITION_ROUTE + '/' + composition.id)}>
            <Card style={{width: 150, cursor: 'pointer', background: '#3C5B74',border:'#3C5B74', color: "white"}} >
                <Image width={150} height={220} src={process.env.REACT_APP_API_URL + composition.img}/>
                <div className="d-flex justify-content-between align-items-center">
                    <div>{composition.name}</div>
                    <div className="d-flex align-items-center">
                        <div>
                            {getRate(composition.rating) >= 7 ?
                                <h6 style = {{color: 'green'}}> {getRate(composition.rating)}</h6>
                                :
                                <div>
                                    {getRate(composition.rating) >= 5 ?
                                        <h6 style = {{color: 'gray'}}> {getRate(composition.rating)}</h6>
                                        :
                                        <h6 style = {{color: 'red'}}> {getRate(composition.rating)}</h6>
                                    }
                                </div>
                            }


                        </div>
                    </div>
                </div>
                <div>{composition.year1.substr(0, 4)}</div>
            </Card>
        </Col>
    );
};

export default CompositionItem;