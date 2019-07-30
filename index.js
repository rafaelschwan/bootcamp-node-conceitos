const express = require("express");

const server = express();

server.use(express.json()); // para aceitar json

// CRUD

const users = ["Rafa", "Sergio", "Gabriel"];

// Middleware sempre tem (req, res, next)
// Middleware GLOBAL
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

// Middlewares LOCAIS
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }
  req.user = user; // troca o valor para ficar disponivel no req
  return next();
}

// Lista todos usuarios
server.get("/users", (req, res) => {
  return res.json(users);
});

// Consulta usuario
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

// Cria usuario
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

// Altera usuario
server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users);
});

// Deleta usuario
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json();
});

server.listen(3000);
