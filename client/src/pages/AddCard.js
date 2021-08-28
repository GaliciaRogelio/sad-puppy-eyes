import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CARD } from "../utils/mutations";
import auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    cardNumber: "",
  });

  const [addCard, { error }] = useMutation(ADD_CARD);

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
      const { data } = await addCard({
        variables: { ...formState },
      });

      auth.login(data.addUser.token);
      // console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your card number"
                name="cardNumber"
                type="cardNumber"
                id="cardNumber"
                value={formState.cardNumbe}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {error && <div className="failed">Entering Payment Information Failed!</div>}
          </div>
        </div>
      </div>
   
    </main>
  );
};

export default Signup;
