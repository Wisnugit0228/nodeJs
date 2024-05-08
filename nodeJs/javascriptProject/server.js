const http = require('http');

const port = 5000;
const host = "localhost";

const requestListiner = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    // response.statusCode = 200;
   

    const {method, url} = request;

    if(url === '/') {
        if(method === "GET") {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: "ini halaman utama"
            }))
        } else {
            response.statusCode = 400;
            
            response.end('<h1>halaman tidak dapat diakses</h1>');
        }
    } else if (url === '/about') {
        if(method === "POST") {
            let body = [];
    
            request.on('data', (chunk) => {
                body.push(chunk);
            });
    
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.statusCode = 200;
                response.end(`<h1> hai, ${name} </h1>`)
            })
        } else if(method === "GET") {
            response.statusCode = 200;
            response.end('<h1>Halo ini halaman about</h1>');
        } else {
            response.statusCode = 400;
            response.end('<h1>halaman tidak dapat diakses</h1>');
        }
    } else {
        response.statusCode = 400;
        response.end('<h1>halaman tidak ditemukan</h1>');
    }
    

    // if(method === "PUT") {
    //     response.end('<h1>Halo PUT!</h1>');
    // }

   

    // if(method === "DELETE") {
    //     response.end('<h1>Halo DELETE</h1>');
    // }

}


const server = http.createServer(requestListiner);

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
})


