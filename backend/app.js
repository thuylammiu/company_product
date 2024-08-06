const express = require("express");
const { COLLECTIONS, getDB, saveData, createToken, auth } = require("./utils");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(cors());

app.post("/signup", (req, res) => {
  const user = req.body;
  const db = getDB(COLLECTIONS.USERS);
  let found = db.find(x => x.email === user.email);
  if (found) {
    res.send({ success: false, error: "This email was already used" });
    return;
  }
  user.password = bcrypt.hashSync(user.password, 10);
  user.id = uuidv4();
  db.push(user);
  saveData(COLLECTIONS.USERS);
  res.send({ success: true });
});

app.post("/login", (req, res) => {
  const user = req.body;
  const db = getDB(COLLECTIONS.USERS);
  let found = db.find(x => x.email === user.email);
  if (!found) {
    res.send({ success: false, error: "Wrong email" });
    return;
  }
  if (!bcrypt.compareSync(user.password, found.password)) {
    res.send({ success: false, error: "Wrong password" });
    return;
  }
  const token = createToken(found);
  res.send({ success: true, data: token });
});

app.use(auth);

app.get("/products", (req, res) => {
  let db = getDB(COLLECTIONS.PRODUCTS);
  res.send({ success: true, data: db });
});
app.get("/products/:id", (req, res) => {
  let db = getDB(COLLECTIONS.PRODUCTS);
  let found = db.find(x => x.id === req.params.id);
  if (!found) {
    res.send({ success: false, error: "Cannot find the data" });
    return;
  }
  res.send({ success: true, data: found });
});
app.post("/products", (req, res) => {
  try {
    let data = req.body;
    let coll = COLLECTIONS.PRODUCTS;
    const db = getDB(coll);
    data.id = uuidv4();
    db.push(data);
    saveData(coll);
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false, error: "Server Error" });
  }
});

app.put("/products/:id", (req, res) => {
  try {
    let data = req.body;
    let coll = COLLECTIONS.PRODUCTS;
    const db = getDB(coll);
    for (let i = 0; i < db.length; i++) {
      if (db[i].id === req.params.id) {
        let updated = { ...db[i], ...data };
        db[i] = updated;
        saveData(coll);
        res.send({ success: true });
        return;
      }
    }
    res.send({ success: false, error: "Cannot find the data" });
  } catch (error) {
    res.send({ success: false, error: "Server Error" });
  }
});

app.delete("/products/:id", (req, res) => {
  try {
    let coll = COLLECTIONS.PRODUCTS;
    const db = getDB(coll);
    let index = db.findIndex(x => x.id === req.params.id);
    if (index === -1) {
      res.send({ success: false, error: "Cannot find the data" });
      return;
    }
    db.splice(index, 1);
    saveData(coll);
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false, error: "Server Error" });
  }
});

app.use((req, res, next) => {
  res.send("API is not supported");
});

let PORT = 5001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
