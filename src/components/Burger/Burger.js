import React from 'react'
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

let burger = (props) => {
    let trasnformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
           return  <BurgerIngredient key={igKey + i} type={igKey} />;
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if(trasnformedIngredients.length === 0) {
        trasnformedIngredients = <p>Please start adding Ingredients!</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {trasnformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;