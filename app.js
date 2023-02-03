const express = require("express");
const app = express();
const firebase = require("firebase");
const bodyParser = require("body-parser");

// Initialize Firebase
const config = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "your-database-url",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id"
};
firebase.initializeApp(config);

// Use body-parser middleware
app.use(bodyParser.json());

// Get all data from Firebase
app.get("/api/data", (req, res) => {
  firebase
    .database()
    .ref("/data")
    .once("value")
    .then(snapshot => {
      res.json(snapshot.val());
    });
});

// Get data by id from Firebase
app.get("/api/data/:id", (req, res) => {
  firebase
    .database()
    .ref(`/data/${req.params.id}`)
    .once("value")
    .then(snapshot => {
      res.json(snapshot.val());
    });
});

// Add data to Firebase
app.post("/api/data", (req, res) => {
  firebase
    .database()
    .ref("/data")
    .push(req.body)
    .then(() => {
      res.json({ message: "Data added successfully." });
    });
});

// Update data in Firebase
app.put("/api/data/:id", (req, res) => {
  firebase
    .database()
    .ref(`/data/${req.params.id}`)
    .update(req.body)
    .then(() => {
      res.json({ message: "Data updated successfully." });
    });
});

// Delete data from Firebase
app.delete("/api/data/:id", (req, res) => {
  firebase
    .database()
    .ref(`/data/${req.params.id}`)
    .remove()
    .then(() => {
      res.json({ message: "Data deleted successfully." });
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
