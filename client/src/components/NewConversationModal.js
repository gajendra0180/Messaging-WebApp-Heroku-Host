import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";


export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactsIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedContactIds);
    if (selectedContactIds.length != 0) {
      createConversation(selectedContactIds);
      closeModal();
    } else
      alert(
        "Please select at least one of the contacts to start chatting with"
      );
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactsIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  return (
    <>
      <Modal.Header closeButton>
        Create Conversation. Also You can select multiple contacts to start a
        group Chat.
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button className="my-2" variant="outline-success" type="submit">Start Chatting</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
