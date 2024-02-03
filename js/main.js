/*----- constants -----*/
    const COLORS = {
        'null': 'white',
        '1': 'red',
        '-1': 'blue',
    };

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
  
/*----- state variables -----*/
let board, turn, winner; //winner will hold 1 or -1 if there is a winner. OR 'T' if there's a tie

/*----- cached elements  -----*/
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');

/*----- event listeners -----*/


/*----- functions -----*/


function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
}

function render() {
    //looping over board array
    boardRender();
    //show message for the current status: tie? is there a winner? who's turn is it now?
    messageRender();
}

function boardRender() {
    board.forEach(function(cellValue, idx) {
        const cellElement = document.getElementById(`cell${idx}`);
        cellElement.style.backgroundColor = COLORS[cellValue];
    });
}

function messageRender() {
    if(winner === 'T') {
        //if tied
        message.innerText = 'It is a tie';
    } else if(winner) {
        //if there is a winner: use the colour name for the player + uppercase
        message.innerHTML = `Congratulations! Winner is: <span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperClass()}</span>`;
    } else {
        //If game is still in progress - use the color name for the player, converting it to upper case
        message.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperClass()}</span>'s turn`;
    }
}

// init();