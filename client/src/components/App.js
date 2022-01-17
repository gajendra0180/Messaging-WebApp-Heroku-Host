import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          component={props=> id ? dashboard : <Login onIdSubmit={setId} {...props} />}
        />
      </Switch>
    </Router>
  );
}
export default App;
