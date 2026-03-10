const http=require('http');

const server = http.createServer((req,res)=>{
    
    const url = req.url;
    const method = req.method;

    console.log(`Incoming URL is ${req.url}`)
    console.log(`Incoming Method is ${req.method}`)

    res.writeHead(200,{'Content-Type':'text/html'});
    res.write("<h1>Home Page12</h1>");
    res.end();    

    
});

const PORT=3000;

server.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})