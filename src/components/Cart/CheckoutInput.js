import React from "react";
import classes from "./CheckoutInput.module.css";

const CheckoutInput = React.forwardRef((props, inputRef) => {
  const { id, type, inputValidaty, label } = props;
  return (
    <div
      className={[
        classes.control,
        inputValidaty === false && classes.invalid,
      ].join(" ")}
    >
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type || "text"} ref={inputRef} />
      {inputValidaty === false && (
        <p className={classes["error-text"]}>{"Please Enter a " + label}</p>
      )}
    </div>
  );
});

CheckoutInput.propTypes = {};

export default CheckoutInput;
