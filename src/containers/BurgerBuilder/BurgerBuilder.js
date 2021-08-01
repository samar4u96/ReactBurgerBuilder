import React, { useEffect, useState } from 'react';
import Burger from '../../components/Burger/Burger.js';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BurgerIngredient/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

const BurgerBuilder = props => {
    const [ purchasing, setPurchasing ] = useState(false);

    const { onInitIngredients } = props;

    useEffect(() => {
        onInitIngredients(); 
    }, [onInitIngredients]);
    

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition; 
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction; 
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    const purchasingHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        }
        else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }        
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

        const disabledInfo = {
            ...props.ings
        }
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if ( props.ings){
            burger = (
                <Auxiliary>
                    <Burger ingredients={props.ings}/>
                         <BuildControls 
                            ingredientAdded = {props.onIngredientAdded}
                            ingredientRemoved = {props.onIngredientRemoved}
                            disabled = {disabledInfo}
                            isAuth={props.isAuthenticated}
                            purchaseable = {updatePurchaseState(props.ings)}
                            ordered = {purchasingHandler}
                            price={props.price} />
                </Auxiliary>);
            orderSummary = <OrderSummary
            ingredients={props.ings}
            purchaseCancelled={purchaseCancelHandler} 
            purchaseContinued={purchaseContinueHandler}
            price={props.price} />;
        }
        return(
            <Auxiliary>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler(BurgerBuilder));