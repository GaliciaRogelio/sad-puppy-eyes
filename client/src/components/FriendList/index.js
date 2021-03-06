import React from "react";
import { Link } from "react-router-dom";

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return (
      <div className="emptyFriendList">
      <p className="failed text-light p-3">No friends yet... {username}, make some littermates!</p>
      </div>
    );
  }

  return (
    <div className="friendList bg-dark">
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? "friend" : "friends"}
      </h5>
      {friends.map((friend) => (
        <button className="btn w-100 display-block mb-2" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;
