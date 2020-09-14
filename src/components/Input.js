import React from "react";

import "./Input.css";

const Input = (props) => {
  let inputElement = null;
  const inputClasses=["input_element"];
  let validationError = null;

  if (props.invalid && props.touched) {
  validationError = <p>Please enter a valid value!</p>;
  }
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push();
    }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value} 
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
      case "select":
        inputElement = (
          <select
            className={"input_element"}
            value={props.value}
            onChange={props.changed}
          >
              {props.elementConfig.options.map(option =>{
                 return <option key={option.value} value={option.value}>{option.displayValue}</option>
              })}
          </select>
        );
        break;
    default:
      inputElement = (
        <input
          className={"input_element"}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }
  return (
    <div className={"input"}>
      <label className={"input_label"}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
