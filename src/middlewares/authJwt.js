const jwt = require('jsonwebtoken')
const User = require('../models/User')


const verifyToken = async (req, res, next) => {
    try {
        // const token = req.headers['x-access-token']
        const token = req.session.token
        // if (!token) return res.status(403).json({ message: 'No token provided' })
        if (!token) return res.status(403).redirect('/')
        
        const decoded = jwt.verify(token, process.env.SECRET)
        req.userId = decoded._id
        // console.log(req.userId);

        const user = await User.get(req.userId)
        // if (!user) return res.status(404).json({ message: 'No user found' })
        if (!user) return res.status(404).redirect('/')
        next()
    } catch (error) {
        console.log(error);
    }
}

const isAdmin = async (req,res,next) => {
    const user = await User.get(req.userId)
    if (user[0].dataValues.typeUser == 1){
        next()
        return 
    }
    // return res.status(403).json({message: 'No es Admin'})
    return res.status(403).redirect('/')
}
const isUser = async (req,res,next) => {
    const user = await User.get(req.userId)
    if (user[0].dataValues.typeUser == 0){
        next()
        return 
    }
    // return res.status(403).json({message: 'No es Admin'})
    return res.status(403).redirect('/')
}
const navigationBar = async (req, res, next) => {
    try{
        const token = req.session.token
        if (!token) return 'partials/navigation'
        else {
            const decoded = jwt.verify(token, process.env.SECRET)
            req.userId = decoded._id
        }
        const user = await User.get(req.userId)
        if (user[0].dataValues.typeUser == 1) {
            // return 'partials/navigationAdmin'
            return 'partials/navigation'
        }
        else if (user[0].dataValues.typeUser == 0) {
            // return 'partials/navigationUser'
            return 'partials/navigation'
        }
    }
    catch(err){
        console.log(err);
    }
    return 'partials/navigation'
    

}

module.exports = {verifyToken, isAdmin, isUser , navigationBar}