const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const Verantwoordelijke = require("./verantwoordelijke");

const aantalPersonenSchema = new Schema({
    individueel: {
        type: Number,
        required: true
    },
    perkar: {
        type: Number,
        required: true,
        default: 0
    },
    perrij: {
        type: Number,
        required: true,
        default: 0
    },
});

const attractieSchema = new Schema({
    naam: {
        type: String,
        required: true
    },
    minimuumlengte: {
        type: Number,
        required: true
    },
    verantwoordelijke: {
        type: Schema.Types.ObjectId,
        ref: Verantwoordelijke
    },
    categories: {
        // Array van subdocumenten
        // Elk subdocument voldoet aan een nieuw Schema
        type: [{
            type: String,
            lowercase: true,
            enum : ["thrill", "water", "familie", "kinderen"],
        }]
    },
    aantalPersonen: {
        type: aantalPersonenSchema
    },
    indoorOutdoor: {
        type: String,
        required: true,
        default: "outdoor"
    },
    vip: {
        type: Boolean,
        required: true,
        default: false
    }
});

//model
//model maken voor de attractie documenten
//tweede parameter is het bijhorende Schema
//derde parameter is de collectienaam in de databank
const Attractie = model("Attractie", attractieSchema, "attracties");

//exporteren van het model
module.exports = Attractie;

