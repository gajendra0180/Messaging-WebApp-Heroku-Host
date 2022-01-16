import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <div
      className="d-flex p-2"
      style={{ height: "100vh", backgroundColor: "rgb(29, 26, 26)" }}
    >
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}
