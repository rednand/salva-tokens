require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const movieRoutes = require("../routes/MovieRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(express.static("views"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(movieRoutes);
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT;
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@tokens.kncyibo.mongodb.net/tokens`;

mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na em http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
