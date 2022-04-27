const express = require("express");

const app = new express();

const PORT = process.env.PORT || 8080;

app.use(express.static("static"));
app.use(express.static("game"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/auth", (req, res) => {
    res.sendFile(__dirname + "/static/auth.html");
})

app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/game/index.html");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});