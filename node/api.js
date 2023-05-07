const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');
const {fetchData} = require('./api/app');


const app = express();
app.use(json());
app.use(cors());


app.get('/fetchdata', async (req,res) => {
    console.log("fetching data");
    try{
        const data = await fetchData();
        console.log(data);
        res.send(data);
    }
    catch(error){
        res.send(error.message)
    }
})



const server = app.listen(8086,() => {
    console.log("server running", server.address().port)
})