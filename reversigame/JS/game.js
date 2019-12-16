// launch reversi game

var options = []; // options object

// game options
options['computerWait'] = 500; // milliseconds to wait before computer does move
options['isBlack'] = true;     // true = human plays black, false = computer plays black
options['isWhite'] = false;    // true = human plays white, false = computer plays white

var gameOver = false; // true when game is over
var game; // game object

// customizable board sizes and colors for board and discs
var boardWidth = 8;             // default board width
var boardHeight = 8;            // default board height
var boardColor = 'green';       // default board color
var whiteColor = 'black';       // default white disc color
var blackColor = 'white';       // default black disc color
var whiteName = 'computer';     // default white name color
var blackName = 'player';       // default black name color
var versusComputer = true;      // true = play versus computer, false = play versus player


// initialize game
function init() {
    // customize game options
    setOptions();

    // play versus computer or player
    playVersus();

     // set options from Reversi to game
    game = new Reversi(options);
    
    // draw divs
    initHTML();
    
    // set external functions
    game.drawBoard = drawBoard;
    game.drawPossibleMoves = drawPossibleMoves;
    game.message = message;
    
    // reset
    game.reset();
    
    // player names
    game.playerNames[game.playerType.white] = whiteName;
    game.playerNames[game.playerType.black] = blackName;
        
    // tell who is who
    message(game.getName(game.playerType.white)+' is '+whiteColor);
    message(game.getName(game.playerType.black)+' is '+blackColor);
    
    // start game
    game.start();
}

// Javascript prompts player to change settings or ignore and click ok for standard 8x8 board and colors
// set options to change board size and colors
function setOptions() {
    var newSize = 8;
    var newColorBoard = 'green';
    var newColorWhite = 'white';
    var newColorBlack = 'black';

    // enter board size
    var inputSize = prompt("Please enter board size of 4/6/8", newSize);
    if (inputSize != null && (inputSize == 4 || inputSize == 6 || inputSize == 8)) {
        boardWidth = inputSize;
        boardHeight = inputSize;  // set to 4x4, 6x6, or 8x8
    }
    else { // set to default
        boardWidth = 8;
        boardHeight = 8;
    }

    // enter board color
    var inputBoard = prompt("Please enter board color", newColorBoard);
    if (inputBoard != null) { 
        boardColor = inputBoard; // set to new color
    }
    else { // set to default
        boardColor = 'green';
    }

    // enter color for white
    var inputWhite = prompt("Please enter your color for white disc", newColorWhite);
    if (inputWhite !=null) {
        whiteColor = inputWhite; // set to new color
    }
    else { // set to default
        whiteColor = 'white';
    }

    // enter color for black
    var inputBlack = prompt("Please enter other color for black disc", newColorBlack);
    if (inputBlack !=null) {
        blackColor = inputBlack; // set to new color
    }
    else { // set to default
        blackColor = 'black';
    }
}

// set names if game mode is player versus player
function setNames() {
    var newNameWhite = 'white';
    var newNameBlack = 'black';

    var inputNameWhite = prompt("Please enter name for white disc", newNameWhite);
    if (inputNameWhite != null) {
        whiteName = inputNameWhite; // set to new name for white
    }
    var inputNameBlack = prompt("Please enter name for black disc", newNameBlack);
    if (inputNameBlack != null) {
        blackName = inputNameBlack; // set to new name for black
    }
}

// choose to play against computer or player
function playVersus() {
    var versus = '2'; // default to against computer

    var input = prompt("Play against player (enter 1) or computer (enter 2)?", versus);
    if (input == '1') {
        alert("Now versus player");
        versusComputer = false; // set to player
        setNames();
    }
    else if (input == '2') {
        alert("Now versus computer");
        versusComputer = true; // set to computer
    }
    else {
        alert("Please enter 1 for player or 2 for computer")
        playVersus(); // invalid input, ask again
    }
}

// on click cell handler
function onCellClick() {
    // verify if user's turn
    if(game.isComputer(game.currPlayer)){
        // When computer is in play returns message and user clicks on board "not user's turn"
        message('Not your turn');
        return;
    }
    
    var cell = $(this);
    var col = parseInt(cell.attr('col')); // parseInt parses string and returns int
    var row = parseInt(cell.attr('row'));
    
    if(!game.isValidMove(game.board, game.currPlayer, col, row)){
        // clicking on empty board space without marker prints "invalid move"
        message('Invalid move');
        return;
    }
    
    // valid move
    game.playMove(col, row)
}

// draws reversi game board
function drawBoard(board) {
    if(gameOver) { // for after final turn
        return;
    }

    // hide markers
    $('.marker').hide(); 

    //makes the board from user input 
    for(i = 0; i < game.width; i++){
        for(j = 0; j < game.height; j++){
            var color = 'none';

            if(board[i][j] == game.playerType.white){ // set color for white disc
                color = whiteColor; 
            } else if(board[i][j] == game.playerType.black){ // set color for black disc
                color = blackColor; 
            }
            // set board background color
            $('#cell_'+i+'_'+j+' .disc').css('background-color', color);
        }
    }
}

// draw possible moves for each new disc
function drawPossibleMoves(possibleMoves) {
    for(i = 0; i < game.width; i++){
        for(j = 0; j < game.height; j++){
            // show possible moves and hide others
            if(possibleMoves[i][j] == true){
                $('#cell_'+i+'_'+j+' .marker').show();   
            } else {
                $('#cell_'+i+'_'+j+' .marker').hide();   
            }
        }
    }
}

// puts message in message box
function message(text) {    
    var message = $('<div class="arialChange">'+text+'</div>');
    
    $('#messages').prepend(message);

    message.hide();
    message.fadeIn(); // fades in new messages
}

// draw divs and setup click handler
function initHTML() {
    // insert divs
    for(i = 0; i < game.width; i++){
        for(j = 0; j < game.height; j++){
            var id = 'cell_'+i+'_'+j;
            $('#game').append(' \
                <div class="cell" id="'+id+'" col="'+i+'" row="'+j+'"> \
                    <div class="disc"> \
                        <div class="marker"></div> \
                    </div> \
                </div> \
            ');
        }
        $('#game').append('<div style="clear:both"></div>');
    }
    
    // board
    $('#game').css('border', 'thin solid white')
              .css('float', 'left')
              .css('background-color', boardColor);
    
    // board space
    $('.cell').css('width', '50px')
              .css('height', '50px')
              .css('border', 'thin solid white')
              .css('float', 'left');
    
    // board piece
    $('.disc').css('width', '42px')
              .css('height', '42px')
              .css('position', 'relative')
              .css('left', '4px')
              .css('top', '4px')
              .css('border-radius', '100%');
    
    // possible moves on board
    $('.marker').css('width', '16px')
                .css('height', '16px')
                .css('position', 'relative')
                .css('left', '13px')
                .css('top', '13px')
                .css('border-radius', '100%')
                .css('background-color', 'white')
                .hide();
               
    // setup on click
    $('.cell').click(onCellClick);
}