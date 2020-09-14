import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';


function Subtotal(props) {
    const history = useHistory();
    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value)=>{
                    return(<>
                        <p>
                            Subtotal ({props.basket.length} items): 
                            <strong> {props.basket.length === 0 ? '$ 0,00 ': value}    </strong>
                        </p>
                        <small className="subtotal_gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                        </>)
                }}
                decimalScale={2}
                value={props.totalPrice} //Homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button onClick={e => history.push('./payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal;
