import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, ListGroup, Row, Table} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {fetchUser_profiles} from "../http/userAPI";
import {USER_PROFILE_ROUTE} from "../utils/consts";

const Table_User = observer(() => {
    const {table} = useContext(Context)
    const history = useHistory()
    const {user} = useContext(Context)
    // console.log(!user.isADMIN)


    return (
            <ListGroup className={"m-2"}>
                {table.tables_USER.map(tables =>
                    <ListGroup.Item
                        style={tables.id === table.selectedTable_USER.id ?
                            {cursor: 'pointer', background: '#9cacbf', color: 'black',}
                            :
                            {cursor: 'pointer', background: '#B67929', color: 'white',}
                        }
                        onClick={() => {
                            table.setSelectedTable_USER(tables)
                            history.push(tables.url)
                        }}
                    >
                        {tables.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
    );
});

export default Table_User;