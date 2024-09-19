const express = require('express')
const app = express()
const port = 4000

const EventSource = require('eventsource');

app.get('/', (req, res) => {
  res.send({ message: "Hello World" })
})

app.get('/start-slow-process', (req, res) => {
  handleEventSource();
  res.send({ message: "Started at "+Date.now() })
})


function handleEventSource() {
  const es = new EventSource('http://localhost:3000/slow-process');

  // es.addEventListener('slowprocess', function (message) {
  //   console.log('message:', message)
  // });
  es.addEventListener('message', function (message) {
    console.log('message:', JSON.parse(message.data))
  });
  es.addEventListener('open', function (message) {
    console.log('open:', message)
  });
  es.addEventListener('error', function (message) {
    console.log('error:', message);
    es.close();
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})