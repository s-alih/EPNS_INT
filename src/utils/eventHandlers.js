const {contract} = require('../connections/contconnection')
const fetchAllEvents = async()=>{
    let eventFilter = contract.filters.Addition()
    let events = await contract.queryFilter(eventFilter)
    return events
}

module.exports = fetchAllEvents