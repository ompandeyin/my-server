const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Dummy user (for testing)
const USER = {
  username: "admin",
  password: "1234"
};

// 👉 Default route (IMPORTANT - fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 👉 Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    res.redirect("/dashboard.html");
  } else {
    res.send("Invalid credentials ❌");
  }
});

// 👉 Logout route
app.get("/logout", (req, res) => {
  res.redirect("/");
});

// 👉 Start server (IMPORTANT for EC2)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});