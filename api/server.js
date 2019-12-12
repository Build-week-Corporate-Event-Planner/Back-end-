<<<<<<< HEAD
const express = require('express')
const server = express();
const eventsRouter = require("../events/eventsRouter")
const authRouter = require('../auth/aurthRouter')
const vendorsRouter = require('../vendors/vendorsRouter')
const todoListRouter = require('../todolist/todoListRouter')
const restriction = require('../auth/authenticate-middleware')
const userRouter = require('../auth/userRouter');


server.use(express.json())
server.use('/api/auth', authRouter)
server.use('/api/events' ,  eventsRouter)
server.use('/api/vendors', vendorsRouter)
server.use('/api/todolist', todoListRouter);
server.use('/api/users', restriction, userRouter);      //for users who log in to access their stuff, hence restriction: rest is for api demo

server.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome To The Corporate Event Planner'});
})


module.exports = server;










=======
const todoListRouter = require('../todoList/todoListRouter.js');
const userRouter = require('../auth/userRouter.js');



server.use('/api/todolist', todoListRouter);
server.use('/api/users', authenticate, userRouter); //for users who log in to access their stuff, hence restriction: rest is for api demo
>>>>>>> working on merges

