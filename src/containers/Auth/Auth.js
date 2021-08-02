import React, { useState, useEffect } from 'react';
import styles from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Auth = props => {
    const [authForm, setAuthForm] = useState( {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                    },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    isEmail: true
                    }
                },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                    },
                value: '',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                    }
                }    
            });
            const [isSignUp, setIsSignUp] = useState(true);

            const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

            useEffect(() => {
                if(!buildingBurger && authRedirectPath !== '/') {
                    onSetAuthRedirectPath();
                }
            }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath ]);

        const checkValidity = (value, rules) => {
            let isValid = true;
            if (!rules) {
                return true;
            }
            
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
    
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid
            }
    
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid
            }
    
            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }
    
            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }
    
            return isValid;
        }

        const inputChangedHandler = (event, controlName) => {
            const updatedControls = {
                ...authForm,
                [controlName]: {
                    ...authForm[controlName],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, authForm[controlName].validation),
                    touched: true
                }
            };
            setAuthForm(updatedControls);
        }

        const submitHander = (event) => {
            event.preventDefault();
            props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
        }

        const switchAuthModeHandler = () => {
            setIsSignUp(!isSignUp);
        }

        const formElementsArray = [ ];
        for( let key in authForm) {
            formElementsArray.push({
                id: key,
                config: authForm[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            errorMessage={formElement.config.elementConfig.placeholder}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
        ));

        if (props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if(props.error) {
            errorMessage = (
                <p>{props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (props.isAuthenticated) {
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHander}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);