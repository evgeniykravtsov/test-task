import React from 'react';
import style from './RowElement.module.scss';

export function RowElement({value, onChangeHandler, canEdit}) {

    const onChange = (event) => {
        if(!canEdit) return value
        onChangeHandler(event.target.value)
    }

    return <td className={style["row__element"]}>
                <input type="text"
                        readOnly={!canEdit}
                        value={value}
                        onChange={onChange}
                >
                </input>
            </td>
}