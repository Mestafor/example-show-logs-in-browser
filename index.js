const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);

  if(parsedUrl.pathname === '/logs') {
    // Show list
    fs.readdir(path.join(__dirname, 'logs'), (err, data) => {
      if(!err && data.length > 0) {
        res.setHeader('Content-type', 'text/html');
        res.write('<a href="/">Back</a> </br><hr>');
        res.end(
          data.reduce((str, fileName) => {
            str += `<a href="/logs/${fileName}">${fileName}</a></br>`
            return str;
          }, '')
        );
      } else {
        res.writeHead(500);
        res.end();
      }
    });
  } else if(parsedUrl.pathname.indexOf('/logs/') > -1) {
    res.setHeader('Content-type', 'text/html');
    const pathToFile = path.join(__dirname, parsedUrl.pathname)
    fs.readFile(pathToFile, (err, data) => {
      if(!err && data) {
        res.write('<a href="/logs">Back</a><hr>');
        res.write(`<strong>File local path: <em>${pathToFile}</em></strong> </br><hr>`);
        res.end(`<pre>${data}</pre>`);
      } else {
        res.writeHead(500);
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