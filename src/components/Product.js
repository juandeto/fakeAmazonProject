import React from 'react';
import "./Product.css";
import { useStateValue } from '../State&auth/StateProvider';

function Product(props) {

const [{ basket }, dispatch] = useStateValue();

    const addToBasket= () => {
        //dispatch here the actions into the data layer...
        dispatch({
            type: 'ADD_TO_BASKET',
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
        <div className="product" key={props.id}>
           <div className="product_info">
                <p>{props.title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{props.price}</strong>
                </p>
                <p className="product_rating">
                    {Array(props.rating).fill().map((_, i) =>(
                      <span role="img" aria-label="jsx-a11y/accessible-emoji" key={i*props.id}>⭐️</span>  
                    ))}     
                </p>
           </div>
           <img src={props.image} alt="product-img"/>
           <button onClick={addToBasket}>Add to basket</button>
        </div>
    )
}

export default Product;
