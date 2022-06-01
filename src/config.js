const {config} = require('dotenv')

config()

console.log(process.env.HELLO);

module.exports = {
    port: process.env.PORT || 3000
    
}