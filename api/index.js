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
  
});

app.post('/todos/new', async (req, res) => { 
  const todo = new Todo({
      text: req.body.text
  });
  todo.save();
  res.json(todo);
});

app.delete('/todos/delete/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    const result = await Todo.findByIdAndDelete(todoId);
    res.json(result);
  } catch (error) {
    res.status(500).send('Error deleting todo');
  }
});

app.put('/todos/complete/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findById(todoId);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
    
  } catch (error) {
    res.status(500).send('Error completing todo');
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});



