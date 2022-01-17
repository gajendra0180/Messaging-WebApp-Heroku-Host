import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";
import OpenConversationEmpty from "./OpenConversationEmpty";
import "./Dashboard.css";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <div className="dashboard" style={{ height: "125vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
      {!selectedConversation && <OpenConversationEmpty />}
    </div>
  );
}