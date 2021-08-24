import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PAYMENT, QUERY_THOUGHT } from "../utils/queries";

import ReactionList from "../components/ReactionList";
import ReactionForm from "../components/ReactionForm";
import auth from "../utils/auth";

// const SinglePayment = (props) => {
//   const { id: postId } = useParams();
//   const { id: paymentId } = useParams();
//   // console.log(postId);

//   const { loading, data } = useQuery(QUERY_THOUGHT, {
//     variables: { id: postId, id: paymentId },
//   });

//   const thought = data?.thought || {};
//   const payment = data?.payment || {};
// };

const SinglePost = (props) => {
  const { id: postId } = useParams();
  // console.log(postId);

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: postId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{" "}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
      {auth.loggedIn() && <ReactionForm postId={thought._id} />}
    </div>
  );
};

export default SinglePost;
