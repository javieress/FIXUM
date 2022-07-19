const userController = require('../controllers/user.controller')

const auth = require('../middlewares/authJwt')

module.exports={
    get: async function(req,res){
        res.render('notifications.ejs',{title: ' | Avisos', users: await userController.list(), message : "", navBar: await auth.navigationBar(req)})
    }    
}