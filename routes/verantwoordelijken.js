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

router.delete("/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        // Om één document te verwijderen: deleteOne
        // Om meerdere documenten te verwijderen: deleteMany
        const resultaat = await Verantwoordelijke.deleteOne({
            _id     // Zelfde als _id: _id
        });
    
        if (!resultaat.deletedCount) {
            return res.send(`Verantwoordelijke met id ${_id} werd niet gevonden!`);
        }
    
        return res.send(`Verantwoordelijke met id ${_id} succesvol verwijderd!`);
    } catch (err) {
        return res.status(400).send(err);
    }
});

router.put("/:id", async (req, res) => {
    const data = req.body;

    try {
        const gewijzigdVerantwoordelijke = await Verantwoordelijke.findByIdAndUpdate(
            req.params.id,
            data, {
                runValidators: true,    // Voer Schema validatie ook uit
                new: true   // Geef het aangepaste document terug (anders het oude)
            });

        if (!gewijzigdVerantwoordelijke) {
            return res.status(404).send(`Verantwoordelijke met id ${req.params.id} niet gevonden.`);
        }

        return res.send(gewijzigdVerantwoordelijke);
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;