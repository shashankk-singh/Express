require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose')
app.use(express.json());

const User = require('./user');

// Define routes
app.get('/', (req, res) => {
  res.status(200).json({ "message": "Welcome to my API", "status": "running" });
});

app.get('/about', (req, res) => {
  res.status(200).json({ "name": "Shashank's API", "version": "1.0", "author": "Shashank" });
}); 


app.get('/users', async(req , res) => {
  const users = await User.find();
  res.status(200).json({users});
});

// Create a new user
app.post('/users', async (req, res) => {
  const newuser = new User(req.body);
  await newuser.save();
  res.status(200).json({ "message": "User created successfully", "user": newuser });
});

//delete a user
app.delete('/users/:id', async(req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ "message": "User deleted successfully", "details": deletedUser });
});

// update user
app.put("/users/:id" , async (req ,res) => {
  const body = req.body;
  const id = req.params.id;
  const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
  res.status(200).json({ "message": "User updated successfully", "details": updatedUser });  
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Connection failed', err))


// Start the server
app.listen(port , () => {
  console.log(`Example app listening on port ${port}`);
});
