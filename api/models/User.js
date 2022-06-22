const mongoose = require('mongoose')

// const Users = mongoose.model('User', {
//     userName: {type: String, require: true, minLength: 3},
//     password: {type: String, require: true}
//     nombre: {type: String, require: true, minLength: 3},
//     apellido: {type: String, require: true, minLength: 3},
//     cargo: {type: String, require: true, minLength: 3},
//     tipo: {type: String, require: true, minLength: 3},
// })

class User{
    constructor(userName,password,nombre,apellido,cargo,tipo){
        this.userName = userName;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.cargo = cargo;
        this.tipo = tipo;
    }
}

// module.exports = Users
module.exports = User
