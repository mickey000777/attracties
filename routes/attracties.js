const express = require("express");
const attracties = require("../attractielijst");

const router = express.Router();
//alla attracties tonen
router.get("/", (req, res) => {
    return res.send(attracties);
});
//een enkele attractie tonen
router.get("/:id", (req, res) => {
    const gevondenAttractie = attracties.find(attractie => {
        return attractie.id === +req.params.id;
    });

    if (!gevondenAttractie){
        return res.status(404).send(`Attractie met id ${req.params.id} niet gevonden`);
    }

    return res.send(gevondenAttractie);
});
//een attractie toevoegen
router.post("/", (req, res) => {
    //json data zit in req.body object
    const data = req.body;
    //zoeken naar het hoogste id
    const laatsteId = attracties[attracties.length - 1].id;
    //1 optellen om een uniek id te houden
    data.id = laatsteId + 1;
    //voeg nieuwe attractie toe aan de lijst
    attracties.push(data);
    //de nieuwe attractie terugsturen naar de aanvrager
    return res.send(data);
});

router.delete("/:id", (req, res) => {
    const gevondenAttractieIndex = attracties.findIndex(attractie => {
        return attractie.id === +req.params.id;
    });
    if(gevondenAttractieIndex === -1) {
        return res.status(404).send(`Attractie met id ${req.params.id} niet gevonden.`);
    }
    attracties.splice(gevondenAttractieIndex, 1);
    return res.send(`Attractie met id ${req.params.id} is verwijderd`);
});

router.put("/:id", (req, res) => {
    const data = req.body;
    const gevondenAttractie = attracties.find(attractie => {
        return attractie.id === +req.params.id;
    });
    if (!gevondenAttractie) {
        return res.status(404).send(`Attractie met id ${req.params.id} niet gevonden`);
    }
    //met indexOf() de gevonden attractie zoeken in de array
    const attractieIndex = attracties.indexOf(gevondenAttractie);

    //het bestaande object in de array vervangen met het nieuwe object
    //het nieuwe object bevat de eigenschappen van het bestaande samengevoegd
    // met de eigenschappen van het doorgestuurde object
    attracties.splice(attractieIndex, 1, { ...gevondenAttractie, ...data});
    return res.send(attracties[attractieIndex]);
});

module.exports = router;

