const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);

  if(parsedUrl.pathname === '/logs') {
    res.setHeader('Content-type', 'text/html');
    fs.readFile(path.join(__dirname, 'logs'), (err, data) => {
      if(!err && data) {
        res.write('<a href="/">Back</a>');
        res.end(`<pre>${data}</pre>`);
      } else {
        res.statusCode(500);
        res.end();
      }
    });
  } else {
    res.setHeader('Content-type', 'text/html')
    res.end('Show logs <a href="/logs">Logs</a>')
  }

}).listen(3000, () => {
  console.log('Listening on port 3000');
});