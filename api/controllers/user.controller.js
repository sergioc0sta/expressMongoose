require('../models/user.model')
const mongoose = require('mongoose')
const TaskUser = mongoose.model('user')

//POST
const newUser = (req, res) => {
    const createUser = new TaskUser(req.body)
    createUser.save((err, task)=>{
        if(err)
            res.send({success: false})
        res.send(task)
        
    })
}

const getAllUsers = (req, res) =>{
    TaskUser.find((err, task)=>{
        if(err)
            res.send({success: false})
        res.send(task)
    })
}

//findUSer
const findOneUser = (req, res) => {
    const idUser = req.params.id
    TaskUser.findOne({_id: idUser}, (err, task)=>{
        if(err)
            res.send({success: false})
        res.send(task)
    })
}


//PUT
const updateUser = (req, res) => {
    const idUser = req.params.id
    req.body.update_at = new Date()
    TaskUser.findOneAndUpdate({_id: idUser}, req.body, {new: true},  (err, task)=>{
        if(err)
            res.send({success: false})
        res.json(task)
                
    })
}


//DELETE
const deleteUser = (req, res) => {
    TaskUser.remove({_id: req.params.id}, (err, task)=>{
        if(err)
            res.send({success: false})
        res.send({success: true})
    })
}

exports.userController = {
	getAllUsers,
	findOneUser,
    newUser,
    deleteUser,
    updateUser
};