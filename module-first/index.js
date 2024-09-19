const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send({ message: "Hello World" })
})

app.get('/slow-process', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    sendData(res, {
        event: "slowprocess",
        data: { "status": "started" }
    });
    setTimeout(() => {
        sendData(res, {
            event: "slowprocess",
            data: { "status": "completed", data: {} }
        });
        sendData(res, {
            event: "slowprocess",
            data: { "status": "end", data: {} }
        });
        res.end();
    }, 30000)
});

function sendData(res, jsonData) {
    console.log("Sending " + JSON.stringify(jsonData));
    //res.write(JSON.stringify(jsonData));
    res.write(`data: ${JSON.stringify(jsonData)}\n\n`);
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})