import React, { Component } from "react";

import axios from '../axios';

import { StateContext } from '../State&auth/StateProvider';
import Input from "./Input";
import "./Address.css";
import { Link, Redirect } from 'react-router-dom';

class Address extends Component {
  state = {
    orderForm: {
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      fullName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Full Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      AddressLine1: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address Line 1",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      AddressLine2: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address Line 2",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      state: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "State / Province / Region",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "Input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      phoneNumber: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Phone Number",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
    },
    loading: false
  };

static contextType = StateContext;


  orderHandler = (event) => {
    event.preventDefault();
 ;

    let formData={}
    for(let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    
    
    formData={...formData,
               email: this.context[0].user?.email,
              default: false
              }
 
   axios
      .post("/address.json", formData)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/adresses");
 
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error)
      });
    
  };

  


  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      
      <form onSubmit={this.orderHandler}>

        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) =>
                this.inputChangeHandler(event, formElement.id)
              }
            />
          );
        })}
  
       <button 
        disabled={!this.state.formIsValid} 
        className={!this.state.formIsValid ? "address_btnDisabled" : "address_btnEnabled"}
        onClick={this.orderHandler}>
          Add this address
        </button>
       
      </form>
      
    );
    return (
        
      <div className="address">
        <div className="address_container">
        <div className="address_links">
        <Link to="/home" className="adress_Link">
          <span>Home</span>
        </Link>
        <span> -> </span>
        <Link to="/checkout" className="adress_Link">
          <span>Checkout </span>
        </Link>
        <span> -> </span>
        <Link to="/payment" className="adress_Link">
          <span>Payment</span>
        </Link>
        <span> -> </span>
        <Link to="/addresses" className="adress_Link">
          <span>Addresses</span>
        </Link>
        <span> -> </span>
        <Link to="/address" className="adress_Link">
          <span>Addresses</span>
        </Link>
      </div>
          <div className="addrescontext.s_header">
            <h2>Add a new address</h2>
            <p>
              Or pick up your packages at your convenience from our self-service
              locations. To add an Amazon Pickup Point or Locker, click here.
            </p>
          </div>

          {form ? form : ""}
        </div>
      </div>
      
    );
  }
}








export default Address;
