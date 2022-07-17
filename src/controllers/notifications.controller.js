const userController = require('../controllers/user.controller')

module.exports={
    get: async function(req,res){
        res.render('notifications.ejs',{title: ' | Avisos', users: await userController.list()})
    }    
}