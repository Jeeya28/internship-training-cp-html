const express = require('express');
const app = express();

require('dotenv').config()

const PORT = process.env.PORT;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1>');
});

app.get('/about',(req,res)=>{
    res.send('<h1>About Page</h1>');
});


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})