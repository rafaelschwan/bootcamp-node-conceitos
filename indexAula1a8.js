const express = require("express");

const server = express();

// query params = ?teste=1
// route params = /users/1
// request body = {"name":"rafa", "endereco":"rua 1"}

const users = ["Rafa", "Sergio", "Gabriel"];

server.get("/users/:index", (req, res) => {
  //const nome = req.query.nome; //query localhost:3000/users?nome=Rafa
  //const { id } = req.params; //route localhost:3000/1
  const { index } = req.params; // request

  return res.json(users[index]);
});

server.listen(3000);
