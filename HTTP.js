const http = require('http');
const fs = require("fs");
const url = require("url");
const { console } = require('inspector');

// == Simple HTTP Server Example ==
const hostname = 'localhost';
const port = 8100;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// == Handling Different Routes ==

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Welcome to the Home Page\n');
//     } else if (req.url === '/about') {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('About Us Page\n');
//     } else {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Page Not Found\n');
//     }
// });
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });


// == Serving JSON Response ==

// const server = http.createServer((req, res) => {
//     if (req.url === '/data') {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         const data = {
//             message: 'Hello, this is JSON data!',
//             items: [1, 2, 3, 4, 5]
//         };
//         res.end(JSON.stringify(data));
//     } else {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Page Not Found\n');
//     }
// });
// // server.listen(port, hostname);
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });


// == Handling POST Requests ==

// const server = http.createServer((req, res) => {
//     if (req.method === 'POST' && req.url === '/submit') {
//         let body = 'jatin jethava testing post request';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.end(JSON.stringify({ receivedData: body }));
//         });
//     } else {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Page Not Found\n');
//     }
// });
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });


// == Simple Routing with Query Parameters ==

// const url = require('url');
// const server = http.createServer((req, res) => {
//     const parsedUrl = url.parse(req.url, true);

//     if (parsedUrl.pathname === '/') {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Welcome to the Home Page\n');
//     } else if (parsedUrl.pathname === '/user') {
//         const name = parsedUrl.query.name || 'Guest';
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end(`Hello, ${name}!\n`);
//     } else {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Page Not Found\n');
//     }
// });
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });


// == Serving Static Files ==

// const fs = require('fs');
// const path = require('path');
// const server = http.createServer((req, res) => {
//     let filePath = '.' + req.url;
//     if (filePath === './') {
//         filePath = './export.js';
//     }
//     const extname = String(path.extname(filePath)).toLowerCase();
//     const mimeTypes = {
//         '.txt': 'text/plain',
//         '.html': 'text/html',
//         '.js': 'text/javascript',
//         '.css': 'text/css',
//         '.json': 'application/json',
//         '.png': 'image/png',
//         '.jpg': 'image/jpg',
//         '.gif': 'image/gif',
//         '.wav': 'audio/wav',
//         '.mp4': 'video/mp4',
//         '.woff': 'application/font-woff',
//         '.ttf': 'application/font-ttf',
//         '.eot': 'application/vnd.ms-fontobject',
//         '.otf': 'application/font-otf',
//         '.svg': 'application/image/svg+xml'
//     };
//     const contentType = mimeTypes[extname] || 'application/octet-stream';
//     fs.readFile(filePath, (error, content) => {
//         if (error) {
//             if (error.code === 'ENOENT') {
//                 res.statusCode = 404;
//                 res.end('404 Not Found\n');
//             } else {
//                 res.statusCode = 500;
//                 res.end('Internal Server Error\n');
//             }
//         } else {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', contentType);
//             res.end(content, 'utf-8');
//         }
//     });
// });
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });


// The above examples demonstrate various functionalities of the HTTP module in Node.js, including creating a simple server, handling different routes, serving JSON responses, processing POST requests, managing query parameters, and serving static files.

// function data(req, res) {
//     res.write("<h1>Hello , World!</h1>");
//     res.end();
// }
// http.createServer(data).listen(8100);

http.createServer((req, res) => {

    const log = `${Date.now()} : || ${req.url} || new req receive\n`;
    const my_url = url.parse(req.url, true);

    if (req.url === "/favicon.ico") return res.end();
    if (req.url === "/.well-known/appspecific/com.chrome.devtools.json") return res.end();

    fs.appendFile("./log.txt", log, (error, data) => {
        switch (my_url.pathname) {
            case "/":
                res.end(`hi , ${my_url.query.name}`);
                break;
            case "/about":
                res.end("this is About page");
                break;
            case "/contact":
                res.end("this is Contact page");
                break;
            default:
                res.end("404 Page Not Found");
                break;
        }
    })
}).listen(8100);