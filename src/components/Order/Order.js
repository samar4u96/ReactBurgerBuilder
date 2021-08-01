import React from 'react';
import styles from './Order.module.css';

const Order = (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients){
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #cccccc',
            padding: '5px',
        }}
        key={ig.name}>{ig.name} ({ig.amount})</span>
    }); 

    return (
        <div className={styles.Order} >
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price <strong>INR {props.price}</strong></p>
        </div>
    );
}


export default Order;