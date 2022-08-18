
const db = require('../db')
const { User,Rol } = db
const {tokenValidations} = require('../middlewares');

const { Router } = require('express')

const userRoute = Router()

userRoute.get('/', async (req, res) => {
    const users = await User.findAll()
    if (users) return res.json(users)
    return res.json(new Error('error'))
})

userRoute.post('/',tokenValidations.checkToken, async (req, res) => {
    const { password, username, email } = req.body;
    const newUser = await User.findOrCreate({ where: { password, username, email }, include:Rol},);
    if (newUser[1]) {
         newUser[0].setRol('user');
        newUser[0].setStatus('active');
        res.json(newUser);
    } else {
        res.status(400).json('user alredy exists');
    }
})

userRoute.delete('/', async (req, res) => {
    const id = req.query.id
    if (!id) return res.send('error')
    const userDeleted = await User.findOne({ where: { id } })
    if (userDeleted) {
        User.destroy({ where: { id } })
        res.json('user removed')
    } else {
        return res.status(400).send('user does not exist');
    }
})

userRoute.patch('/', (req, res) => {
    
});

module.exports = userRoute
