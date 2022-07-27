const express = require('express');
const router = express.Router();

router.get('/mock-response', (req, res) => {
    res.send({msg: 'test'})
})

module.exports = router;