import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";
import CheckoutInput from "./CheckoutInput";

const isEmpty = (value) => value.trim() === "";
const isSixCharLong = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const pcodeRef = useRef();
  const cityRef = useRef();
  const [formValidity, setFormValidity] = useState({
    name: null,
    street: null,
    pcode: null,
    city: null,
  });

  const formHandler = (e) => {
    e.preventDefault();
    const nameEntered = nameRef.current.value;
    const streetEntered = streetRef.current.value;
    const pcodeEntered = pcodeRef.current.value;
    const cityEntered = cityRef.current.value;
    console.log(nameEntered, streetEntered, pcodeEntered, cityEntered);
    const isNameValid = !isEmpty(nameEntered);
    const isStreetValid = !isEmpty(streetEntered);
    const isPcodeValid = isSixCharLong(pcodeEntered);
    const isCityValid = !isEmpty(cityEntered);
    setFormValidity({
      name: isNameValid,
      street: isStreetValid,
      city: isCityValid,
      pcode: isPcodeValid,
    });
    const isFormValid =
      isNameValid && isStreetValid && isCityValid && isPcodeValid;
    if (!isFormValid) {
      return false;
    }
    console.log();
    props.onSubmit({
      name: nameEntered,
      street: streetEntered,
      pcode: pcodeEntered,
      city: cityEntered,
    });
  };

  return (
    <form className={classes.form} onSubmit={formHandler} autoComplete="off">
      <CheckoutInput
        id="name"
        inputValidaty={formValidity.name}
        label="Name"
        ref={nameRef}
      />
      <CheckoutInput
        id="street"
        inputValidaty={formValidity.street}
        label="Street"
        ref={streetRef}
      />
      <CheckoutInput
        id="postalcode"
        inputValidaty={formValidity.pcode}
        label="Postal Code"
        ref={pcodeRef}
      />
      <CheckoutInput
        id="city"
        inputValidaty={formValidity.city}
        label="City"
        ref={cityRef}
      />
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

Checkout.propTypes = {};

export default Checkout;
