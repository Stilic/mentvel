const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser');
const db = require("quick.db");
const customId = require("custom-id");
const app = express();

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set("view engine", "ejs");
const port = 3000;

app.use(express.static("public"));
app.use(express.static("node_modules/halfmoon"));
app.use("/js", express.static("node_modules/turbolinks/dist"));

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/i", (req, res) => {
    res.render("ideas", { title: "Ideas", ideas: db.all() });
});

app.get("/i/add", (req, res) => {
    res.render("i/add", { title: "Add an idea" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

// Internal API

app.post("/api/add", (req, res) => {
    db.set(customId({}), {
        idea: req.body.idea,
        description: req.body.description,
        author: req.body.author,
    });
    res.redirect(301, "/i");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
