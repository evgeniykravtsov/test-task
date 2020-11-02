import React from 'react';
import style from './Button.module.scss';

export function Button({text, handler}) {

    return <button onClick={handler} className={style.button}>
                {text}
            </button>
}