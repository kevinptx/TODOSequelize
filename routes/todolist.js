const express = require("express")
const router = express.Router()
const models = require("../models")
models.todos.findOne().then(function(todo){
})

router.get("/", function(req, res){
  models.todos.findAll({limit: 30, order: [['updatedAt', 'DESC']] }).then(function(todos){
    res.render('index', {
      todos: todos,
    })
  })
})

router.post("/", function(req,res){
  const todo = models.todos.build({
    task: req.body.todo,
  })
  todo.save().then(function(newTodo){
    console.log(newTodo.id)
    res.redirect('/');
  })
})


router.post("/completed", function(req, res){
  models.todos.destroy({
    where: {
      id: req.body.button
    }
  }).then(function(){
    res.redirect('/');
  })
})

router.post("/edit", function(req, res){
  models.todos.update({
    task: req.body.edit,
  }, {
    where: {
      id: req.body.editButton
    }
  }).then(function(){
    res.redirect('/')
  })
})

router.post("/deleteAll", function(req, res){
  models.todos.destroy({
    where: {},
    truncated: true
  }).then(function(){
    res.redirect('/');
  })
})

module.exports = router
