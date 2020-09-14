import React, { useEffect } from "react";
import "./Adresses.css";
import axios from "../axios";

import { useStateValue } from "../State&auth/StateProvider";

import { Link } from "react-router-dom";

function Adresses() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    axios
      .get("https://clone-42355.firebaseio.com/address.json")
      .then((res) => {
        const fetchedAddresses = [];
        for (let key in res.data) {
          fetchedAddresses.push({
            ...res.data[key],
            id: key,
          });

          if (user) {
            addAddress(fetchedAddresses);
          }
        }
      }, user)
      .catch((error) => {
        console.log(error);
        //   dispatch(fetchIngredientsFailed());
      });
  }, []);

  const addAddress = (fetchedAddresses) => {
    dispatch({
      type: "ADD_ADDRESS",
      addresses: fetchedAddresses,
    });
  };

  const addDefaultAddress = (id) => {
    dispatch({
      type: "CHANGE_DEFAULT_ADDRESS",
      id: id,
    });
  };

  //   let createCard = fetchedAddresses.map((item) => (
  //     <div className="addresses_cardFull" key={item.id}>
  //       <h1>HOLA</h1>
  //       <span>
  //         <strong>{item.fullName}</strong>
  //       </span>
  //       <p>{item.AddressLine1}</p>
  //       {item.AddressLine2 ? <p>{item.AddressLine2}</p> : null}
  //       <p>{item.city}</p>
  //       <p>{item.state}</p>
  //       <p>{item.country}</p>
  //       <p>{item.zipCode}</p>
  //       {item.phoneNumber ? <p>{item.phoneNumber}</p> : null}
  //     </div>
  //   ));

  const linkStyle = {
    fontSize: "12px",
    color: "#555",
  };
  return (
    <div className="addresses">
      <div className="addresses_links">
        <Link to="/home" className="adresses_Link">
          <span>Home</span>
        </Link>
        <span> -> </span>
        <Link to="/checkout" className="adresses_Link">
          <span>Checkout </span>
        </Link>
        <span> -> </span>
        <Link to="/payment" className="adresses_Link">
          <span>Payment</span>
        </Link>
        <span> -> </span>
        <Link to="/addresses" className="adresses_Link">
          <span>Addresses</span>
        </Link>
      </div>
      <h1>Your Addresses</h1>
      <div className="addresses_container">
        <Link to={user?.email ? "/address" : "/login"}>
          <div className="addresses_card">
            <p>{user?.email ? "" : "Login to add an address"}</p>
            <span className="addresses_plus">+</span>
            <h3>Add Address</h3>
          </div>
        </Link>
        {user?.addresses
          ? user.addresses.map((item) => (
              <div className="addresses_cardFull" key={item.id}>
                <span></span>
                <span className="addresses_cardTitle">
                  <strong>{item.fullName}</strong>
                </span>
                <p>{item.AddressLine1}</p>
                {item.AddressLine2 ? <p>{item.AddressLine2}</p> : null}
                <p>{item.city}</p>
                <p>{item.state}</p>
                <p>{item.country}</p>
                <p>{item.zipCode}</p>
                {item.phoneNumber ? <p>{item.phoneNumber}</p> : null}
                <a
                  onClick={() => addDefaultAddress(item.id)}
                  className="addresses_addDefaultBtn"
                >
                  Add this as my default address
                </a>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Adresses;
