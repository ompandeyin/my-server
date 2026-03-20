const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session setup
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Serve static files (public folder)
app.use(express.static("public"));

// 🔐 Admin Login Page
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 🔑 Handle Login
app.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === "1234") {
    req.session.isAuth = true;
    res.redirect("/dashboard");
  } else {
    res.send("Wrong Password ❌");
  }
});

// 📊 Protected Dashboard
app.get("/dashboard", (req, res) => {
  if (req.session.isAuth) {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
  } else {
    res.redirect("/admin");
  }
});

// 🚪 Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin");
  });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});