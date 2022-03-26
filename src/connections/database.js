
  
const mysql = require('mysql')
let config = {
    host    : 'localhost',
    user    : 'root',
    password: 'Salih@123456;',
    database: 'MEA_MESS',
    multipleStatements: true
  };
  let mysqlConnection = mysql.createConnection(config)
  mysqlConnection.connect((err)=>{
    if(!err){
      console.log('connected')
    }else{
      console.log('connection failed')
    }
  })

  
  module.exports = mysqlConnection