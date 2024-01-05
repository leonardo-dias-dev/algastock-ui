import React, {JSX} from 'react'
import './Input.css'

declare interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

function Input(props: InputProps): JSX.Element {
    return (
        <div className="AppInput">
            <label>
                <span>{props.label}</span>
                <input {...props} />
            </label>
        </div>
    );
}

export default Input
