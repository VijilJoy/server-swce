const express = require("express");
const cors = require("cors");
const app = express();

const { dbConnect } = require("./dbConfigs/dbConnect");
const login = require("./routes/login");
const signup = require("./routes/signup").router;
const users = require("./routes/users");
const projects = require("./routes/projects");
const search = require("./routes/search");
app.use(express.json());
app.use(cors({ origin: "http://localhost:5000", credentials: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.use(login);
// app.use(signup);
// app.use(users);
// app.use(projects);
// app.use(search);

app.listen(process.env.PORT || 3000, () => {
  dbConnect();
  console.log("Connected to db");
  console.log("Server running..");
});
