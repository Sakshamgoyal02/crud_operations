const express = require("express");
const Users = require ("./Users");
const uuid = require("uuid");
const app = express();

app.use(express.json())

const PORT = 3000;

app.get("/showAllUser", (req, res) => {
    res.status(200).json(Users)
})

app.get("/showUser/:userId", (req, res) => {
    const id = parseInt(req.params.userId);
    const user = Users.filter (member => member.id === id);
    (user.length !== 0) ? res.status(200).json(user) : res.status(404).json("this id is not valid")
})

app.post("/addUser", (req, res)=>{

const {name, email} = req.body

console.log(name,email)

Users.push({

    id: uuid.v4(),
    name: name,
    email: email
    
})

 res.status(200).json(Users)
  
})

app.delete ("/deleteUser/:uid", (req, res) =>{
  const id= parseInt(req.params.uid);
  const found = Users.some(user => user.id === id);

  if (found){ 
    const updatedUser = Users.filter(user => user.id !==id)
    res.status(200).json(updatedUser)
  }else { 
    res.status(400).json( "User not found");

  }
})

app.put ("/updateUser/:id", (req, res)=>{
  const userId = parseInt(req.params.id);
  const found = Users.some (user => user.id === userId);

  if (found){
    const updatedUser = req.body;
    Users.forEach(user => { 
         if ( user.id === userId){
          user.name = updatedUser.name;
          user.email = updatedUser.email;
         }
    })
    res.status(200).json(Users);
    
  }else{
    res.status(400).json("user not found!!")
  }
})



app.listen(PORT, () => {
    console.log("server is running on port 3000 " )
})