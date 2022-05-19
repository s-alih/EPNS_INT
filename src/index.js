const express = require('express'); 
const hbs = require('hbs');
const path = require('path')

const app = express();   
const connection = require('./connections/database')
require('../src/connections/database')
require('dotenv').config();
const {fetchAllEvents,fetchTokenBalance} = require('./utils/eventHandlers')


const viewsPath = path.join(__dirname,'../templets/views')
const partialsPath = path.join(__dirname,'../templets/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

const port = 5000; 




app.get('/',async (req, res) => { 
    res.render('index',);                                                   
});



app.get("/invoke",async(req,res)=>{

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
app.get('/fetchEvents',async(req,res)=>{
    const events = await fetchAllEvents()
    res.render("event",{"events":events})
})



app.get('/getTokenBalance',async(req,res)=>{
   const data = await fetchTokenBalance()
   res.sendStatus(200).send(data)
})


app.get('/fetchAndStoreEvents',async(req,res)=>{
    const events = await fetchAllEvents()
    let query = `INSERT IGNORE INTO Events(blockHash, event) VALUES`;
    events.forEach((e)=>{
        query += `('${e.blockHash}','${JSON.stringify(e)}'),`
    })
    console.log(events)
    connection.query(`${query.slice(0,-1)}`,(err, results, fields) => {
        if (err) {
            return res.send(err.message)
        }else{
            res.render("event",{"events":events})
        }
        
    })
})

app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
})