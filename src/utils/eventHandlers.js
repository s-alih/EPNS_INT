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
    
    // now it's time to cache ac in between queries in a shared memory
    // and refresh it when any subsriber is added/or removed
    // and probably purge it every X minutes
    
    // on each block
    
    provider.on("block",async (blockNumber) => {
        console.log(blockNumber)
      // get block
     const data = await provider.getBlockWithTransactions(blockNumber)
    
    // {
    //   _difficulty: { BigNumber: "3849295379889" },
    //   difficulty: 3849295379889,
    //   extraData: '0x476574682f76312e302e312d39383130306634372f6c696e75782f676f312e34',
    //   gasLimit: { BigNumber: "3141592" },
    //   gasUsed: { BigNumber: "21000" },
    //   hash: '0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63',
    //   miner: '0x909755D480A27911cB7EeeB5edB918fae50883c0',
    //   nonce: '0x1a455280001cc3f8',
    //   number: 100004,
    //   parentHash: '0x73d88d376f6b4d232d70dc950d9515fad3b5aa241937e362fdbfd74d1c901781',
    //   timestamp: 1439799168,
    //   transactions: [
    //     {
    //       accessList: null,
    //       blockHash: '0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63',
    //       blockNumber: 100004,
    //       chainId: 0,
    //       confirmations: 14581276,
    //       creates: null,
    //       data: '0x',
    //       from: '0xcf00A85f3826941e7A25BFcF9Aac575d40410852',
    //       gasLimit: { BigNumber: "90000" },
    //       gasPrice: { BigNumber: "54588778004" },
    //       hash: '0x6f12399cc2cb42bed5b267899b08a847552e8c42a64f5eb128c1bcbd1974fb0c',
    //       nonce: 25,
    //       r: '0xb23adc880d3735e4389698dddc953fb02f1fa9b57e84d3510a2a4b3597ac2486',
    //       s: '0x4e856f95c4e2828933246fb4765a5bfd2ca5959840643bef0e80b4e3a243d064',
    //       to: '0xD9666150A9dA92d9108198a4072970805a8B3428',
    //       transactionIndex: 0,
    //       type: 0,
    //       v: 27,
    //       value: { BigNumber: "5000000000000000000" },
    //       wait: [Function]
    //     }
    //   ]
    // }
    data.transactions.forEach((transaction)=>{
        const list = ac.match(JSON.stringify(transaction))
        if(list.length !== 0){
            console.log(list) ;
        }
    })
    
    
    })

}

module.exports = {fetchAllEvents,fetchTokenBalance}