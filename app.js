const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./db/connect");

const v1Router = require("./routes");

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api/v1", v1Router);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGOURI);
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
