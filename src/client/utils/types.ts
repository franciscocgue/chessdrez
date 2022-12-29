interface Piece {
    row: number,
    col: number,
    piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
    color: 'black' | 'white'
};

interface Cell {
    piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
    color: null | 'black' | 'white',
};

interface Move {
    pieceFrom: Piece,
    pieceTo: Piece,
    eaten?: Cell,
};

interface BoardType {
    [key: string]: Cell,
}[]
// interface BoardType {
//     '11': Cell, '12': Cell, '13': Cell, '14': Cell, '15': Cell, '16': Cell, '17': Cell, '18': Cell,
//     '21': Cell, '22': Cell, '23': Cell, '24': Cell, '25': Cell, '26': Cell, '27': Cell, '28': Cell,
//     '31': Cell, '32': Cell, '33': Cell, '34': Cell, '35': Cell, '36': Cell, '37': Cell, '38': Cell,
//     '41': Cell, '42': Cell, '43': Cell, '44': Cell, '45': Cell, '46': Cell, '47': Cell, '48': Cell,
//     '51': Cell, '52': Cell, '53': Cell, '54': Cell, '55': Cell, '56': Cell, '57': Cell, '58': Cell,
//     '61': Cell, '62': Cell, '63': Cell, '64': Cell, '65': Cell, '66': Cell, '67': Cell, '68': Cell,
//     '71': Cell, '72': Cell, '73': Cell, '74': Cell, '75': Cell, '76': Cell, '77': Cell, '78': Cell,
//     '81': Cell, '82': Cell, '83': Cell, '84': Cell, '85': Cell, '86': Cell, '87': Cell, '88': Cell,
// }

export {
    type Piece,
    type Cell,
    type BoardType,
    type Move,
}