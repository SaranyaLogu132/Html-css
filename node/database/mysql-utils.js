
const mysql = require('mysql');

mysqlConnect = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'Arak@12345',
    database:'product_data',
    part:'3306'
})

mysqlConnect.connect((err)=>{
    if(err){
        console.log(err)
        console.log('unable to connect to db');
    }
    else{
        console.log('connected successfully')
    }
})

module.exports.mysqlConnect = mysqlConnect;