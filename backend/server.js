require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./utils/db");

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));

async function main() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT} ...`);
  });
}

main();

app.get("/", (req, res) => {
  res.send("Hello World!🎉");
});
