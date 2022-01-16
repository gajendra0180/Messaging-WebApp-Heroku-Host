const port = process.env.PORT || 5000;
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require('path')
const io = require("socket.io")(http);
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const ChatApp = require("./models/chatApp");

dotenv.config({ path: "./config.env" });
// parse application/json
app.use(bodyParser.json());

const DB = process.env.DATABASE;

// mongoose
//   .connect("mongodb://localhost/whatsapp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connection Successful");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/", async (req, res) => {
//   res.send("Hey");
// });

app.post("/saveLocalStorageToDatabase", async (req, res) => {
  console.log("Hey data received");
  try {
    const res = await ChatApp.findOne({ id: req.body.id }).exec();

    if (res == null) {
      const document = await ChatApp.create({
        id: req.body.id,
        contacts: JSON.stringify(req.body.contacts),
        conversations: JSON.stringify(req.body.conversations),
      });
      console.log("Created Successfully");
      await document.save();
    } else {
      console.log("Already exists,Just Updating");
      const document = await ChatApp.updateOne(
        { id: req.body.id },
        {
          contacts: JSON.stringify(req.body.contacts),
          conversations: JSON.stringify(req.body.conversations),
        }
      );
    }
  } catch (e) {
    console.log("Error");
  }
});

app.post("/sendDataToFrontEnd", async (req, res) => {
  console.log("Hey I reaeched here", req.body.id);
  const ress = await ChatApp.findOne({ id: req.body.id }).exec();
  if (ress == null) res.send(JSON.stringify("No Such user"));
  else res.send(ress);
});

app.use(
  express.static(path.join(__dirname, "/client/build"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/client/build", "index.html")
  );
});

http.listen(process.env.PORT || 5000, () => {
  var host = http.address().address;
  var port = http.address().port;
  console.log("App listening at http://%s:%s", host, port);
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});
