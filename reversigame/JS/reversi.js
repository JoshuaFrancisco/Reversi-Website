// game options
function Reversi(options) {
    // options
    this.computerWait = options['computerWait'] || 500;
    var blackIsPlayer = options['blackIsPlayer'] === true;
    var whiteIsPlayer = options['whiteIsPlayer'] !== false;

    // player type
    this.playerType = {none: 0, white: 1, black: 2};

    // standard board size
    this.width = boardWidth;
    this.height = boardHeight;
    
    this.board = [];
    this.currPlayer = this.playerType.none;
    this.computerPlayers = [];
    this.playerNames = [];

    this.directions = this.getDirections();

    if (versusComputer) { // check if playing against computer
    // computer is playing as white
    this.computerPlayers[this.playerType.black] = !blackIsPlayer;
    this.computerPlayers[this.playerType.white] = !whiteIsPlayer;
    }

    // must be set outside of the Reversi game
    this.drawBoard = function(board){};
    this.drawPossibleMoves = function(possibleMoves){};
    this.message = function(text){};
}

Reversi.prototype.reset = function() {
    // create empty board
    this.board = this.getEmptyBoard();
    
    // place starting discs
    this.placeDiscs(this.board);
    
    // black starts
    this.currPlayer = this.playerType.black;
}

Reversi.prototype.start = function() {
    // draw initial board
    this.drawBoard(this.board);
    
    // play first turn
    this.nextTurn();
}

// play current players move onto col,row
Reversi.prototype.playMove = function(col, row) {
    // place disc for players move
    this.placeDisc(col, row);
    
    // update board
    this.drawBoard(this.board);
    
    // set next player
    this.currPlayer = this.nextPlayer(this.currPlayer);
    
    //  next players turn
    this.nextTurn();
}

// initiate next players turn
Reversi.prototype.nextTurn = function() {
    // get successors
    var successors = this.getSuccessors(this.board, this.currPlayer);
    
    // if current player can't make a move
    if(successors.length == 0){
        // if other player can't make a move
        var otherPlayer = this.nextPlayer(this.currPlayer);
        var otherSuccessors = this.getSuccessors(this.board, otherPlayer);
        if(otherSuccessors.length == 0){
            // neither player has a possible move
            this.message('Neither player can make a move. GAME OVER.');
            // draw final board
            gameOver = true;
            this.drawBoard(this.gameBoard);
            return;
            }
        else {
            // current player has no move
            this.message(this.getName(this.currPlayer)+' has no moves.');
            
            // switch players
            this.currPlayer = this.nextPlayer(this.currPlayer);
            this.nextTurn(this.currPlayer);
            return;
        }
    }
    
    // update scores
    var scores = this.getScores(this.board);
    message('SCORE '+blackName+': '+(scores[this.playerType.black])+' '+whiteName+': '+(scores[this.playerType.white]));
    message('It is '+this.getName(this.currPlayer)+'\'s turn');

    if(this.isComputer(this.currPlayer)){
        // display possible moves
        this.drawPossibleMoves(this.getSuccessorBoard(this.board, this.currPlayer));
        
        // wait
        var _this = this;
        setTimeout(function(){
            // choose random successor
            var successors = _this.getSuccessors(_this.board, _this.currPlayer);
            var position = successors[Math.floor(Math.random()*successors.length)];
            
            var col = position[0];
            var row = position[1];
            _this.playMove(col, row);
        
        }, this.computerWait);  
    }
    else {
        // display possible moves
        this.drawPossibleMoves(this.getSuccessorBoard(this.board, this.currPlayer));
    }
}

Reversi.prototype.getScores = function(board) {
    var scores = [];
    
    scores[this.playerType.black] = 0;
    scores[this.playerType.white] = 0;
    
    for(c = 0; c < this.width; c++){
        for(r = 0; r < this.height; r++){
            if(this.board[c][r] == this.playerType.black){
                scores[this.playerType.black]++; 
            }
            else if(this.board[c][r] == this.playerType.white){
                scores[this.playerType.white]++;
            }
        }
    }
    return scores;
}

// returns true if the player is a computer
Reversi.prototype.isComputer = function(player) {
    return (this.computerPlayers[player] === true);
}

// places player disc on board and updates other cells
// assumes position is valid
Reversi.prototype.placeDisc = function(col, row) { 
    // searches from a move back to one of the players discs
    function getDirectionPath(direction, fromCol, fromRow) {
        var path = [];
        var otherPlayer = this.nextPlayer(this.currPlayer);

        // search until we find our own disc
        for(i in direction){
            var position = direction[i];
            var checkCol = fromCol + position[0];
            var checkRow = fromRow + position[1];
            
            // add current position to the path
            path.push([checkCol, checkRow]);
            
            if(!this.isValidPos(checkCol, checkRow)){
                return false;
            }
            // can not pass over none disc
            if(this.board[checkCol][checkRow] == this.playerType.none){
                return false;
            }
            
            // stop at current player disc
            if(this.board[checkCol][checkRow] == this.currPlayer){
                // a valid move will never be adjacent
                if(i == 0){
                    return false;
                }
                // return position
                return path;
            }
        }
        return false;
    }
    // place disc in selected position
    this.board[col][row] = this.currPlayer;
    
    // find all valid paths for move
    var validMove = false;
    for(d in this.directions){
        var direction = this.directions[d];
        
        // check if direction is possible
        path = getDirectionPath.call(this, direction, col, row);
        if(path !== false){
            validMove = true;
            // change discs for entire path
            for(i in path){
                position = path[i];
                this.board[position[0]][position[1]] = this.currPlayer;
            } 
        }
    }
    if(!validMove){
        console.log('No valid paths found');
    }
}

