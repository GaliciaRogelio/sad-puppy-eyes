import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SinglePost from "./pages/SinglePost";
import SinglePayment from "./pages/SinglePayment";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
//import AddCard from "./pages/AddCard";
import PaymentDetails from "./pages/PaymentDetails";
import Checkout from "./pages/PaymentCheckout";
import Checkout2 from "./pages/PaymentCheckout2";
import Checkout3 from "./pages/PaymentCheckout3";
import Checkout4 from "./pages/PaymentCheckout4";


import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/checkout2" component={Checkout2} />
              <Route exact path="/checkout3" component={Checkout3} />
              <Route exact path="/checkout4" component={Checkout4} />
              {/* <Route exact path="/card" component={AddCard} /> */}
              {/* <Route exact path="/card" component={PaymentDetails} /> */}
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SinglePost
            } />
              <Route exact path="/payment/:id" component={SinglePayment} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
