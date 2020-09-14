import React, { useState, useEffect } from "react";

import "./Payment.css";

import { useStateValue } from "../State&auth/StateProvider";
import BasketItem from "./BasketItem";
import { Link, useHistory } from "react-router-dom";

import CurrencyFormat from "react-currency-format";
import Adresses from "./Adresses";

function Payment() {
  const [{ basket, user, totalPrice }, dispatch] = useStateValue();

  const history = useHistory();

  const paymentHandler = () => {
    
    alert(
      `AMAZON FAKE informa: Usted realizo una compra por ${totalPrice.toFixed(
        2
      )} USD. Muchas gracias!`
    );
    dispatch({
      type: 'ORDER_PAID',
  });
    return history.push("/");
  };



  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout(
          <Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
              {user?.addresses?.map(add =>{
                return add.default ?(
                  <div key={add.id}>
                    <span>
                     <strong>{add.fullName}</strong>
                   </span>
                   <p>{add.AddressLine1}</p>
                   {add.AddressLine2 ? <p>{add.AddressLine2}</p> : null}
                   <p>{add.city}</p>
                   <p>{add.state}</p>
                   <p>{add.country}</p>
                   <p>{add.zipCode}</p>
                   {add.phoneNumber ? <p>{add.phoneNumber}</p> : null}
                 </div>
               ): null
              })}  
            <Link className="payment_link" to="/adresses">
              Add Address
            </Link>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <BasketItem
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                key={Math.random() * 5}
                id={item.id}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form>
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={totalPrice} //Homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={user?.token} onClick={user?.email ? paymentHandler : () =>history.push("/login")}>
                  <span>
                    {user?.email ? (
                      "Buy Now"
                    ) : (
                      
                        "Please Sign Up"
                      
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
