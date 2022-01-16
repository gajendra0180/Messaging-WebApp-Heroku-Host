import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button, Nav } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import "./OpenConversation.css";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
      node.focus()
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
      <div className="d-flex flex-column flex-grow-1">
        <div className="d-flex p-2 px-4  text-white" style={{ backgroundColor: "#2a2f32" }}>
          <div className="rounded-circle mx-3 p-3" style={{ backgroundColor: "white" }}></div>
          <div className="my-1">{selectedConversation.recipients.map((e) => (e.name)).join(",")}</div>
        </div>
        <div className="flex-grow-1 overflow-auto">
          <div className="d-flex px-4 flex-column align-items-start justify-content-end px-3">
            {selectedConversation.messages.map((message, index) => {
              const lastMessage =
                selectedConversation.messages.length - 1 === index;
              return (
                <div
                  key={index}
                  ref={lastMessage ? setRef : null}
                  className={`my-1 d-flex flex-column ${message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                    }`}
                >
                  <div
                    className="rounded px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${message.fromMe ? "#dcf8c6" : "white"
                        }`,
                    }}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-muted small ${message.fromMe ? "text-right" : ""
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
          <Form.Group
            className="p-2"
            style={{ backgroundColor: "#ddd8d8" }}
          >
            <InputGroup>
              <Form.Control
                as="textarea"
                placeholder="Type a message"
                required
                value={text}
                autofocus="autofocus"
                onChange={(e) => setText(e.target.value)}
                style={{
                  height: "30px",
                  resize: "none",
                  borderRadius: "20px",
                  border: "1px solid #fff",
                }}
              />
              <Button className="bg-success mx-2 rounded-top" type="submit">Send</Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
