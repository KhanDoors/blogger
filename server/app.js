const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Connection Error: ", err));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//import routes
const blogPost = require("./routes/BlogPost");

// apply route middleware
app.use("/blogpost", blogPost);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
