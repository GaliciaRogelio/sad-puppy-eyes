import React from "react";
import { Link } from "react-router-dom";
import auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className="jumbotron">
          <div id="header-img">
          </div>
          <Link to="/">
            <h1>Sad Puppy Eyes</h1>
            <p>Where Your Four-legged Loved Ones Find the Help They Need</p>
          </Link>
        </div>

        <nav className="text-center">
          {auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <Link to="/card">Add Card</Link>
              {/* added the link to the page that needs to be created */}
              {/* <link to="/payment/:id">Add card</link> */}
              <a href="/" onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              <Link to="/checkout">Checkout</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;