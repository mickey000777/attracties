const express = require("express");

//models importeren
const Attractie = require("../models/attractie");

const router = express.Router();

//alle attracties tonen
router.get("/", async (req, res) => {
    const attracties = await Attractie.find();

    return res.send(attracties);
});

//een attractie toevoegen
router.post("/", async (req, res) => {
    //json data zit in req.body object
    const data = req.body;
   
    try {
        //een nieuwe attractie aanmaken op basis van het model in geheugen
        const nieuweAttractie = new Attractie(data);
        //de attractie opslaan in de databank + de nieuwe attractie terug
        //geven met id
        const toegevoegdeAttractie = await Attractie.create(nieuweAttractie);

        return res.send(toegevoegdeAttractie);
    } catch(err) {
        return res.status(400).send(err);
    }
});
//een attractie verwijderen
router.delete("/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const resultaat = await Attractie.deleteOne({   //verwijdert één document
            _id     //is hetzelfde als _id: _id
        });
    

    if(!resultaat.deletedCount) {

        return res.send(`Attractie met id ${_id} niet gevonden.`);
    }
    
        return res.send(`Attractie met id ${_id} is verwijderd`);

    } catch(err) {
        return res.status(400).send(err);
    }
});
//een attractie wijzigen
router.put("/:id", async (req, res) => {
    const data = req.body;

    try {
        const gewijzigdeAttractie = await Attractie.findByIdAndUpdate(
            req.params.id,
            data, {
                runValidators: true,
                new: true
            });
        
        if(!gewijzigdeAttractie) {
            return res.status(400).send(`Attractie met id ${req.params.id} niet gevonden`)
        }

            return res.send(gewijzigdeAttractie);
        
    } catch(err) {
            return res.status(400).send(err);
    }
});

module.exports = router;

