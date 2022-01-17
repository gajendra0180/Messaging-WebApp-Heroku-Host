import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import "./Login.css";

const PREFIX = "chatapp-clone-";
export default function Login({ onIdSubmit }) {
  const [showLoginInputField, setShowLoginInputField] = useState(false);
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (showLoginInputField == false) setShowLoginInputField(true);

    console.log(idRef.current.value);
    if (!idRef.current.value) return;

    // receiving data  from  backend
    const GetData = async (e) => {
       const res = await fetch("https://mern-chat-web-app0180.herokuapp.com/sendDataToFrontEnd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: JSON.stringify(idRef.current.value) }),
      })
        .then((res) => res.text())
        .then((text) => {
          console.log(JSON.parse(text));
          if (JSON.parse(text) == "No Such user") {
            alert(
              `We are not able to find an account with the id \"${idRef.current.value}\" `
            );
            idRef.current.value = "";
            console.log("No such user");
          } else {
            localStorage.setItem(
              PREFIX + "contacts",
              JSON.stringify(JSON.parse(JSON.parse(JSON.parse(text).contacts)))
            );
            localStorage.setItem(
              PREFIX + "conversations",
              JSON.stringify(
                JSON.parse(JSON.parse(JSON.parse(text).conversations))
              )
            );
            localStorage.setItem(
              PREFIX + "id",
              JSON.stringify(JSON.parse(JSON.parse(text).id))
            );
            onIdSubmit(idRef.current.value);
            console.log("Data recieved", JSON.parse(JSON.parse(text).id));
            console.log("Data recieved", JSON.parse(JSON.parse(text).contacts));
            console.log(
              "Data recieved",
              JSON.parse(JSON.parse(text).conversations)
            );
          }
        })
        .catch((e) => console.log(e));
    };
    GetData();
  }
  function createNewId() {
    onIdSubmit(uuidV4());
  }
  return (
    <div className="full">
      <Container className="container">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>

        <div className="form">
          <div className="heading">
            <h1>Enter Your Id to Login or Generate a New one</h1>
          </div>
          <Form
            className="d-flex flex-column flex-wrap"
            onSubmit={handleSubmit}
          >
            <Form.Group
              className={`${
                showLoginInputField ? "d-flex" : "d-none"
              } flex-column flex-wrap mb-5`}
              style={{ justifyContent: "center" }}
            >
              <Form.Label className="text-white">Enter Your Id</Form.Label>
              <Form.Control
                className="inp"
                type="text"
                ref={idRef}
              ></Form.Control>
            </Form.Group>
            <Button
              className="btn"
              style={{ minWidth: "50vw" }}
              variant="outline-success"
              type="submit"
            >
              Login
            </Button>
            <Button
              onClick={createNewId}
              style={{ minWidth: "50vw" }}
              variant="outline-secondary"
            >
              Create a new Id
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}
