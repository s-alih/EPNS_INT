const express = require('express'); 
const app = express();   
require('dotenv').config();

const {provider,contract} = require('./connections/contconnection')


const port = 5000; 

const fetchAllEvents = async()=>{
    let eventFilter = contract.filters.Addition()
    let events = await contract.queryFilter(eventFilter)
    return events
}



app.get('/',async (req, res) => { 
    res.send('start',);                                                   
});


app.get('/fetchEvents',async (req,res)=>{
    const events = await fetchAllEvents()
    res.send(events)
})

app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
});