const { start } = require("./src/server");

const { db } = require("./src/model/index");
db.sync()
  .then(() => {
    start();
  })
  .catch((e) => {
    console.error("Could not start server", e.message);
  });
