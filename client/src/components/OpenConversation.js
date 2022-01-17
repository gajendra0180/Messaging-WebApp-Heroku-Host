import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button, Nav } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import "./OpenConversation.css";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
      node.focus();
    }
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  }

  // ededed
  return (
    <div className="chat_area">
      <div className="d-flex flex-column flex-grow-1 ">
        <div className="chat_Panel_Nav text-capitalize">
          <img
            height="30px"
            width="30px"
            style={{ borderRadius: "20px", marginRight: "2vw" }}
            src="https://media.istockphoto.com/vectors/user-vector-icon-on-transparent-background-user-icon-vector-id1013501908"
            alt=""
          />
          {selectedConversation.recipients.map((e) => e.name).join(",")}
        </div>
        <div className="flex-grow-1 overflow-auto my-2">
          <div className="d-flex px-4 flex-column align-items-start justify-content-end px-3">
            {selectedConversation.messages.map((message, index) => {
              const lastMessage =
                selectedConversation.messages.length - 1 === index;
              return (
                <div
                  key={index}
                  ref={lastMessage ? setRef : null}
                  className={`my-1 d-flex flex-column ${
                    message.fromMe
                      ? "align-self-end align-items-end"
                      : "align-items-start"
                  }`}
                  style={{ maxWidth: "60vw", wordBreak: "break-word" }}
                >
                  <div
                    className="rounded px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${
                        message.fromMe ? "#dcf8c6" : "white"
                      }`,
                    }}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-white text-capitalize small ${
                      message.fromMe ? "text-right" : ""
                    }`}
                  >
                    {message.fromMe ? "You" : message.senderName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="p-2" style={{ backgroundColor: "#ddd8d8" }}>
            <InputGroup>
              <Form.Control
                // as="text"
                placeholder="Type a message"
                required
                value={text}
                autofocus="autofocus"
                onChange={(e) => setText(e.target.value)}
                style={{
                  height: "40px",
                  resize: "none",
                  borderRadius: "20px",
                  border: "1px solid #fff",
                }}
              />
              <Button
                className="mx-2 rounded-top"
                variant="danger"
                type="submit"
              >
                Send
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
