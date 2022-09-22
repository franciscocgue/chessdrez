import { Application } from "express";

const express = require('express');
const path = require('path');
const routes = require('./routes');
const cors = require('cors')

const app = express() as Application;
const port = process.env.PORT || 8080;
const dist_dir = path.resolve(__dirname, '../../dist')
const html_file = path.resolve(dist_dir, 'index.html')

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
// Note: '*' is serving all, so it might serve js or other files; 
// Then you might see error Uncaught SyntaxError: Unexpected token '<'
// Need to check what is wrong with 'app.use(express.static(dist_dir))' above

// @TODO: when issue above solved, remove below lines
app.get('/home', (req, res) => {
    res.sendFile(html_file)
})
app.get('/chess', (req, res) => {
    res.sendFile(html_file)
})

app.get('*', (req, res) => {
    res.send('<p>Oh! Not found! Check <u>/home</u> or <u>/chess</u></p>')
})

app.listen(port, () => {
    console.log('#####\nServer started on port ' + port.toString() + '\n#####');
});