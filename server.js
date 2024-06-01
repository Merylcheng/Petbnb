const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("mern:server");

require("dotenv").config();
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(express.static(path.join(__dirname, "dist")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(require("./config/checkToken").checkTokenMiddleware);

// Put API routes here, before the "catch all" route
app.get("/api", (req, res) => {
  res.json({ hello: "world" });
});
app.use("/api/users", require("./routes/api/usersRoutes"));
app.use("/api/sitters", require("./routes/api/sitterRoutes"));

//m what they cannot catch, they throw here.
app.get("/*", function (req, res) {
  res.json({ error: "no page found" });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
