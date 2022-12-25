import React from 'react';
interface InputOptions {
    index: number,
    name: string,
    reference: any,
    type: string
}

export const InputField = (props: InputOptions) => {
    return (
        <div key={props.index} className="form-floating mb-3 bg-transparent">
            <input type={props.type} className="form-control bg-transparent text-white growSmall" id={props.name}
                placeholder={props.name} ref={props.reference} />
            <label htmlFor={props.name} className="text-white">{props.name}</label>
        </div>
    )
}