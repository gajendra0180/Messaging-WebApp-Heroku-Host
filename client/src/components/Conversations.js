import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <div className="d-flex flex-wrap text-capitalize">
      {/* <div
        className=" bg-transparent p-2 mx-2 rounded"
        style={{
          wordBreak: "break-word",
          marginBottom: "2vh",
          width: "22vw",
          color: "white",
        }}
      >
        [ Click New Conversation to start a new conversation with available
        contacts or tap on any conversation to continue chatting. You can also
        add new contacts from the contacts panel. ]
      </div> */}
      <ListGroup
        variant="flush"
        style={{ width: "100vw", display: "flex", flexWrap: "wrap" }}
      >
        <div
          style={{
            display: "flex",
            justfiyContent: "center",
            flexWrap: "wrap",
            marginLeft: "8vw",
            marginBottom: "2vw",
          }}
        >
          <img
            height="100px"
            src="https://png.pngtree.com/png-clipart/20191121/original/pngtree-message-icon-for-your-project-png-image_5159719.jpg"
            alt=""
          />
        </div>
        {conversations.map((conversation, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => selectConversationIndex(index)}
            active={conversation.selected}
          >
            <div className="d-flex flex-wrap text-capitalize">
              <img
                height="30px"
                width="30px"
                style={{ borderRadius: "20px", marginRight: "1vw" }}
                src="https://media.istockphoto.com/vectors/user-vector-icon-on-transparent-background-user-icon-vector-id1013501908"
                alt=""
              />
              <div style={{ wordBreak: "break-word", width: "22vw" }}>
                {conversation.recipients.map((r) => r.name).join(", ")}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}