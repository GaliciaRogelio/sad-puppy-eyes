import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PAYTYPE } from "../utils/mutations";
import auth from "../utils/auth";


  const PayType = () => {
    const [formState, setFormState] = useState({
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      firstName: "",
      lastName: "",
      streetFirst: "",
      streetSecond: "",
      city: "",
      state: "",
      postal: "",
    });

  const [addPayType, { error }] = useMutation(ADD_PAYTYPE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form (notice the async!)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addPayType({
        variables: { ...formState },
      });

      auth.login(data.addPayType.token);
      // console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Add Payment Details</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your card number"
                name="cardNumber"
                type="cardNumber"
                id="cardNumber"
                value={formState.cardNumber}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="expiration date"
                name="expirationDate"
                type="expirationDate"
                id="expirationDate"
                value={formState.expirationDate}
                onChange={handleChange}
              />
               <input
                className="form-input"
                placeholder="cvv"
                name="cvv"
                type="cvv"
                id="cvv"
                value={formState.cvv}
                onChange={handleChange}
              />
               <input
                className="form-input"
                placeholder="Your first name"
                name="firstName"
                type="firstName"
                id="firstName"
                value={formState.firstName}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your last name"
                name="lastName"
                type="lasttName"
                id="lastName"
                value={formState.lastName}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Street address 1"
                name="streetFirst"
                type="streetFirst"
                id="streetFirst"
                value={formState.streetFirst}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Street address 2"
                name="streetSecond"
                type="streetSecond"
                id="streetSecond"
                value={formState.streetSecond}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="City"
                name="city"
                type="city"
                id="city"
                value={formState.city}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="State"
                name="state"
                type="state"
                id="state"
                value={formState.state}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Postal"
                name="postal"
                type="postal"
                id="postal"
                value={formState.postal}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {error && <div>Entering Card Details failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PayType;
