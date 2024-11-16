const express = require("express");
const cors = require("cors");
const app = express();

const { dbConnect } = require("./dbConfigs/dbConnect");
const login = require("./routes/login");
const signup = require("./routes/signup").router;
const logout = require("./routes/logoutuser");
const users = require("./routes/users");
const projects = require("./routes/projects");
const search = require("./routes/search");
const adminverify = require("./routes/adminverify");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(login);
app.use(signup);
app.use(logout);
app.use(users);
app.use(projects);
app.use(search);
app.use(adminverify);
app.listen(process.env.PORT || 3000, () => {
  dbConnect();
  console.log("Connected to db");
  console.log("Server running..");
});
