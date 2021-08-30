import React from "react";
import { Redirect, useParams } from "react-router-dom";
import PostHelpList from "../components/PostHelpList";
import FriendList from "../components/FriendList";
import PaymentForm from "../components/PaymentForm";
import auth from "../utils/auth";
import { ADD_FRIEND } from "../utils/mutations";
import PostHelp from "../components/PostHelp";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

const Profile = () => {
  const { username: userParam } = useParams();
  const [addFriend] = useMutation(ADD_FRIEND);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  // redirect to personal profile page if username is the logged-in user's
  if (auth.loggedIn() && auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="failed">
        You must be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="profileTitle p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Littermate
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <PostHelpList
            thoughts={user.thoughts}

            title={`${user.username}'s woofs...`}

          />
          {/* <PaymentForm
            payments={user.payments}
            title={`${user.username}'s donations...`}
          /> */}
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <PostHelp />}</div>
    </div>
  );
};

export default Profile;
