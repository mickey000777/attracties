const express = require("express");

const Verantwoordelijke = require("../models/verantwoordelijke");

const router = express.Router();

router.get("/", async (req, res) => {
    const verantwoordelijken = await Verantwoordelijke.find();
    return res.send(verantwoordelijken);
});

router.post("/", async (req, res) => {
    const data = req.body;

    try {
        const nieuwVerantwoordelijke = new Verantwoordelijke(data);
        const toegevoegdVerantwoordelijke = await Verantwoordelijke.create(nieuwVerantwoordelijke);

        return res.send(toegevoegdVerantwoordelijke);
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;