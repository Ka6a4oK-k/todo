const express = require('express')
const router = express.Router()
const Todos = require('../models/todos')

router.get('/getTodos', async (req, res) => {
    try {
        const todos = await Todos.find()
        res.json(todos)
    } catch (error) {
        console.error(error.message)
    }
})

router.post('/addTodo', async (req, res) => {
    const todo = req.body
    todo.isCompleted = false
    const newTodo = new Todos(todo)
    try {
        await newTodo.save()
    } catch (error) {
        console.error(error)
    }
    res.json(newTodo)
})

router.delete('/deleteTodo/:id', async (req, res) => {
    try {
        const todo = await Todos.findById(req.params.id)
        await todo.remove()
        res.json(`task with id:${req.params.id} was removed`)
    } catch (error) {
        res.json(error.message)
    }
})

router.put('/toggleTodo/:id', async (req, res) => {
    try {
        const todo = await Todos.findById(req.params.id)
        await todo.updateOne({ $set: { isCompleted: !todo.isCompleted } })
        res.json(`task with id:${req.params.id} was toggled to ${!todo.isCompleted}`)
    } catch (error) {
        res.json(error.message)
    }
})

router.put('/editTodo/:id', async (req, res) => {
    try {
        const todo = await Todos.findById(req.params.id)
        await todo.updateOne({ $set: { task: req.body.task } })
        res.json(`task with id:${req.params.id} was changed to ${req.body.task}`)
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router