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
const gameBoard = document.getElementById('board');

/*----- event listeners -----*/
//When game board is clicked, run handleMove
gameBoard.addEventListener('click', handleMove);

//When reset button is clicked, run init
resetBtn.addEventListener('click', init);

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

    //reset buttion is not abled if there is no winner
    resetBtn.disabled = !winner;
}

function boardRender() {
    board.forEach(function(cellValue, idx) {
        const cellElement = document.getElementById(`cell${idx}`);
        cellElement.style.backgroundColor = COLORS[cellValue];

        //cellElemnt will have 'avail' class assgined if there is the cell is available, it not, nothing.
        cellElement.className = !cellValue ? 'avail' : '';

    });
}

function messageRender() {
    if(winner === 'T') {
        //if tied
        message.innerText = 'It is a tie';
    } else if(winner) {
        //if there is a winner: use the colour name for the player + uppercase
        message.innerHTML = `Congratulations! Winner is: <span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span>`;
    } else {
        //If game is still in progress - use the color name for the player, converting it to upper case
        message.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s turn`;
    }
}

function handleMove (evt) {

    //getting inddex of the cell by replacing cell id name from cell + number to "" + number and get the number (from 0 - 8) by parseInt
    const idx = parseInt(evt.target.id.replace('cell', ''));

    //if cell isn't clicked (idx is not a number) OR cell is taken OR there is a winner
    if (isNaN(idx) || board[idx] || winner) return;

    //the person who has the turn gets this cell
    board[idx] = turn;
    winner = getWinner();
    //if 1's turn: 1 * -1 => -1. if -1's turn: -1 * -1 => 1
    turn *= -1;

    //update the current status
    render();
}

function getWinner() {
    for(let winArr of WINNING_COMBINATIONS) {
        if (Math.abs(board[winArr[0]] + board[winArr[1]] + board[winArr[2]]) === 3) return turn;
    }

    //Tie
    if (board.includes(null)) return null;
    return 'T';
}


init();