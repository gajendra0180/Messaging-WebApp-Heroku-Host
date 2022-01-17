import React from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <div className="d-flex flex-wrap text-capitalize">
      <div
        className="bg-transparent d-flex flex-wrap  p-2 mx-2 rounded"
        style={{
          wordBreak: "break-word",
          marginBottom: "2vh",
          width: "22vw",
          color: "white",
        }}
      >
        [ Here goes all your contacts. To start <br />
        Conversation with any member please <br />
        move to conversations Panel and select any <br />
        contact to start conversation. ]
      </div>
      <ListGroup
        variant="flush"
        className="text-capitalize d-flex flex-wrap flex-column"
        style={{ width: "100vw",overflow:"scroll" }}
      >
        {contacts.map((contact, index) => (
          <ListGroup.Item key={contact.id}>
            <img
              height="30px"
              width="30px"
              style={{ borderRadius: "20px", marginRight: "1vw" }}
              src="https://media.istockphoto.com/vectors/user-vector-icon-on-transparent-background-user-icon-vector-id1013501908"
              alt=""
            />
            {contact.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
