import React, {useContext, PureComponent} from 'react';
import {Button, Card, Dropdown, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip } from 'recharts';




const ShowGistUser_ratingAdmin = observer(({show, onHide}) => {

    const {rating} = useContext(Context)
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Card style={{width: 150, background: '#00243F',borderColor:'#00243F', color: "white"}} >
                    <Image width={150} height={220} src={process.env.REACT_APP_API_URL + payload[0].payload.img_composition}/>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>{`${payload[0].payload.name_composition} (${payload[0].payload.year1.substr(0, 4)}) `}</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <h6> Моя оценка : </h6>
                        {payload[0].value >= 7 ?
                            <h6 style = {{color: 'green'}}> {`${payload[0].value}`}</h6>
                            :
                            <div>
                                {payload[0].value >= 5 ?
                                    <h6 style = {{color: 'gray'}}> {`${payload[0].value}`}</h6>
                                    :
                                    <h6 style = {{color: 'red'}}> {`${payload[0].value}`}</h6>
                                }
                            </div>
                        }
                    </div>
                    <div className="d-flex align-items-center">
                        Дата : {`${payload[0].payload.updatedAt.substr(8, 2) + "." + payload[0].payload.updatedAt.substr(5, 2) + "." + payload[0].payload.updatedAt.substr(0, 4)}`}
                    </div>
                </Card>
            );
        }

        return null;

    };
    class CustomizedAxisTick extends PureComponent {
        render() {
            const { x, y, stroke, payload } = this.props;
            return (
                <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={16} fill="#666">
                        {payload.value ?
                            payload.value.substr(8, 2) + "." + payload.value.substr(5, 2) + "." + payload.value.substr(0, 4)
                        :
                            null
                        }
                    </text>
                </g>
            );
        }
    }
    return (
        <Modal
            show = {show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    График оценок
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <LineChart width={750} height={450} data={rating.rating} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="updatedAt" tick={<CustomizedAxisTick />} />
                    <YAxis type="number" domain={[0, 10]} />
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ShowGistUser_ratingAdmin;