// checks if player can make move
Reversi.prototype.isValidMove = function(board, player, col, row) {
    var successorBoard = this.getSuccessorBoard(board, player);
    
    if(successorBoard[col][row] == true){
        return true;
    }
    return false;
}

// get all successor moves in a binary board format
Reversi.prototype.getSuccessorBoard = function(board, player) {
    return this.getSuccessors(board, player, true);
}

// get all successors, set last param to true for binary board format
Reversi.prototype.getSuccessors = function(board, currPlayer, boardFormat) {
    // search from player disc to possible successor
    function getDirectionMove(direction, fromCol, fromRow) {
        var otherPlayer = this.nextPlayer(this.currPlayer);

        // search until none position
        for(i in direction){
            var position = direction[i];
            var checkCol = fromCol + position[0];
            var checkRow = fromRow + position[1];
            
            if(!this.isValidPos(checkCol, checkRow)){
                return false;
            }
            // can not pass over current disc
            if(this.board[checkCol][checkRow] == this.currPlayer){
                return false;
            }
            
            // if none position found
            if(this.board[checkCol][checkRow] == this.playerType.none){
                // can not be immediate location
                if(i == 0){
                    return false;
                }
                // return position
                return [checkCol, checkRow];
            }
        }
        // no valid move for direction
        return false;
    }

    // create empty board which will become successor board
    var successorBoard = this.getEmptyBoard();
    var successors = [];
    
    // search for successors
    for(c = 0; c < this.width; c++){
        for(r = 0; r < this.height; r++){
            // make sure position is false
            if(successorBoard[c][r] !== true){
                successorBoard[c][r] = false;
            }
            // only start search from current player
            if(this.board[c][r] != this.currPlayer){
                continue;
            }
            
            // find all moves from position in each direction
            for(d in this.directions){
                var direction = this.directions[d];
                
                // check if direction is possible
                position = getDirectionMove.call(this, direction, c, r);
                if(position !== false){
                    successorBoard[position[0]][position[1]] = true;
                    successors.push(position);
                }
            }
        }
    }
    if(boardFormat === true){
        return successorBoard;
    }
    return successors;
}

// return all direction path differences
// adding these to position gives all paths in each direction
Reversi.prototype.getDirections = function() {
    var N =  [[ 0, -1], [ 0, -2], [ 0, -3], [ 0, -4], [ 0, -5], [ 0, -6], [ 0, -7]];
    var S =  [[ 0,  1], [ 0,  2], [ 0,  3], [ 0,  4], [ 0,  5], [ 0,  6], [ 0,  7]];
    var E =  [[-1,  0], [-2,  0], [-3,  0], [-4,  0], [-5,  0], [-6,  0], [-7,  0]];
    var W =  [[ 1,  0], [ 2,  0], [ 3,  0], [ 4,  0], [ 5,  0], [ 6,  0], [ 7,  0]];
    var NE = [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]];
    var NW = [[ 1, -1], [ 2, -2], [ 3, -3], [ 4, -4], [ 5, -5], [ 6, -6], [ 7, -7]];
    var SE = [[-1,  1], [-2,  2], [-3,  3], [-4,  4], [-5,  5], [-6,  6], [-7,  7]];
    var SW = [[ 1,  1], [ 2,  2], [ 3,  3], [ 4,  4], [ 5,  5], [ 6,  6], [ 7,  7]];
    
    var directions = [N, S, E, W, NE, NW, SE, SW];
    
    return directions;
}

// checks if position is on board
Reversi.prototype.isValidPos = function(col, row) {
    if(col < 0 || row < 0 || col >= this.width || row >= this.height){
        return false;
    }
    return true;
}

// returns player for next turn
Reversi.prototype.nextPlayer = function(player) {
    if(player == this.playerType.black) {
        return this.playerType.white;
    }
    else {
        return this.playerType.black;
    }
}

// returns empty board object
Reversi.prototype.getEmptyBoard = function() {
    // create empty matrix
    var board = [];
    for(c = 0; c < this.width; c++){
        board[c] = [];
        for(r = 0; r < this.height; r++){
            board[c][r] = this.playerType.none;   
        }
    }
    return board;
}

// setup initial game discs
Reversi.prototype.placeDiscs = function(board) {
    var left = Math.floor(this.width / 2) - 1;
    var top  = Math.floor(this.height / 2) - 1;

    // middle 4
    this.board[left][top] = this.playerType.white;
    this.board[left+1][top] = this.playerType.black;
    this.board[left][top+1] = this.playerType.black;
    this.board[left+1][top+1] = this.playerType.white;
}

// convert player to player name
Reversi.prototype.getName = function(player) {
    if(player == this.playerType.none){
        return 'none';
    }
    return this.playerNames[player];
}


