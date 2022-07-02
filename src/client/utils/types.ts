interface Piece {
    row: number,
    col: number,
    piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
    teamColor: 'black' | 'white'
};

interface Cell {
    piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
    color: 'black' | 'white' 
};

