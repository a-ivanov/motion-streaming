const coords = require('./coords');
const http = require('http');

const SSE_RESPONSE_HEADERS = {
  Connection: 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*'
};

http.createServer((req, res) => {
  console.log(`Requested URL: ${req.url}`)

  req.on('close', () => {
    if (!res.finished) {
      res.end();
      console.log('Stopped sending events');
    }
  })

  if (req.url.toLowerCase() === '/motion') {
    res.writeHead(200, SSE_RESPONSE_HEADERS);
    
    setInterval(() => {
      if (!res.finished) {
        res.write(`data: ${JSON.stringify(coords.next().value)}\n\n`);
      }
    }, 100);
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(5000);

console.log('Server running at http://127.0.0.1:5000/');
