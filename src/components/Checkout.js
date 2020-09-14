import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "../State&auth/StateProvider";
import BasketItem from "./BasketItem";
import CurrencyFormat from 'react-currency-format';


function Checkout() {
  const [{ basket, totalPrice, user }, dispatch] = useStateValue();
  const regEx =/@.*/g;

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423592668_.jpg"
        alt="ad"
        />

        <div>
          
          <h3>Hello, {user?.email ? user.email.replace(regEx, '') : 'Guest'}</h3>
          
          <div className="checkout_header">
           <h2 className="checkout_title">
            {basket.length === 0 ? "Your Cart is empty" : "Your Cart"}
          </h2>
          <p>Price</p>
          </div>

          {basket.map((item) => {
            let i = 1;
            i++;
            return (
              <BasketItem
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                key={i * Math.random()}
                id={item.id}
              />
            );
          })}

        </div>
        <CurrencyFormat 
                renderText={(value)=>{
                    return(<>
                        <h2 className="checkout_endSubtotal">
                            Subtotal ({basket.length} items): 
                            <strong> {value}    </strong>
                        </h2>
                        </>)
                }}
                
                decimalScale={2}
                value={totalPrice} //Homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

      </div>
      <div className="checkout_right">
        <Subtotal totalPrice={totalPrice} basket={basket} />
      </div>
    </div>
  );
}

export default Checkout;
