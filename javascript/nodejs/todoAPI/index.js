const express=require('express');
const app=express();
require('dotenv').config();
app.use(express.json());

let todos=[
    {
        id:1,
        title:"Learn Nodejs with Express JS",
        completed:false
    },
    {
        id:2,
        title:"Build a API in Express JS",
        completed:true
    }
];

app.get("/api/todos",(req,res)=>{
    res.status(200).json(todos)
})

app.post("/api/todos",(req,res)=>{
    const todo = {
         id:todos.length+1,
         title:req.body.title,
         completed:false
    };
    todos.push(todo);
    res.status(201).json(todo)
})

//http://localhost/api/todos/1
app.get('/api/todos/:id',(req,res)=>{
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if(!todo) return res.status(404).json({message:'Todo not found'})
    res.json(todo);
});

app.put('/api/todos/:id',(req,res)=>{
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if(!todo) return res.status(404).json({message:'Todo not found'})
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    res.json(todo);
});

app.delete('/api/todos/:id',(req,res)=>{
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if(index === -1) return res.status(404).json({message:'Todo not found'})
    todos.splice(index,1)
    res.json({message:"Todo Deleted"});
});

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Todo API running on http://localhost:${PORT}`);
});