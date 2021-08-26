import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import PostHelpList from "../components/PostHelpList";
import PaymentForm from "../components/PaymentForm";
import auth from "../utils/auth";
import FriendList from "../components/FriendList";
import PostHelp from "../components/PostHelp";



const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const thoughts = data?.thoughts || [];
  const payments = data?.paymentAmount || [];
  console.log(thoughts);

  const loggedIn = auth.loggedIn();

  return (
    <main>
      <div className="home flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-13">
            <PostHelp />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostHelpList
              thoughts={thoughts}
              title="Pups Need Your Help!"
            />
          )}
      
        </div>
        {/* <div className="flex-row justify-space-between"> */}
        {/* {loggedIn && (
        <div className="col-12 mb-13">
          <PaymentForm />
        </div>
      )} */}
        {/* <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PaymentForm
            payments={payments}
            title="Donate today ..."
          />
        )}
      </div> */}
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
