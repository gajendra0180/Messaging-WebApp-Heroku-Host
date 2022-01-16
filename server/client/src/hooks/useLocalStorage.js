import React, { useEffect, useState } from "react";

const PREFIX = "chatapp-clone-";
export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  // sending to backend
  const PostData = async (e) => {
    const id = localStorage.getItem(PREFIX + "id");
    const contacts = localStorage.getItem(PREFIX + "contacts");
    const conversations = localStorage.getItem(PREFIX + "conversations");

    const res = await fetch("https://mern-chat-web-app0180.herokuapp.com/saveLocalStorageToDatabase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, contacts, conversations }),
    })
      .then((res) => res.text())
      .then((text) => console.log(JSON.parse(text)))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (value) localStorage.setItem(prefixedKey, JSON.stringify(value));
    console.log("Data Sent from client");
    PostData();
  }, [prefixedKey, value]);

  return [value, setValue];
}
