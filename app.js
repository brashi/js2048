const distVals = [2,4,2,2,2,2,4,2];

var board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];

function genTile(board) {
    const x = Math.floor(Math.random() * 4);
    const y = Math.floor(Math.random() * 4);

    board[x][y] = distVals[x];
}

function emptyTiles(board) {
    
}

function startBoard() {
    
    genTile(board);
    genTile(board);

    console.log(board);
}

startBoard()

function doStack(arr) {
    var arr = arr.filter(x => x != 0);
    if(arr.length >= 2) {
        if(arr[0] === arr[1]) {
            return [(arr[0] * 2)].concat(doStack(arr.slice(2)))
        } else {
            return [arr[0]].concat(doStack(arr.slice(1)))
        }
    } else {
        return arr;
    }
}

function stack(row) {
    
    var stacked = doStack(row);
    

    return stacked.concat(Array(row.length - stacked.length).fill(0));
}

function move(opt) {
    if(opt === 1) {
        board = board.map(row => stack(row));
    } else if(opt === 3) {
        board = board.map(row => stack(row.reverse()).reverse())
    }
    console.log(board);
}

window.addEventListener(
    "keydown",
    (event) => {
        if(event.defaultPrevented) {
            return;
        }

        switch(event.key) {
            case "ArrowLeft":
                move(1);
                break;
            case "ArrowUp":
                break;
            case "ArrowRight":
                move(3);
                break;
            case "ArrowDown":
                break;
            default:
                return;
        }

        event.preventDefault();
    },
    true
);