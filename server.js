const express = require("express");
const app = new express();

const PORT = 80;

app.use(express.static("static"));
app.use(express.static("game"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/game/index.html");
})

app.listen(PORT, "0.0.0.0" , () => {
    console.log(`HTTP server is running on :${PORT}`);
});