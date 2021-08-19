import React, { useState } from "react";
import { useMutation } from "@apollo/client";
// import { ADD_THOUGHT } from "../../utils/mutations";
// import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";
import { ADD_PAYMENT } from "../../utils/mutations";
import { QUERY_PAYMENTS, QUERY_ME } from "../../utils/queries";

// const ThoughtForm = () => {
//   const [thoughtText, setText] = useState("");
//   const [characterCount, setCharacterCount] = useState(0);
const PaymentForm = () => {
    const [paymentAmount, setAmount] = useState("");
    const [characterCount, setCharacterCount] = useState(0);

  const [addPayment, { error }] = useMutation(ADD_PAYMENT, {
    update(cache, { data: { addPayment } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { payments } = cache.readQuery({ query: QUERY_PAYMENTS });
        cache.writeQuery({
          query: QUERY_PAYMENTS,
          data: { payments: [addPayment, ...payments] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache, appending new thought to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, payments: [...me.payments, addPayment] } },
      });
    },
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setAmount(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addPayment({
        variables: { paymentAmount },
      });

      // clear form value
      setAmount("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Other Amount ..."
          value={paymentAmount}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};



export default PaymentForm;
