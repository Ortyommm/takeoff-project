const jsonServer = require("json-server");
const mockDataServer = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

function getDb() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "db.json")).toString()
  );
}

const app = express();
app.use(express.json());
app.use(cors());

mockDataServer.use(middlewares);
app.post("/auth", (req, res) => {
  const { contacts } = getDb();
  const { email, password } = req.body;
  const contact = contacts.find((c) => c.email === email.trim());
  if (!contact) {
    res.status(400).json({
      status: "fail",
      message: "User with this email does not exist!",
    });
    return;
  }
  if (contact.password !== password) {
    res.status(400).json({
      status: "fail",
      message: "Incorrect password!",
    });
    return;
  }
  res.json({ status: "success", contact });
});

app.get("/contacts/search", (req, res) => {
  if (req.query.q === "")
    return res
      .status(200)
      .json({ status: "success", contacts: getDb().contacts });

  if (!req.query.q)
    return res.status(400).json({
      status: "fail",
      message: "Query is empty!",
    });

  const searchedElements = getDb().contacts.filter((el) => {
    return el.name.toLowerCase().includes(req.query.q.toLowerCase());
  });
  res.status(200).json({ status: "success", contacts: searchedElements });
});

mockDataServer.use(router);

app.use(mockDataServer);
app.listen(3001, () => {
  console.log("STARTED");
});
