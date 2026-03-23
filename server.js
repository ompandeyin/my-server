const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 Serve static files (VERY IMPORTANT)
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Dummy user (for testing)
const USER = {
  username: "admin",
  password: "1234"
};

// 🔹 Home route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 🔹 Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    res.redirect("/dashboard.html");
  } else {
    res.status(401).send("Invalid credentials ❌");
  }
});

// 🔹 Logout route
app.get("/logout", (req, res) => {
  res.redirect("/");
});

// 🔹 Handle unknown routes (optional but good)
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// 🔹 Start server (EC2 compatible)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
