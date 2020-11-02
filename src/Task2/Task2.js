import React, {useState, useEffect} from 'react';
import style from './Task2.module.scss';
import {Row} from './Components/Row/Row'
import {AddPopup} from './Components/AddPopup/AddPopup'

export function Task2() {

    const [data, setData] = useState([]);

    const [sortFlag, setSortFlag] = useState(null);

    const [addPopupFlag, setAddPopupFlag] = useState(false);

    useEffect(() => {
        fetch('https://frontend-test.netbox.ru/')
        .then(res=> {
            if(res.status < 400) {
                res.json()
                .then(data=> {
                    setData(data)
                })
            }
        })
      },[]);
    
    const deleteHadler = (id) => {
        fetch(`https://frontend-test.netbox.ru/?method=delete&id=${id}`)
        .then(res=> {
            if(res.status === 200){
                res.json()
                .then(result=> {
                    if(result.result === 'ok'){
                        let newData = data.filter(elem => !elem.some(elem => elem.field ==='ID' && elem.value === id))
                        setData(newData)
                    }
                })
            }
        })
        .catch(err=> {
            console.log(err)
        })
    }

        
    const saveHadler = (id, name, age, phone, email, setMethod) => {
        fetch(`https://frontend-test.netbox.ru/?method=update&id=${id}&name=${name}&age=${age}&phone=${phone}&email=${email}`)
        .then(res=> {
            if(res.status === 200){
                res.json()
                .then(result=> {
                    if(result.result === 'ok'){
                        setMethod(prevState=> !prevState)
                    }
                })
            }
        })
        .catch(err=> {
            console.log(err)
        })
    }

    const handleSort = (field) => {
        const hasSortFlagForThisField = sortFlag && sortFlag === field

        if(hasSortFlagForThisField){
            setData([...data.reverse()])
        }
        else if(field === 'ID' || field === 'Age' || field === 'Phone'){
            let newData = data.sort((a, b)=> {
                let sortItem1 = a.find(elem=> elem['field'] === field).value
                let sortItem2 = b.find(elem=> elem['field'] === field).value
                if(field === 'Phone'){
                    sortItem1 = sortItem1.replace(/[ +()_-]/g,"")
                    sortItem2 = sortItem2.replace(/[ +()_-]/g,"")
                }
                return +sortItem1 - +sortItem2
                
            })
            setSortFlag(field)
            setData([...newData])
        }
        else {
            let newData = data.sort((a, b)=> {
                let sortItem1 = a.find(elem=> elem['field'] === field).value.toLowerCase()
                let sortItem2 = b.find(elem=> elem['field'] === field).value.toLowerCase()
                return sortItem1 > sortItem2 ? 1 : sortItem1 < sortItem2 ? -1 : 0
            })
            setSortFlag(field)
            setData([...newData])
        }
    }

    const addButtonHandler = () => {
        setAddPopupFlag(true)
    }

    const closeAddPopup = () => {
        setAddPopupFlag(false)
    }

    return <>
                {addPopupFlag && <AddPopup closeHandler={closeAddPopup} addHandler={setData}/>}
                <button className={style.add} onClick={addButtonHandler}>Добавить</button>
                <table className={style.content}>
                    <tbody>{data.length &&
                            <>  
                                <tr>
                                    {data[0].map(elem=> <th className={style.title}
                                                        onClick={()=> handleSort(elem.field)}
                                                        key={`${elem.field}`}>{elem.field}</th>)
                                    }
                                </tr>
                                {data.map((elem)=> {
                                    return <Row item={elem}
                                            key={`${elem[0].field}-${elem[0].value}`}
                                            deleteHadler={deleteHadler}
                                            saveHadler={saveHadler}
                                            />
                                })}
                            </>}
                    </tbody>
                </table>
            </>
}