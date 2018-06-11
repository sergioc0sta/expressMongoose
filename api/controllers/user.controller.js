require('../models/user.model')
const mongoose = require('mongoose')
const env = require('../.env')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const TaskUser = mongoose.model('user')




const protectRoutes = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers['authorization']
    //const token = req.body.token || ''
    if(token)
    {
        jwt.verify(token,env.secret, (err, decoded)=>{
            if(err)
            {
                res.json({ success: false, message: 'Falha na autenticacao do token.' })
            }
            else
            {
                //req.decoded = decoded
                next()
            }
        })
    }
    else
    {
        return res.status(403).send({ success: false, message: 'Sem token.' 
        })  
    }
}

const checkToken = (req, res)=>{
    const token = req.body.token || req.query.token || req.headers['authorization']
    //const token = req.body.token || ''
    if(token)
    {
        jwt.verify(token,env.secret, (err, decoded)=>{
            if(err)
            {
                res.json({ success: false})
            }
            else
            {
                res.json({ success: true})
            }
        })
    }
    else
    {
        res.json({ success: false})
    }
}



const authenticateUser = (req, res) => {
    const password = req.body.password || ''
    TaskUser.findOne({email: req.body.email}, (err, user)=>{
        if(err)
        {
            res.status(400).send({errors: ['Erro interno']}) 
        }
        if(!user)
        {
            res.json({ success: false, message: 'Falha na autenticação. Utilizador não encontrado.' }) 
        } else if (user)
        {
            if(!bcrypt.compareSync(password, user.password))
            {
                res.json({sucess: false, message: 'Falha na autenticação. Password errada'})
            }
            else
            {   
                const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
                const payload = {email: user.email, firstName: user.firstName, ip:ip}
                const token = jwt.sign(payload, env.secret, {
                    expiresIn: 1440 
                  })
                  res.json({
                    success: true,
                    message: 'Curte o token!',
                    token: token
                  })
            }
        }
    })
}


//POST
const newUser = (req, res) => {
    const salt  = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(req.body.password, salt)
    
    const createUser = new TaskUser(
        {
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            email: req.body.email,
            password: passwordHash
        }
    )
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
    TaskUser.findOne({_id: req.params.id}, (err, task)=>{
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
    TaskUser.remove({_id: req.body.id}, (err, task)=>{
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
    updateUser,
    authenticateUser,
    protectRoutes,
    checkToken
};