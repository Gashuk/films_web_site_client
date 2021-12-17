import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {ListGroup} from "react-bootstrap";

const Table_admin = observer(() => {
    const {table} = useContext(Context)
    const history = useHistory()

    return (
        <ListGroup className={"m-2"}>
            {table.tables_ADMIN.map(tables =>
                <ListGroup.Item
                    style={tables.id === table.selectedTable_ADMIN.id ?
                        {cursor: 'pointer', background: '#9cacbf', color: 'black',}
                        :
                        {cursor: 'pointer', background: '#B67929', color: 'white',}
                    }
                    onClick={() => {
                        table.setSelectedTable_ADMIN(tables)
                        history.push(tables.url)
                    }}
                >
                    {tables.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default Table_admin;