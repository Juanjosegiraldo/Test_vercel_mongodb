const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

require("./db");
const User = require("./models/User");

app.use(express.json());

app.get("/users", async (req, res) => {
  console.log(" GET /users");
  const users = await User.find();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json(user);
  } catch {
    res.status(400).json({ msg: "ID inválido" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ msg: "No existe" });

    res.json({ msg: "Usuario eliminado" });
  } catch {
    res.status(400).json({ msg: "ID inválido" });
  }
});

app.put("/users/:id", async (req, res) => {
  const { name, age, city } = req.body;

  // 1 Validación MANUAL
  if (!name || !city || age === undefined) {
    return res.status(400).json({
      msg: "PUT requiere TODOS los campos: name, email, age"
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, age, city},
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ msg: "No existe" });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!user) return res.status(404).json({ msg: "No existe" });

    res.json(user);
  } catch {
    res.status(400).json({ msg: "Error" });
  }
});

module.exports = app;


// app.listen(port, () => {
//   console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
// });