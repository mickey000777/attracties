const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//importeren van de routers
const attracties = require("./routes/attracties");
const verantwoordelijken = require("./routes/verantwoordelijken");

//Verbinding maken met de Mongodb databank
mongoose.connect("mongodb://127.0.0.1:27017/attractiesdb", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("Verbonden met Mongodb");
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })

const app = express();

const port = process.env.PORT || 5000;

//middleware registreren
app.use(cors());
app.use(express.json());

//router registreren
app.use("/attracties", attracties);
app.use("/verantwoordelijken", verantwoordelijken);

app.get("/", (req, res) => {
    res.send("Gebruik de API routes.");
});

app.listen(port, () => {
    console.log(`server luistert op poort ${port}`);
});