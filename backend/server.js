const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const trainRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');
let Train = require('./training.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

///////////////////////////
///////////////////////////
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.Name = req.body.Name;
            todo.Lastname = req.body.Lastname;
            todo.Adress = req.body.Adress;
            todo.Skills = req.body.Skills;
            todo.level = req.body.level;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/delete/:id').delete(function(req, res) {
    Todo.findByIdAndDelete(req.params.id)
        .then(()=> res.json("delete ok"))
        .catch(err => res.status(400).json('error'+ err))
});

///////////////////////////
///////////////////////////
trainRoutes.route('/').get(function(req, res) {
    Train.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

trainRoutes.route('/add').post(function(req, res) {
    let todo = new Train(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

trainRoutes.route('/delete/:id').delete(function(req, res) {
    Train.findByIdAndDelete(req.params.id)
        .then(()=> res.json("delete ok"))
        .catch(err => res.status(400).json('error'+ err))
});


app.use('/todos', todoRoutes);
app.use('/train', trainRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});