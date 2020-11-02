import React, {useRef} from 'react';
import style from './AddPopup.module.scss';
import {Row} from '../Row/Row'

export function AddPopup({closeHandler, addHandler}) {

    let empyObjForRow = [
    {field: "Name", value: "", type: "string-add2"},
    {field: "Age", value: "", type: "integer-add3"},
    {field: "Phone", value: "", type: "string-add4"},
    {field: "E-mail", value: "", type: "string-add5"},];

    const wrapperEl = useRef(null);

    const addClickHandler = () => {
        closeHandler()
    }

    const handleClickOutside = event => {
        if (wrapperEl && !wrapperEl.current.contains(event.target)) {
            closeHandler()
        }
    }

    return <div className={style["popup-wrapper"]} onClick={(e)=> handleClickOutside(e)}>
                <div className={style["popup"]} ref={wrapperEl}>
                    <table>
                        <thead>
                            <tr>
                                {empyObjForRow.map(elem=> {
                                    return <th key={`${elem.field}-${elem.type}`}>{elem.field}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <Row addFlag
                                item={empyObjForRow}
                                addClickHandler={addClickHandler}
                                addHandler={addHandler}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
}