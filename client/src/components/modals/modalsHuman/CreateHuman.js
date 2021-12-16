import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {updateHumanAPI} from "../../../http/humanAPI";

const CreateHuman = observer(({show, onHide}) => {

    const {human} = useContext(Context)
    const {table} = useContext(Context)
    const id = human.selectedHuman.id
    const defaultImg = table.defaultImg.defaultImgHumanUser
    const [fio, setFio] = useState('')
    const [img, setImg] = useState(table.defaultImg.defaultImgHumanUser)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        setFio(human.selectedHuman.fio)
        setImg(human.selectedHuman.img)
    },[human.selectedHuman])

    const updateHuman = () =>{

        const regex_fio = fio.replace(/^\s+|\s+$/g, '')
        if(regex_fio == '')
        {
            alert("Пустое поле ФИО!!!!")
        }
        else if(fio == human.selectedHuman.fio && img == human.selectedHuman.img)
        {
            alert("Вы ничего не изменили !!!!")
        }
        else
        {
            const formData = new FormData()
            formData.append('id', `${id}`)
            formData.append('fio', fio)
            formData.append('img', img)
            formData.append('defaultImg', defaultImg)

            if(img == human.selectedHuman.img)
            {
                formData.append('boolUpdateImg', "false")
            }
            else
            {
                formData.append('boolUpdateImg', "true")
            }

            updateHumanAPI(formData).then(data=> {
                onHide()
            })
        }

    }
    const deleteAvatar = (boolSelectFile) =>{
        if(boolSelectFile)
        {
            setImg(table.defaultImg.defaultImgHumanUser)
        }
        else
        {
            setImg(human.selectedHuman.img)
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
            setImg(human.selectedHuman.img)
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
                    Изменение жанра
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Код
                    <Form.Control
                        value={human.selectedHuman.id}
                        disabled
                    />
                    Название
                    <Form.Control
                        value={fio}
                        onChange={e =>setFio(e.target.value)}
                        placeholder={"Введите ФИО"}
                    />
                    Аватар
                    <br/>
                    {img == human.selectedHuman.img ?
                        <div>
                            {img == table.defaultImg.defaultImgHumanUser ?
                                <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + table.defaultImg.defaultImgHumanUser}/>
                                :
                                <div>
                                    <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + human.selectedHuman.img}/>
                                    <Button variant="outline-danger"
                                            onClick={()=>
                                            {
                                                deleteAvatar(true)
                                            }}>
                                        Удалить фотографию
                                    </Button>
                                </div>
                            }

                        </div>
                        :
                        <div>
                            {img == table.defaultImg.defaultImgHumanUser ?
                                <Image width={130} height={190} className="m-2" src={process.env.REACT_APP_API_URL + table.defaultImg.defaultImgHumanUser}/>
                                :
                                <div>
                                    <Image width={130} height={190}  src={preview} />
                                    <Button variant="outline-danger"
                                            onClick={()=>
                                            {
                                                deleteAvatar(true)
                                            }}>
                                        Удалить фотографию
                                    </Button>
                                </div>
                            }
                            {human.selectedHuman.img != table.defaultImg.defaultImgHumanUser ?
                                <Button variant="outline-danger"
                                        onClick={()=>
                                        {
                                            deleteAvatar(false)
                                        }}>
                                    Отменить
                                </Button>
                                :
                                <div></div>
                            }
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
                <Button variant="outline-success" onClick={updateHuman}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateHuman;