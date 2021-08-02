import React from 'react';
import styles from './Input.module.css'

const input =(props) => {

    const inputClasses = [styles.InputElement];
    let inputElement = null;

    if (props.invalid && props.touched) {
        inputClasses.push(styles.Invalid);
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={styles.ValidationError}>Please enter a valid {props.errorMessage}!</p>;
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input 
            className={inputClasses.join(' ')} 
            onChange={props.changed}
            {...props.elementConfig} 
            value={props.value} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea 
            className={inputClasses.join(' ')} 
            onChange={props.changed}
            {...props.elementConfig} 
            value={props.value} />;
            break;
        case ( 'select' ):
            inputElement = (<select 
                className={inputClasses.join(' ')}  
                onChange={props.changed}
                value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value} />;
    }


    return (
    <div className={styles.Input} >
        <label className={styles.Label} >{props.label}</label>
        {inputElement}
        {validationError}
    </div>
    );
}

export default input;