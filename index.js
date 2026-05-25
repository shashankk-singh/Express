const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

let users = [
  { "id": 1, "name": "Shashank", "role": "admin" },
  { "id": 2, "name": "Ravi", "role": "user" }
];

// Define routes
app.get('/', (req, res) => {
  res.status(200).json({ "message": "Welcome to my API", "status": "running" });
});

app.get('/about', (req, res) => {
  res.status(200).json({ "name": "Shashank's API", "version": "1.0", "author": "Shashank" });
}); 


app.get('/users', (req , res) => {
  res.status(200).json(users);
});

// Create a new user
app.post('/users', (req, res) => {
  let newuser = req.body;
  users.push(newuser);
  res.status(201).json({ "message": "User created successfully", "user": newuser });
});

//delete a user
app.delete('/users/:id', (req, res) => {
  let id = Number(req.params.id);
  users = users.filter((item) => item.id !== id);
  res.status(200).json({ "message": "User deleted successfully", "details": users });
});

// update user
app.put("/users/:id" , (req ,res) => {
  let body = req.body;
  let id = Number(req.params.id);
  users = users.map((item) => {
    if (id == item.id){
      return {...item , ...body}
    }
    return item
  });
  
  res.status(200).json({ "message": "User updated successfully", "details": users });  
});


// Start the server
app.listen(port , () => {
  console.log(`Example app listening on port ${port}`);
});
