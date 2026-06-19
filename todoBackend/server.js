const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const Task = require("./models/Task");
const User = require("./models/User");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Sync Database
sequelize.sync({ alter: true })
  .then(() => {
    console.log("MySQL Database & tables synced!");
  })
  .catch((err) => {
    console.log("Failed to sync database:", err);
  });

// ROUTE UTAMA
app.get("/", (req, res) => {
  res.send("Server Express + MySQL (Sequelize) running!");
});

// AUTH ROUTES
// Register
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Cek apakah email sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const newUser = await User.create({ email, password });

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: newUser.id,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    // Perbandingan sederhana (tanpa hashing)
    if (user.password !== password) {
      return res.status(401).json({ message: "Password salah" });
    }

    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE task
app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      message: "Task berhasil ditambahkan",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ semua task
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE task
app.put("/tasks/:id", async (req, res) => {
  try {
    const [updatedRows] = await Task.update(req.body, {
      where: { id: req.params.id }
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    const updatedTask = await Task.findByPk(req.params.id);

    res.json({
      message: "Task berhasil diupdate",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedRows = await Task.destroy({
      where: { id: req.params.id }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    res.json({
      message: "Task berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});