import React from "react";

const hicon = {
    borderRadius: "50%",
    height: "30vh",
};

export default function OpenConversationEmpty() {
    return (
        <div
            className=" bg-white mx-5 my-5 rounded flex flex-wrap font-monospace text-capitalize"
            style={{
                boxShadow: "10px 25px 0px rgba(255, 255, 255, 0.146)",
                border: "2px solid black",
                width: "90vw",
                padding: "5vw",
                border: "2px solid white ",
                backgroundImage:"url(https://i.ibb.co/4N8ZmHY/undraw-Programming-re-kg9v.png)",
                backgroundRepeat:"no-repeat",
                backgroundSize:"cover"
            }}
        >
            <h1 className="text-danger" style={{fontWeight:"bolder"}}>Chat-WebApp</h1>
        </div>
    );
}
