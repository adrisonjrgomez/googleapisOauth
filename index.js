require("dotenv/config").config;

const express = require("express");
const morgan = require("morgan");

const port = 4000;
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/", require("./src/routes/main.route"));
app.use("/auth", require("./src/routes/google.auth.route"));

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
