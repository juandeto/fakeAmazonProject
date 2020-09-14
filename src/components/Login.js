import React, {  useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from '../State&auth/firebase';
import axios from "../axios";
import { useStateValue } from "../State&auth/StateProvider";

function Login() {
   const [{ user }, dispatch] = useStateValue();
    const history = useHistory();//allow us to programatically change the url
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn =(e) =>{
        e.preventDefault();

        //firebase login happens here
        auth
            .signInWithEmailAndPassword(email, password)
            .then( auth =>{
              axios
              .get("https://clone-42355.firebaseio.com/address.json")
              .then((res) => {
                const fetchedAddresses = [];
                for (let key in res.data) {
                  fetchedAddresses.push({
                    ...res.data[key],
                    id: key,
                  });
                  
                  //si hay usuario logueado y tengo mas de una direccion, las agrego a mi estado
                 if(fetchedAddresses.length > 0){
                    addAddress(fetchedAddresses);
                    addDefaultAddress(fetchedAddresses);
                 }
                    
                }
              })
              .then((auth) =>{
                
                 history.push('/')

               
           })
              .catch((error) => {
                console.log(error);
                //   dispatch(fetchIngredientsFailed());
              }); 
            })
            .catch(error => alert(error.message))
    }       

    const register = (e)=>{
        e.preventDefault();

        //here register with firebase
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) =>{
                 //a user was created
                if(auth){
                  history.push('/')

                }
                
            })

            .catch(error => alert(error.message))
    }

    const addAddress = (fetchedAddresses) => {

      dispatch({
        type: "ADD_ADDRESS",
        addresses: fetchedAddresses,
      });
      
     
    };
  
    const addDefaultAddress = (fetchedAddresses) =>{
  
        dispatch({
          type: "SET_DEFAULT_ADDRESS",
          addresses: fetchedAddresses,
        })
      }
      

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          alt="logo"
          src="https://miro.medium.com/max/396/0*bVnfVVG7Y7qXQcO1"
        />
      </Link>
      <div className="login_container">
        <h1>Sign-in</h1>
        <form>
          <h5>Email</h5>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
          <h5>Password</h5>
          <input type="password" value={password} onChange={e=> setPassword(e.target.value)}/>
          <button className="login_signinButton" type="submit" onClick={signIn}>Sign In</button>
          <p>
            By signing-in you agree to AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          <button 
          onClick={register}
          className="login_registerButton">Create your Amazon acount</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
