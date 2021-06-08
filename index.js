const deepstream = require('deepstream.io-client-js');
const client = deepstream('wss://data.zebapi.com', {
    silentDeprecation: true
}).login({
    username: 'zebpay',
    password: 'zebpay'
});

client.on('error', (error, event, topic) => {
    console.log('error', error, event, topic);
});

client.on('connectionStateChanged', connectionState => {
    //https://deepstream.io/tutorials/concepts/connectivity/#connection-states

    console.log('connectionState', connectionState);
    // will be called with 'CLOSED' once the connection is successfully closed.
})

//Refer deepStreamOrderHistoryUrl of API https://www.zebapi.com/api/v1/tradepairs/IN
const transactionHistoryEventSubscription = [
    'BTC-INR-txHistory_singapore',
    'MATIC-INR-txHistory_singapore'
];

//Refer deepStreamOrderBookUrl of API https://www.zebapi.com/api/v1/tradepairs/IN
const bookRecordSubscription = [
    'book_singapore/MATIC-INR',
    'book_singapore/BCH-INR'
]

//Refer deepStreamTickerUrl of API https://www.zebapi.com/api/v1/tradepairs/IN
const tickerRecordSubscription = [
    'ticker_singapore/BTC-INR'
];

tickerRecordSubscription.forEach(tickerRecord => {
    client.record.getRecord(tickerRecord).whenReady(record => {
        record.subscribe(data => {
            console.log('ticker ', tickerRecord, data);
        })
    });
});

transactionHistoryEventSubscription.forEach(transactionHistoryEvent => {
    client.event.subscribe(transactionHistoryEvent, data => {
        console.log('transaction ', transactionHistoryEvent, data);
    });
})

bookRecordSubscription.forEach(bookRecord => {
    client.record.getRecord(bookRecord).whenReady(record => {
        record.subscribe(data => {
            console.log('book ', bookRecord, data);
        })
    });
});