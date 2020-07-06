// import express from 'express'; // ES6 modules
const express = require("express"); // CommonJS module, equivalent to above
const shortid = require("shortid"); // npm i shortid

const server = express();

// teaches express how to read JSON form req.body
server.use(express.json()); //// <<<<<<<<< new line

let users = [
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
      }
];

server.get("/", (req, res) => {
    res.status(200).send("<h1>You accesed my api and it is healthy</h1>");
});

server.get("/users", (req, res) => {
    res.status(200).json(users);
});

server.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let record = users.filter(user=>id===user.id)

    res.status(200).json(record);

});

server.post("/users", (req, res) => {
    const newUser = req.body; // needs express.json() middleware

    newUser.id = shortid.generate();

    users.push(newUser);

    res.status(201).json(newUser);
});

server.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const deleted = users.find(h => h.id === id);

    users = users.filter(h => h.id !== id);

    res.status(200).json(deleted);
});

server.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let found = users.find(h => h.id === id);

    if (found) {
        // found a hub
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        // did not find a hub with that id
        res.status(404).json({ message: "Hub not found" });
    }
});

const PORT = 8001; // we visit http://localhost:8000/ to see the api
server.listen(PORT, () => console.log(`server running on port ${PORT}`));