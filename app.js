const distVals = [2,4,2,2,2,2,4,2];
const tilesContainer = document.querySelector(".tile-grid");
let board = [[null,null,null,null], [null,null,null,null], [null,null,null,null], [null,null,null,null]];

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function deleteTile() {
    this.removeEventListener('transitionend', deleteTile);
    this.remove();
}

function genTile(board, nullTiles) {
    const pos = nullTiles[Math.floor(Math.random() * nullTiles.length)];
    const v = Math.floor(Math.random() * 7);
    
    board[pos.x][pos.y] = {position: {x: pos.x, y: pos.y}, value: distVals[v]};
    const tile = document.createElement("div");
    tile.setAttribute("class", `tile pos-${pos.x}-${pos.y}`);
    tile.textContent = distVals[v];
    tilesContainer.appendChild(tile);
}

function emptyTiles(board) {
    let coords = [];
    for(i = 0; i < 4; i++) {
        for(j = 0; j < 4; j++) {
            if(board[i][j] === null) {
                coords.push({x: i, y: j});
            }
        }
    }

    return coords;
}

function startBoard() { 
    genTile(board, emptyTiles(board));
    genTile(board, emptyTiles(board));
    console.log(board);
}

function doStack(arr) {
    var arr = arr.filter(x => x != null);
    if(arr.length >= 2) {
        if(arr[0].value === arr[1].value) {
            arr[0].value *= 2;
            let pos1 = arr[0].position;
            let pos2 = arr[1].position;
            const tile1 = document.querySelector(`.tile.pos-${pos1.x}-${pos1.y}`);
            const tile2 = document.querySelector(`.tile.pos-${pos2.x}-${pos2.y}`);
            tile2.setAttribute('class', `tile pos-${pos1.x}-${pos1.y}`);
            tile2.addEventListener('transitionend', deleteTile); 
            tile1.innerHTML = arr[0].value;
            return [arr[0]].concat(doStack(arr.slice(2)))
        } else {
            return [arr[0]].concat(doStack(arr.slice(1)))
        }
    } else {
        return arr;
    }
}

function stack(row) {
    var stacked = doStack(row);
    return stacked.concat(Array(row.length - stacked.length).fill(null));
}

function move(opt) {
    if(opt === 1) {
        board = board.map(row => stack(row));
    } else if(opt === 2) {
        board = transpose(transpose(board).map(row => stack(row)));
    } else if(opt === 3) {
        board = board.map(row => stack(row.reverse()).reverse());
    } else if(opt === 4) {
        board = transpose(transpose(board).map(row => stack(row.reverse()).reverse()));
    }

    for(i = 0; i < 4; i++) {
        for(j = 0; j < 4; j++) {
            if(board[i][j] !== null) {
                let pos = board[i][j].position;
                if((pos.x !== i) || (pos.y !== j)) {
                    console.log(`tile pos-${pos.x}-${pos.y}`)
                    const tile = document.querySelector(`.tile.pos-${pos.x}-${pos.y}`);
                    console.log(tile);
                    console.log(`i: ${i}, j: ${j}`);
                    board[i][j].position = {x: i, y: j};
                    tile.setAttribute('class', `tile pos-${i}-${j}`);
                    tile.textContent = board[i][j].value;
                }
            }
        }
    }
    //console.log(board);
    genTile(board, emptyTiles(board));
    
    if(emptyTiles(board).length === 0) {
        const gameOver = document.createElement("div");
        gameOver.innerText = "Vc Perdeu";
        document.body.appendChild(gameOver);
    }
}

startBoard();

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
                move(2);
                break;
            case "ArrowRight":
                move(3);
                break;
            case "ArrowDown":
                move(4);
                break;
            default:
                return;
        }

        event.preventDefault();
    },
    true
);