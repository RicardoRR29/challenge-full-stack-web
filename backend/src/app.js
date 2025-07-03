const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/student.routes");
const authRoutes = require("./auth/auth.routes");

const app = express();

// Configura CORS para permitir requisições do frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // se estiver usando cookies ou headers de autenticação
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

module.exports = app;
