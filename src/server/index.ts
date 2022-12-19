import { Application } from "express";

const express = require('express');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');
const { Server } = require('socket.io');

import { MongoClient } from 'mongodb';

// Connection URI
const uri = 'mongodb+srv://admin:TNzmUyeQzqOm6RoG@cluster0.pf7w6n9.mongodb.net/?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
    console.log('start')
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        await client.db("chessdrez").command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    console.log('end')
}

run().catch(console.dir);

const app = express() as Application;
const port = process.env.PORT || 8080;
const dist_dir = path.resolve(__dirname, '../../dist');
const html_file = path.resolve(dist_dir, 'index.html');

console.log(dist_dir)

console.log(html_file)

// app.get('*', (req, res) => {
//     res.send('<p>Welcome!</p>')
// })

app.use(cors());
app.use(express.json())

// serve static assets
app.use(express.static(dist_dir))

routes(app);

app.get('/', (req, res) => {
    res.sendFile(html_file)
})


app.get('*', (req, res) => {
    res.sendFile(html_file)
})

// create Http Server
const server = app.listen(port, () => {
    console.log('#####\nServer started on port ' + port.toString() + '\n#####');
});

const io = new Server(server)

io.on('connection', (socket: any) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('move', (payload: string) => {
        console.log('move: ' + payload);
    })
});