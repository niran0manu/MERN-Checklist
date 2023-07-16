const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({ 
   text: {
     type: String,
     required: true,
     trim: true,
   },
   completed: {
     type: Boolean,
     default: false,
   },
   createdAt: {
     type: Date,
     default: Date.now
   } 
});

module.exports = mongoose.model('Todo', todoSchema);



// text: {
//   type: String,
//   required: true,
//   trim: true,
// },
// weight: {
//  type: Number,
//  required: false,
// },
// sets: {
//  type: Number,
//  required: false,
// },
// reps: {
//  type: Number,
//  required: f,
// },
// completed: {
//   type: Boolean,
//   default: false,
// },
// createdAt: {
//   type: Date,
//   default: Date.now
// } 