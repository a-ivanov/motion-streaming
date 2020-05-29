const http = require('http');

function deg2rad(degrees) {
  return degrees * Math.PI / 180;
}

function* circle(radius) {
  let angle = 0;
  let step = deg2rad(45);

  while (true) {
    let current = angle;
    angle += step;
    
    yield {
      x: radius * Math.cos(current),
      y: radius * Math.sin(current),
    }
  }
}

const coords = circle(35);

http
  .createServer((req, res) => {
    console.log(`Requested URL: ${req.url}`)

    if (req.url.toLowerCase() === '/motion') {
      res.writeHead(200, {
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      setInterval(() => {
        res.write(`data: ${JSON.stringify(coords.next().value)}\n\n`);
      }, 2000);
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(5000, () => {
    console.log('Server running at http://127.0.0.1:5000/')
  });
