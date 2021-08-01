import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientSaga } from './burgerBuilder';
import { fetchOrderSaga, purchaseBurgerSaga } from './order';
import {  takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        yield takeEvery(actionTypes.AUTH_USER, authUserSaga),
        yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENT, initIngredientSaga);
}

export function* watchBurger() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrderSaga);
}