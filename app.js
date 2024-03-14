const express = require('express')
const morgan = require('morgan')
const app = new express()
app.use(morgan('dev'))
app.use(express.json());

//TASK TO COMPLETE
 let tasks = []
//path
app.get("/",(req,res)=>{
    res.json(tasks)
    console.log("worked")
})
//route to create an task
app.post("/task",(req,res)=>{
    const task = req.body
    tasks.push(task)
    res.send({message:"Task has added",tasks})
})
//route to update a task using ID
app.get('/task/:id', (req,res) => {
    const id = req.params.id
    console.log(id)
    const task = tasks.find(task => task.id === id);

    if (!task) {
        res.send("no");
    } else {
        res.status(200).send(task);
    }
});
//
app.put("/task/:id", (req,res) => {
    // const id = req.params.id
    // const task = tasks.find(task => task.id === id);
    // if(!task){
    //     console.log('not finded')
    // }else{
    //     task.id = req.body.id
    //     task.task =req.body.task
    //     console.log('Updated successfully')
    //     res.send(tasks)

    const id = req.params.id
    const updatedtask = req.body;
    const index =  tasks.findIndex((task)=>task.id === id )//return -1 = not finded otherwise return index position
    if(index === -1){
        res.send("not finded the element")
    }else{
    //splice(position to add the new element , 1,req.body)
    tasks.splice(index,1,updatedtask)
    res.send(tasks)
    }

    // }
})

app.delete('/task/:id',(req,res)=>{
    const id =req.params.id
    const index =  tasks.findIndex((task)=>task.id === id )
    if(index === -1){
        console.log("Specified element is not presented ")
    }else{
        tasks.splice(index, 1);
        res.send('specified item is deleted')
        console.log('deleted')
    }
})
app.listen(5000,(req,res)=>{
    console.log('SERVER ACTIVATED')
})
