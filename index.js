const express = require("express");
const Users = require ("./Users");
const app = express();


const PORT = 3000;

app.get("/showAllUser", (req, res) => {
    res.status(200).json(Users)
})

app.get("/showUser/:userId", (req, res) => {
    const id = parseInt(req.params.userId);
    const user = Users.filter (member => member.id === id);
    (user.length !== 0) ? res.status(200).json(user) : res.status(404).json("this id is not valid")
})

app.listen(PORT, () => {
    console.log("server is running on port 3000 " )
})