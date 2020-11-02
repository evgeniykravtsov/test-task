import React, {useState} from 'react';
import style from './Row.module.scss';
import {Button} from '../Button/Button'
import { RowElement } from '../RowElement/RowElement';

export function Row({item, deleteHadler, saveHadler, addFlag, addClickHandler, addHandler}) {

    const [canEdit, setCanEdit] = useState(addFlag ? true : false);
    const [id, setId] = useState(addFlag ? null : item.find(elem=> elem['field'] === 'ID').value);
    const [name, setName] = useState(item.find(elem=> elem['field'] === 'Name').value);
    const [age, setAge] = useState(item.find(elem=> elem['field'] === 'Age').value);
    const [phone, setPhone] = useState(item.find(elem=> elem['field'] === 'Phone').value);
    const [email, setEmail] = useState(item.find(elem=> elem['field'] === 'E-mail').value);

    const handleRowElement = (elem) => {
        switch(true){
            case(elem['field'] === 'ID' ):
                return <RowElement 
                        value={id}
                        onChangeHandler={setId}
                        canEdit={canEdit}
                        key={`${elem.type}-${elem.value}`}
                        />
            case(elem['field'] === 'Name'):
                return <RowElement 
                        value={name}
                        onChangeHandler={setName}
                        canEdit={canEdit}
                        key={`${elem.type}-${elem.value}`}
                        />
            case(elem['field'] === 'Age'):
                return <RowElement 
                        value={age}
                        onChangeHandler={setAge}
                        canEdit={canEdit}
                        key={`${elem.type}-${elem.value}`}
                        />
            case(elem['field'] === 'Phone'):
                return <RowElement 
                        value={phone}
                        onChangeHandler={setPhone}
                        canEdit={canEdit}
                        key={`${elem.type}-${elem.value}`}
                        />
            case(elem['field'] === 'E-mail'):
                return <RowElement 
                        value={email}
                        onChangeHandler={setEmail}
                        canEdit={canEdit}
                        key={`${elem.type}-${elem.value}`}
                        />
            default:
                return 
        }
    }

    const handleSave = () => {
    
        if(canEdit){
            if(!id || !name || !age || !phone || !email) return
            saveHadler(id,name,age,phone,email,setCanEdit)
            return
        }
        setCanEdit(prevCanEdit=> !prevCanEdit)
    }

    const handleDelete = () => {
        if(canEdit) return
        deleteHadler(id)
    }

    const handleAdd = () => {
        if(!name || !age || !phone || !email) return
        fetch(`https://frontend-test.netbox.ru/?method=add&name=${name}&age=${age}&phone=${phone}&email=${email}`)
        .then(res=> {
            if(res.status === 200){
                res.json()
                .then(result=> {
                    if(result.result === 'ok'){
                        addHandler(prev=> {
                            return [...prev, [
                                {field: "ID", value: prev.length + 1, type: "string"},
                                {field: "Name", value: name, type: "string"},
                                {field: "Age", value: age, type: "integer"},
                                {field: "Phone", value: phone, type: "string"},
                                {field: "E-mail", value: email, type: "string"},]]
                        })
                    }
                })
            }
        })
        .catch(err=> {
            console.log(err)
        })
        addClickHandler()
    }

    return <tr className={style.row}>
                {item.map(item => {
                    return handleRowElement(item)
                })}
                {!addFlag && <td className={style.button}>                
                    <Button text={'Удалить'}
                     handler={handleDelete}/>
                </td>}
                {!addFlag && <td className={style.button}>
                    <Button text={canEdit ? 'Сохранить' : 'Редактировать'}
                    handler={handleSave}/>
                </td>}
                {addFlag && 
                    <td>
                        <button onClick={handleAdd}>Добавить</button>
                    </td>
                }
            </tr>
}