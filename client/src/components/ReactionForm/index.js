import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REACTION } from "../../utils/mutations";
import { Link } from "react-router-dom";



const ReactionForm = ({ postId }) => {
  const [reactionBody, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add reaction to databse
      await addReaction({
        variables: { reactionBody, postId },
      });

      // clear form value
      setBody("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  
  };



  return (
    <div>
      <h2 className="donate">Donate to this post?</h2>
          <Link to="/checkout"> 
            <button className="donate-btn btn col-12 col-md-2">$10</button>
           </Link>
           <Link to="/checkout2"> 
            <button className="donate-btn btn col-12 col-md-2">$25</button>
           </Link>  
           <Link to="/checkout3"> 
            <button className="donate-btn btn col-12 col-md-2">$50</button>
           </Link>  
           <Link to="/checkout4"> 
            <button className="donate-btn btn col-12 col-md-2">$100</button>
           </Link>    
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Share your thoughts"
          value={reactionBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
      <p
        className={`m-0 characterCount ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        {characterCount}/280 characters
        {error && <span className="ml-2"></span>}
      </p>
    </div>
  );
};

export default ReactionForm;
