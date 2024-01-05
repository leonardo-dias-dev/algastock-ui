import React, {JSX} from 'react';
import './Button.css'

declare interface ButtonProps {
    content?: string
    onClick?: () => void
    appendIcon?: JSX.Element
    children: string
}

function Button(props: ButtonProps): JSX.Element {
    return (
        <button className="AppButton" onClick={props.onClick}>
            {props.children || 'Nameless button'}
            {props.appendIcon}
        </button>
    );
}

export default Button;
