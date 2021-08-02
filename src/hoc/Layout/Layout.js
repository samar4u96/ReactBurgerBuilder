import React, { useState } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary.js'
import styles from './Layout.module.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler =() => {
       setSideDrawerIsVisible(false)
    }

    const sideDrawerToggleHandler =() => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }

        return (
            <Auxiliary>
                <ToolBar 
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth={props.isAuthenticated}
                    open={sideDrawerIsVisible} 
                    closed={sideDrawerClosedHandler} />
                <main className={styles.Content}>
                    {props.children}
                </main>
            </Auxiliary>
        );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);