import React, {JSX} from 'react';
import './Container.css'

declare interface ContainerProps {
    children: JSX.Element | JSX.Element[]
}

function Container(props: ContainerProps): JSX.Element {
    return (
        <div className="AppContainer">
            {props.children}
        </div>
    );
}

export default Container
