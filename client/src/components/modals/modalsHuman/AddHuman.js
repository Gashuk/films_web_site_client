import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {addHumanAPI} from "../../../http/humanAPI";

const AddHuman = observer(({show, onHide}) => {

    const {table} = useContext(Context)
    const defaultImg = table.defaultImg.defaultImgHumanUser
    const [fio, setFio] = useState('')
    const [img, setImg] = useState(table.defaultImg.defaultImgHumanUser)
    const [preview, setPreview] = useState(null)

    const addHuman = () =>{

        const regex_fio = fio.replace(/^\s+|\s+$/g, '')
        if(regex_fio == '')
        {
            alert("Пустое поле ФИО!!!!")
        }
        else
        {
            const formData = new FormData()
            formData.append('fio', fio)
            formData.append('img', img)
            formData.append('defaultImg', defaultImg)


            addHumanAPI(formData).then(data=> {
                onHideFunction()
            })
        }
    }

    const onHideFunction = () =>{
        setFio('')
        setImg(table.defaultImg.defaultImgHumanUser)
        setPreview(null)
        onHide()
    }
    const deleteAvatar = (boolSelectFile) =>{
        if(boolSelectFile)
        {
            setImg(table.defaultImg.defaultImgHumanUser)
        }
    }

    useEffect(() => {
        try
        {
            if (!img)
            {
                setPreview(null)
                return
            }

            const objectUrl = URL.createObjectURL(img)
            setPreview(objectUrl)

            return () => URL.revokeObjectURL(objectUrl)
        }
        catch (e)
        {}

    }, [img])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0)
        {
            setImg(table.defaultImg.defaultImgHumanUser)
            return
        }

        setImg(e.target.files[0])
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
                    Добавление персоны
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    ФИО
                    <Form.Control
                        value={fio}
                        onChange={e =>setFio(e.target.value)}
                        placeholder={"Введите ФИО"}
                    />
                    Аватар
                    <br/>

                            {img == table.defaultImg.defaultImgHumanUser ?
                                <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + table.defaultImg.defaultImgHumanUser}/>
                                :
                                <div>
                                    <Image width={130} height={190} className="m-2" src={preview}/>
                                    <Button variant="outline-danger"
                                            onClick={()=>
                                            {
                                                deleteAvatar(true)
                                            }}>
                                        Удалить фотографию
                                    </Button>
                                </div>
                            }

                    <br/>

                    <div className="custom-file">
                        <input id="customFileLangHTML" type="file" className="custom-file-input" onChange={onSelectFile}/>
                        <label className="custom-file-label" htmlFor="customFileLangHTML" data-browse="Найти">Выберите фотографию</label>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addHuman}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHideFunction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddHuman;