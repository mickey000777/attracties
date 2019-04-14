const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const adresSchema = new Schema({
    straat : {
        type: String,
        required: true
    },
    huisnummer: {
        type: Number,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    woonplaats: {
        type: String,
        required: true
    },
    land: {
        type: String,
        required: true,
        default: "België"
    }
});

const verantwoordelijkeSchema = new Schema({
    voornaam: {
        type: String,
        required: true
    },
    familienaam: {
        type: String,
        required: true
    },
    geboortedatum: {
        type: Date,
        required: true
    },
    adres: {
        type: adresSchema
    }
}, { 
    timestamps: true
});

const Verantwoordelijke = model("Verantwoordelije", verantwoordelijkeSchema, "verantwoordelijken");

module.exports = Verantwoordelijke;