import React from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <div className="d-flex flex-wrap  text-capitalize">
      <div style={{ display: "flex", justfiyContent: "center", flexWrap: "wrap",marginLeft:"8vw",marginBottom:"2vw" }}>
        <img height="100px" src="https://png.pngtree.com/png-clipart/20191121/original/pngtree-message-icon-for-your-project-png-image_5159719.jpg" alt="" />
      </div>
      <ListGroup
        variant="flush"
        className="text-capitalize d-flex flex-wrap flex-column"
        style={{ width: "100vw" }}
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