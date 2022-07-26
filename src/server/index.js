const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const dist_dir = path.resolve(__dirname, '../../dist')
const html_file = path.resolve(dist_dir, 'index.html')

// app.get('*', (req, res) => {
//     res.send('<p>Welcome!</p>')
// })

// serve static assets
app.use(express.static(dist_dir))

app.get('*', (req, res) => {
    res.sendFile(html_file)
})

app.listen(port, () => {
    console.log('#####\nServer started on port ' + port.toString() + '\n#####');
});