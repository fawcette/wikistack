const express = require("express");
const app = express();
const morgan = require("morgan");
const main = require("./views/main");
const { db, User, Page } = require("./models");

app.use(morgan("dev"));

app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.send(main());
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

//
const PORT = 3000;

const init = async () => {
  await db.sync({ force: true });
  await User.sync({ force: true });
  await Page.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();

// db.sync({ force: true });
