import React from 'react';
import styles from './Modal.module.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import BackDrop from '../Backdrop/Backdrop';

const Modal = props => {

    // shouldComponentUpdate(nextProps, nextState){
    //     return nextProps.show !== props.show || nextProps.children !== props.children;
    // }


        return (
            <Auxiliary>
            <BackDrop show={props.show} clicked={props.modalClosed} />
            <div className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
    
                }}>
                {props.children}
            </div>
        </Auxiliary>
        );
}

export default React.memo(Modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);