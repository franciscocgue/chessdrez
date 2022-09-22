import { Router } from "express";

const express = require('express');
const router = express.Router() as Router;

interface Game {
    id: number,
    players: 1 | 2,
    creator: string,
    password?: string
}

// list ongoing games
router.get('/', (req, res) => {
    // @TODO: get list of games from database
    const games:Game[] = [
        {
            id: 1,
            players: 2,
            creator: "Moriarty",
            password: 'thisIsAPassword'
        },
        {
            id: 2,
            players: 1,
            creator: "Mr Coin",
        },
        {
            id: 3,
            players: 1,
            creator: "AplayerA",
            password: 'thisIsAPassword'
        },
        {
            id: 4,
            players: 2,
            creator: "chesser321",
        },
    ];

    res.send(games)
});

module.exports = router;