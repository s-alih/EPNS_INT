const express = require('express'); 
const app = express();   
const connection = require('./connections/database')
require('../src/connections/database')
require('dotenv').config();
const fetchAllEvents = require('./utils/eventHandlers')




const port = 5000; 




app.get('/',async (req, res) => { 
    res.send('start',);                                                   
});


app.get('/fetchEvents',async (req,res)=>{
   
    const events = await fetchAllEvents()
    console.log(events)
    res.send(events)
})



app.get('/createEventTable',async(req,res)=>{
    const query = `create table Events(blockHash varchar(250), event json DEFAULT NULL, unique(blockHash));`;
    connection.query(query,(err, results, fields) => {
        if (err) {
        return res.send(err.message)
        }else{
            res.send(results)
        }
        
    })
})

const queryDB=(req,res)=>{

}

app.get('/pushToDb',async(req,res)=>{

    const events = await fetchAllEvents()
   
    let query = `INSERT INTO Events(blockHash, event) VALUES`;
    events.forEach((e)=>{
    
        query += `('${e.blockHash}','${JSON.stringify(e)}'),`

    })
    console.log(query)

    connection.query(`${query.slice(0,-1)}`,(err, results, fields) => {
        if (err) {
            return res.send(err.message)
        }else{
            res.send(results)
        }
        
    })
})

app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
})