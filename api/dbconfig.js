const  config = {
    user:  'foo', // sql user
    password:  'foo', //sql user password
    server:  '127.0.0.1', // if it does not work try- localhost
    database:  'Products',
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  'SQLEXPRESS'  // SQL Server instance name
    },
    port: 4000
  }
  
  module.exports = config;