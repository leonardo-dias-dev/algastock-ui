import React, {JSX} from 'react'
import './Form.scss'

declare interface FormProps {
    title?: string
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
    children: JSX.Element | JSX.Element[]
}

function Form(props: FormProps): JSX.Element {

    const preventedSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        props.onSubmit && props.onSubmit(event)
    }

    return (
        <form className="AppForm" onSubmit={preventedSubmit}>
            {
                props.title && <div className="Title">
                    {props.title}
                </div>
            }
            {props.children}
        </form>
    );
}

export default Form;
