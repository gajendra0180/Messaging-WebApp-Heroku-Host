import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";
import "./Sidebar.css";

const CONVERSATIOINS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIOINS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationsOpen = activeKey === CONVERSATIOINS_KEY;

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className="sidebar_background d-flex">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav
          // variant="tabs"
          className="justify-content-center"
          style={{ cursor: "pointer" }}
        >
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIOINS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content
          className="border-right-0 d-flex flex-grow-1"
          style={{ overflowX: "hidden", overflowY: "visible" }}
        >
          <Tab.Pane eventKey={CONVERSATIOINS_KEY}>
            <div style={{ marginTop: "2vh" }}></div>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <div style={{ marginTop: "2vh" }}></div>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-white">{id}</span>
        </div>
        <Button
          className="rounded-top  border-0"
          variant="danger"
          onClick={() => setModalOpen(true)}
        >
          New {conversationsOpen ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
