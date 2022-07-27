import React from 'react';
import Game from './components/Game';

const mockData = [
    {
        url: "some url1",
        createdBy: "Moriarty",
        createdDate: new Date().toLocaleString(),
        numberPLayers: 2,
    },
    {
        url: "some url2",
        createdBy: "Chesser",
        createdDate: new Date().toLocaleString(),
        numberPLayers: 1,
    },
    {
        url: "some url3",
        createdBy: "Player12345",
        createdDate: new Date().toLocaleString(),
        numberPLayers: 1,
    },
]

const App = () => {

    return (
        <Game />
    )
};

export default App;