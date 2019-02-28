const express = require("express");
const cors = require("cors");
const attracties = require("./routes/attracties");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use("/attracties", attracties);

app.listen(port, () => {
    console.log(`server luistert op poort ${port}`);
});