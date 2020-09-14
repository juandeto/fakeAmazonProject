import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useStateValue } from "./State&auth/StateProvider";

import Adresses from './components/Adresses';
import Address from './components/Address';
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Payment from './components/Payment';
import { auth } from "./State&auth/firebase";




function App() {
  const [state, dispatch] = useStateValue();
  
  useEffect(() => {
    //will only runs once, when the app component loads...
    auth.onAuthStateChanged(authUser =>{

      if(authUser){
        //the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser
        })

        //busco las direcciones en la base de datos
        
  
      }else{
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    });

    

    
  }, [])



    
    
    // .map(item =>{
    //   if(item.default){
    //     dispatch({
    //     type: "ADD_DEFAULT_ADDRESS",
    //     default: item.default,
    //   });
    //   }
    // })
  

  return (
    <Router>
      <div className="app">
        <Switch>

        <Route path="/login" component={Login}/>
          <Route path="/checkout" >
          <Header />
          <Checkout />
          </Route>
          <Route path="/payment" >
          <Header />
          <Payment />
          </Route>
          <Route path="/adresses" >
          <Header />
          <Adresses />
          </Route>
          <Route path="/address" >
          <Header />
          <Address />
          </Route>
          <Route path="/" exact >
          <Header />
          <Home />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
