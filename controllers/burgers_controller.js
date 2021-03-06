const express = require("express");

const router = express.Router();

// Load the model (burger.js) to use its database functions
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
// READ
router.get("/", (req, res) => {
    burger.selectAll((data) => {
        const viewData = {
            burgers: data
        };
        console.log("GET from burgers_controller.js:", viewData);
        res.render("index", viewData);
    });
});

// CREATE
router.post("/api/burgers", (req, res) => {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], (result) => {
        res.json({ id: result.insertId });
    });
});

// UPDATE
router.put("/api/burgers/:id", (req, res) => {
    const condition = `id = ${req.params.id}`;
    console.log("PUT from burgers_controller.js: condition:", condition)
    burger.updateOne({ devoured: req.body.devoured }, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

// DELETE
router.delete("/api/burgers/:id", (req, res) => {
    const condition = `id = ${req.params.id}`;
    console.log("DELETE from burgers_controller.js: condition:", condition);
    burger.deleteOne(condition, (result) => {
        if (result.affectedRow == 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

// Export routes for server.js to use.
module.exports = router;