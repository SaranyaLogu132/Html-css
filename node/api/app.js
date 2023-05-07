const { response } = require("express");

const { mysqlConnect } = require("../Database/mysql-utils");


class listProduct{

    static fetchData(){
        return new Promise((resolve,reject) => {
            mysqlConnect.query('select * from product_list', (error,record) => {
                if (!error){
                    console.log(record);
                    resolve(record);
                }
                else{
                    console.log(error);
                    reject(error)           
                }
            });
        })        
    }    

}
module.exports.fetchData = listProduct.fetchData;