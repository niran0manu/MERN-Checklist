const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// models 
const Todo = require('./models/todo');

// middleware to parse JSON bodies in POST requests
app.use(express.json());
app.use(cors());

async function main() {
  try {
      await mongoose.connect("mongodb://127.0.0.1:27017/mern-todo",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log("mongoose connected");
  } catch (err) {
      console.log("mongoose connection failed",err
          );
  }
}

main().catch(err => console.log(err));


// Sample endpoint to test if the server is running
app.get('/todos',  async (req, res) => {
  const todos = await Todo.find();
  res.json(todos) 
  // https://youtu.be/R81g-2r6ynM?t=764
});

app.get('/todos/new', async (req, res) => { });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});



