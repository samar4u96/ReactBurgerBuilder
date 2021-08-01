import axios from 'axios';
import { put } from "redux-saga/effects";
import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = axios.post('https://react-my-burger-samar.firebaseio.com/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFailed(error));
    }
}

export function* fetchOrderSaga(action) {
    yield put(actions.fetchOrderStart());
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        try {
            const response = yield axios.get('https://react-my-burger-samar.firebaseio.com/orders.json'+ queryParams);
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key,
                })
            }
            yield put(actions.fetchOrderSuccess(fetchedOrders));
        } catch (error) {
            yield put(action.fetchOrderFailed(error));
        }
}