const async = require('hbs/lib/async')
const AhoCorasick = require('aho-corasick-node')
const {contract,provider,ethers} = require('../connections/contconnection')
const fetchAllEvents = async()=>{
    let eventFilter = contract.filters.Addition()
    let events = await contract.queryFilter(eventFilter)
    return events
}
// const fetchTokenBalance = async()=>{
//     const address = '0x8C3F996De147e2cee8F9eF0Bd0614d152e47030D'

//     let lastBalance = ethers.constants.Zero
//     filter = {
//         address: "0x8C3F996De147e2cee8F9eF0Bd0614d152e47030D",
//     }
//     provider.on(filter, (log, event) => {
//         console.log("listening")
//     provider.getBalance(address).then((balance) => {
//         console.log(ethers.utils.formatEther(lastBalance))
//         console.log(ethers.utils.formatEther(balance))
//         if (!balance.eq(lastBalance)) {
//          lastBalance = balance
//          console.log('balance changed')
//          return 'balance changed'
            
//         }else{
//             console.log("no balance changed")
//             return "no change in balance"
//         }
//     })
// })

// }
const fetchTokenBalance = async()=>{
    const wallets = ['0x18241781b17b878cFC16B109035904C8E5073e73', '0x8C3F996De147e2cee8F9eF0Bd0614d152e47030D',]; // This is slow because of DB
    // build AhoCorasick
    const builder = AhoCorasick.builder();
    wallets.forEach(k => builder.add(k));
    const ac = builder.build(); // This is expensive (!)
    const prevBlockNumber  = 31684742;
    // get current block number
    const currentBlockNumber = await provider.getBlockNumber();
    console.log(currentBlockNumber)

    for(let i =prevBlockNumber; i<= currentBlockNumber;i++ ){
        console.log(i)
        const data = await provider.getBlockWithTransactions(i)
        data.transactions.forEach((transaction)=>{
            const list = ac.match(JSON.stringify(transaction))
            if(list.length !== 0){
                console.log(list) ;
            }
        })

    }
    

}

module.exports = {fetchAllEvents,fetchTokenBalance}