import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../State&auth/StateProvider";
import { auth } from '../State&auth/firebase';


function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const regEx =/@.*/g;

  const handleAuthentication = () =>{
    if(user){
      auth.signOut();
    }
  }

  const divStyle = {
    textDecoration: 'none',
    display: 'flex',
    justifyContent: "flex-end"
  };

  return (
    <div className="header">
      <Link to="/" >
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to={!user && "/login"} style={divStyle}>
          <div onClick={handleAuthentication} className="header_option op1">
            <span className="header_optionLineOne">Hello { user ? user.email.replace(regEx, '') : 'Guest'}</span>

            <span className="header_optionLineTwo">{ user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <div className="header_option op2">
          <span className="header_optionLineOne ">Return</span>

          <span className="header_optionLineTwo">& Orders</span>
        </div>
        <div className="header_option op3">
          <span className="header_optionLineOne">Your</span>

          <span className="header_optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout" style={divStyle}>
        <div className="header_optionBasket" >
          <ShoppingBasketIcon className="header_ShoppingBasketIcon" />
          <span className="header_optionLineTwo header_basketCount">
            {basket?.length}
          </span>
        </div>
      </Link>
      </div>
    </div>
  );
}

export default Header;
