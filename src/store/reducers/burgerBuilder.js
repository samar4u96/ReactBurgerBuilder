import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 20,
    error: false,
    building: false,
};

const INGREDIENTS_PRICE = {
    salad: 10,
    bacon: 15,
    cheese: 20,
    meat: 25,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,  
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
                building: true,
            }
        case actionTypes.REMOVE_INGREDIENTS: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,    
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                building: true, 
            }
        case actionTypes.SET_INGREDIENTS: 
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 20,
                error: false,
                building: false,
            };
            case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return {
                ...state,
                error: false,
            };
        default:
            return state;
    }
}

export default reducer;