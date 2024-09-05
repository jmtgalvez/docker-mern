require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const connectDB = require("./utils/db");

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      `${process.env.APP_URL}`,
      "http://localhost:5173",
      "http://localhost:4173",
    ],
    allowedHeaders: ["Content-Type"],
  })
);

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
