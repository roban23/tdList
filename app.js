import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
// Set up the express app
const app = express();
const PORT = 4300;
///////////////GET_SHOW_LIST///////////////////////////
app.get('/api/v2/todolist', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'message complete',
    todolist: db
  })
});

/////////////////ADD/////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/v2/todolist', (req, res) => {
    if(!req.body.task) {
      return res.status(400).send({
        success: 'false',
        message: 'task is required'
      });
    } else if(!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
      });
    }
   const todolist = {
     id: db.length + 1,
     task: req.body.task,
     description: req.body.description
   }
   db.push(todolist);
   return res.status(201).send({
     success: 'true',
     message: 'todo added successfully',
     todolist
   })
  });
///////////////DELETE/////////////////////
app.delete('/api/v2/todolist/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    db.map((todolist, index) => {
      if (todolist.id === id) {
         db.splice(index, 1);
         return res.status(200).send({
           success: 'true',
           message: 'Todo deleted successfuly',
         });
      }
    });
  
  
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
  
   
  });


////////////////LISTEN SERVER/////////////
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
  });
  
  
  