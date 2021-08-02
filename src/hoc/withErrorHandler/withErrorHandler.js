import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import axios from 'axios';

const withErrorHandler = (WrappedComponent) => {
    return props => {
    const [error, setError] = useState(null);      

            const reqInterceptor = axios.interceptors.request.use(req => {
                setError(null);
                return req;
            });
            const resInterceptor = axios.interceptors.response.use(res => res, err => {
                setError(err);
            });  
    
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);    
            }; 
        }, [ resInterceptor, reqInterceptor ]);

        const errorConfirmedHandler =() => {
            setError(null);
        }

            return (
                <Auxiliary>
                    <Modal 
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                        { error ? error.message : null }
                    </Modal>
                    <WrappedComponent {...props} />
                </Auxiliary>
            );
        }
    }

export default withErrorHandler;