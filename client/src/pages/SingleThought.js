import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PAYMENT } from "../utils/queries";
//import ReactionList from "../components/ReactionList";
//import ReactionForm from "../components/ReactionForm";
import auth from "../utils/auth";

//Reverting Back Changes Below 
const SinglePayment = (props) => {
  const { id: paymentId } = useParams();
  // console.log(thoughtId);

  const { loading, data } = useQuery(QUERY_PAYMENT, {
    variables: { id: paymentId },
  });

  const payment = data?.payment || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {payment.username}
          </span>{" "}
          payment on {payment.createdAt}
        </p>
        <div className="card-body">
          <p>{payment.paymentAmount}</p>
        </div>
      </div>

      {/* {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
      {auth.loggedIn() && <ReactionForm thoughtId={thought._id} />} */}
    </div>
  );
};

export default SinglePayment;
