import React from 'react';
import './BasketItem.css'
import { useStateValue } from '../State&auth/StateProvider';

function BasketItem(props) {
    const [state, dispatch] = useStateValue();

    const removeFromBasket= () => {
        //dispatch here the actions into the data layer...
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            item:{
                id:props.id,
                title: props.title,
                image: props.image,
                price: props.price,
                rating: props.rating
            }
        });
    }
    
    return (  
        <div className="basket-item">
            <img src={props.image} alt="product-img"/>
            <div className="basket_info">
                <p className="basket_title"><strong>{props.title}</strong></p>
                <p className="basket_rating">
                    {Array(props.rating).fill().map((_, i) =>(
                      <span role="img" aria-label="jsx-a11y/accessible-emoji"key={i*props.id}>⭐️</span>  
                    ))}     
                </p>
                <button onClick={removeFromBasket}>Remove from basket</button>
           </div>
           <p className="basket_price">
                    <small>$</small>
                    <strong>{props.price}</strong>
            </p>
        </div>
    );
}

export default BasketItem;
