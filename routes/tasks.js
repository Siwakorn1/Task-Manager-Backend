const express = require('express')
const Task = require('../models/Task')

const router = express.Router()

router.get('/', async (req,res)=>{
   try {
        const tasks = await Task.find()
        res.json(tasks)
   } catch (err) {
     res.status(500).json({ message: err.message})
   }
})

router.post('/', async (req,res)=>{
    try {
        const newTask = new Task(req.body)

        await newTask.save()
        res.status(201).json(newTask)   
    } catch (err) {
     res.status(500).json({ message: err.message})
   }
})

router.put('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedTask)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        await Task.findByIdAndDelete(id)
        res.status(200).json({ message: 'Task deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})


module.exports = router