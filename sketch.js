/**
 * Created by MOHIT on 14-01-2018.
 */

var SquareGrid;
var row;
var col;
var player;
var play;
var isGameOver;
var winner;
var marker_X;
var marker_O;

var w_button; // play again button
var h_button;
var x_button;
var y_button;

var moves;

// some boolean vars for bots
var isPlayerOneBot;
var isPlayerTwoBot;
var BotOne;
var BotTwo;
var hello;

var play_again;
var reset_game;
var start_game;

var player1_Set, player2_Set;

function setup(){
    var canvas = createCanvas(450, 450);
    txt = createDiv("<a href = 'https://github.com/M2skills/M2skills.github.io'>M2skills.github.io</a><br>" +
                    "A simple project of tic tac toe. <br>" +
                    "It is done using <b>p5.js</b> and some jquery. <br>" +
                    "The game contains 4 bots : <br> <br>" +
                    "<b>BOT 1</b> : Random bot that marks an <b>empty position randomly</b> using random function. <br>" +
                    "<b>BOT 2</b> : This bot picks the <b>first empty position</b> and marks it.<br>" +
                    "<b>BOT 3</b> : This bot is a <b>heuristic bot</b>, mostly hardcoded for certain scenarios, either wins or blocks other player. Techniques used for this bot can be easily found online, a strategy mentioned in <a href = 'https://www.wikihow.com/Win-at-Tic-Tac-Toe'>wikihow</a> page is very similar to the strategy used here. <br>" +
                    "<b>BOT 4</b> : This bot uses <b>minimax algorithm</b> with depth of 3 and makes the best move (requires some correction though, failing for some cases)<br>" +
                    "You can also choose to play against a bot or play with a friend <br>" +
                    "<br>UI requires some work, IF you have any ideas please comment, fork and request merge. Any suggestion, corrections etc are most welcome. <br>" +
                    "If you like this, please give the repository a star. <br>" +
                    "Click <a href = 'https://github.com/M2skills/M2skills.github.io'><b>HERE</b></a> to view the Code. <br>" +
                    "<br><b>References</b><br>" +
                    "<a href = 'https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/'>Minimax algorithm in game theory-set</a>" +
                    "<br><a href = 'https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe'>Is there a way to never lose at Tic Tac Toe</a> " +
                    "<br><a href = 'http://alpha.editor.p5js.org/kenzo/sketches/ryE8i2Yp'>P5 Tic Tac Toe Sketch by Kenzo</a> " +
                    "<br>Thanks!!<br>");
    txt.position(550, 305);
    row = 3;
    col = 3;
    winner = 0;
    moves = 9;
    play = true;
    isGameOver = true;
    SquareGrid = setGamePlay();
    marker_X = 3;
    marker_O = 5;
    player = 1;
    w_button = 150; // play again button
    h_button = 40;
    x_button = 85;
    y_button = 630;
    
    isPlayerOneBot = true;
    isPlayerTwoBot = true;

    link_variables_to_buttons();
}


//
function link_variables_to_buttons(){

    play_again = document.getElementById("play-again");
    play_again.addEventListener("click", play_again_pressed);

    reset_game = document.getElementById("reset-game");
    reset_game.addEventListener("click", reset_game_pressed);

    start_game = document.getElementById("start-game");
    start_game.addEventListener("click", start_game_pressed);
}

function displayGrid() {
    for (var i = 0; i < SquareGrid.length; i++) {
        SquareGrid[i].display();
    }
}

function draw() {
    background(200);
    // displayGrid();
    if (isGameOver == false) {
        background(200);
        if ( (frameCount %  60 == 0) && (frameCount % 120 != 0) && player == 1 && moves != 0 && isPlayerOneBot == true) {
            BotOne.makeMove(marker_X);
            moves--;
            player = 2;
        }
        if (frameCount % 120 == 0 && player == 2 && moves != 0 && isPlayerTwoBot == true){
            BotTwo.makeMove(marker_O);
            moves--;
            player = 1;
        }
         displayGrid();
        if(moves == 0){
            isGameOver = true;
            end_of_game_text(-1);
        }
    } else {
        play = false;

        // display Winner Message
        if (check_for_win(marker_X) == true) {
            background(255, 0, 0);
            end_of_game_text(marker_X, "Superman");
        } else if (check_for_win(marker_O) == true) {
            background(0, 255, 0);
            end_of_game_text(marker_O, "Batman");
        } else if(moves == 0){
            background(0);
            end_of_game_text(-1);
        }
        displayGrid()
    }
    if(moves == 0){
        isGameOver = true;
    }
    if(moves < 9) {
        isGameOver = (check_for_win(marker_X) || check_for_win(marker_O)) || (moves == 0);
        console.log(isGameOver, moves);
    }
}

function start_game_pressed() {
    console.log("Start game button pressed");
    if(p1_self == true){
        isPlayerOneBot = false;
        player1_Set = true;
    }else if(p1_random1){
        isPlayerOneBot = true;
        player1_Set = true;
        BotOne = new RandomBot("Superman", 1);
    }else if(p1_random2){
        isPlayerOneBot = true;
        player1_Set = true;
        BotOne = new RandomBot("Superman", 0);
    }else if(p1_non_ai){
        isPlayerOneBot = true;
        player1_Set = true;
        BotOne = new NonAIBot("Superman", 1, marker_X)
    }else if(p1_ai){
        isPlayerOneBot = true;
        player1_Set = true;
        BotOne = new MinMaxBot("Superman", 1, marker_X);
    }

    if(p2_self == true){
        isPlayerTwoBot = false;
        player2_Set = true;
    }else if(p2_random1){
        isPlayerTwoBot = true;
        player2_Set = true;
        BotTwo = new RandomBot("Batman", 1);
    }else if(p2_random2){
        isPlayerTwoBot = true;
        player2_Set = true;
        BotTwo = new RandomBot("Batman", 0);
    }else if(p2_non_ai){
        isPlayerTwoBot = true;
        player2_Set = true;
        BotTwo = new NonAIBot("Batman", 1, marker_O)
    }else if(p2_ai){
        isPlayerTwoBot = true;
        player2_Set = true;
        BotTwo = new MinMaxBot("Batman", 1, marker_O);
    }

    if(player1_Set == true && player2_Set == true){
        isGameOver = false;
        play = true;
    }
}

function play_again_pressed() {
    console.log("Play again button pressed");
    clear();
    setup();
    setGamePlay();
    start_game_pressed();
}

function reset_game_pressed() {
    console.log("Reset game button pressed");
    //clear();
    //setup();
    setGamePlay();
    isGameOver = true;

}

function check_for_win(marker) {

    // checking for row wins
    for (var index = 0; index < 7; index += 3) {
        if (SquareGrid[index].getCellMarker() == marker && SquareGrid[index + 1].getCellMarker() == marker && SquareGrid[index + 2].getCellMarker() == marker) {
            return true;
        }
    }

    // checking for col wins
    for (index = 0; index < 3; index++) {
        if (SquareGrid[index].getCellMarker() == marker && SquareGrid[index + 3].getCellMarker() == marker && SquareGrid[index + 6].getCellMarker() == marker) {
            return true;
        }
    }

    // checking for diagonal wins
    if (SquareGrid[0].getCellMarker() == marker && SquareGrid[4].getCellMarker() == marker && SquareGrid[8].getCellMarker() == marker) {
        return true;
    }

    if (SquareGrid[2].getCellMarker() == marker && SquareGrid[4].getCellMarker() == marker && SquareGrid[6].getCellMarker() == marker) {
        return true;
    }

    // if none of above cases is true then return false
    return false;
}

function end_of_game_text(player, player_name) {

    var xPosition = 65,
        yPosition = 400;

    stroke(255);
    textSize(20);

    if (player == marker_X) {
        text("Winner of the Game is : " + player_name, xPosition, yPosition);
    } else if (player == marker_O) {
        text("Winner of the Game is : " + player_name, xPosition, yPosition);
    } else if (player == -1) {
        text("Game has been Tied :( ", xPosition, yPosition);
    }
}

function Square(xpos, ypos, cwidth, cheight) {
    // constructor
    this.xPos = xpos;
    this.yPos = ypos;
    this.sWidth = cwidth;
    this.sHeight = cheight;
    this.marker = 2;

    this.display = function() {
        rect(this.xPos, this.yPos, this.sWidth, this.sHeight);
        if (this.marker == marker_X) {
            this.drawX();
        } else if (this.marker == marker_O) {
            this.drawO();
        }
    };

    this.drawX = function() {
        stroke(255, 0, 0);
        strokeWeight(5);
        line(this.xPos + 20, this.yPos + 20, this.xPos + (this.sWidth - 20), this.yPos + (this.sHeight - 20));
        line(this.xPos + 20, this.yPos + (this.sHeight - 20), this.xPos + (this.sWidth - 20), this.yPos + 20);
        stroke(0);
        strokeWeight(1);
    };

    this.drawO = function() {
        stroke(0, 0, 255);
        strokeWeight(5);
        ellipse(this.xPos + (this.sWidth / 2), this.yPos + (this.sHeight / 2), this.sWidth - 25, this.sHeight - 25);
        stroke(0);
        strokeWeight(1);
    };

    this.click = function() {
        print("click function called " + player);
        print(this.marker);
        if (this.marker === 2 && play === true) {

            if (player == 1) {
                this.marker = marker_X;
                player = 2;
            } else if (player == 2) {
                this.marker = marker_O;
                player = 1;
            }
            moves--;
        }

    };

    this.getCellMarker = function() {
        return this.marker;
    };

}

// if mouse press load the click function
function mousePressed() {
    print("Detected mouse press");
    print(mouseX);
    print(mouseY);
    if (mouseX > 50 && mouseX < 150 && mouseY > 50 && mouseY < 150) {
        SquareGrid[0].click();
    }
    if (mouseX > 150 && mouseX < 250 && mouseY > 50 && mouseY < 150) {
        SquareGrid[1].click();
    }
    if (mouseX > 250 && mouseX < 350 && mouseY > 50 && mouseY < 150) {
        SquareGrid[2].click();
    }
    if (mouseX > 50 && mouseX < 150 && mouseY > 150 && mouseY < 250) {
        SquareGrid[3].click();
    }
    if (mouseX > 150 && mouseX < 250 && mouseY > 150 && mouseY < 250) {
        SquareGrid[4].click();
    }
    if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
        SquareGrid[5].click();
    }
    if (mouseX > 50 && mouseX < 150 && mouseY > 250 && mouseY < 350) {
        SquareGrid[6].click();
    }
    if (mouseX > 150 && mouseX < 250 && mouseY > 250 && mouseY < 350) {
        SquareGrid[7].click();
    }
    if (mouseX > 250 && mouseX < 350 && mouseY > 250 && mouseY < 350) {
        SquareGrid[8].click();
    }
}

function setGamePlay() {
    
    play = true;
    winner = 0;
    // isGameOver = false;
    moves = 9;
    player = 1;
    background(200);

    var startX = 50;
    var startY = 50;
    var cellWidth = 100;
    var cellHeight = 100;
    SquareGrid = [];
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            SquareGrid.push(new Square(startX, startY, cellWidth, cellHeight));
            startX += cellWidth;
        }

        startY += cellHeight;
        startX = 50;
    }
    return SquareGrid;
}

// function that returns randombot object
function RandomBot(botName, playingStyle){
    this.name = botName;
    this.playingStyle = playingStyle;
    
    this.firstEmptyPosition = function(){
        for(var position = 0; position < 9; position++){
            if(SquareGrid[position].getCellMarker() == 2){
                return position;
            }
        }
        return -1;
    };

    /**
     * @return {number}
     */
    this.RandomPosition = function(){
        var isEmpty = 0;
        var position = -1;
        while(isEmpty != 1){
            position = parseInt(random(10000), 10) % 9;
            if(SquareGrid[position].getCellMarker() == 2){
                isEmpty = 1;
            }
        }
        return position;
    };
    
    this.makeMove = function(marker){
        var position = -1;
        if(playingStyle == 0){
            position = this.firstEmptyPosition();
        }else{
            position = this.RandomPosition();
        }
        console.log("In randomBot marking position = " + position);
        SquareGrid[position].marker = marker;
    };
}

function NonAIBot(botName, playerNumber, marker){
    this.name = botName;
    this.playerNumber = playerNumber;
    this.marker = marker;

    // function to make move
    this.makeMove = function(){
        var position = this.getBestMove();
        console.log("in makeMove position returned = " + position);
        this.makeMark(position);
    };

    // function to make mark on the grid
    this.makeMark = function(position) {
        console.log(position);
        if(SquareGrid[position].getCellMarker() == 2) {
            SquareGrid[position].marker = this.marker;
        }
    };

    var corners = [0,2,6,8];
    var edges   = [1,3,5,7];

    // function that check if a corner is empty and returns postion of the empty corner
    this.getEmptyCorner = function() {
        var emptyCorner = -1;
        for(var index = 0; index < corners.length; index++) {
            var pos = corners[index];
            if (SquareGrid[pos].getCellMarker() == 2) {
                emptyCorner = corners[index];
                break;
            }
        }
        console.log("in getEmptyCorner returning position = " + emptyCorner);
        return emptyCorner;
    };

    // function that check if a edge is empty and returns postion of the empty edge
    this.getEmptyEdge = function() {
        var emptyEdge = -1;
        for(var index = 0; index < edges.length; index++) {
            if (SquareGrid[ edges[index]].getCellMarker() == 2) {
                emptyEdge = edges[index];
                break;
            }
        }
        console.log("in getEmptyEdge returning position = " + emptyEdge);
        return emptyEdge;
    };

    /*
       Board positions

       0   |  1  |  2
     ------------------
       3   |  4  |  5
     ------------------
       6   |  7  |  8

     */

    this.getBestMove = function(){
        var position = -1;
        var movesMade = 10 - moves;
        console.log("In getBestMove movesMade = " + movesMade);
        switch(movesMade)
        {
            // if board is empty then take the centre
            case 1:
                position = 4;
                break;

            // if making second move check if centre is empty if yes then mark it
            // else get a corner
            case 2:
                if(SquareGrid[4].getCellMarker() == 2) {
                    position = 4;
                }else {
                    position = this.getEmptyCorner();
                }
                break;

            // mark a corner as we have marked centre in first move
            case 3:
                position = this.getEmptyCorner();
                break;


            case 4:
                // for the fourth move first check if the opponent is winning or not
                // if yes then block that position
                position = this.checkPossibleWin( (this.marker == marker_X) ? marker_O : marker_X );
                console.log("checking if enemy can win position returned = " + position);
                // if the opponent is not winning then aquire another corner
                if(position == -1) {
                    position = this.getEmptyCorner();
                    this.makeMark(position);
                }
                break;

            case 5:
            case 6:
            case 7:
            case 8:
            case 9:

                // check for self win if yes then make the move
                console.log("checking for self win");
                position = this.checkPossibleWin( (this.marker == marker_X) ? marker_X : marker_O );
                if(position != -1 && SquareGrid[position].getCellMarker() == 2) {
                    break;
                }
                console.log("self win not possible ");

                console.log("checking for enemy win");
                // if the opponent is winning then block that position
                position = this.checkPossibleWin( (this.marker == marker_X) ? marker_O : marker_X );
                if(position != -1 && SquareGrid[position].getCellMarker() == 2) {
                    break;
                }
                // if none of the above cases then try getting an empty corner or an edge
                else {
                    position = this.getEmptyCorner();
                    if(position == -1){
                        position = this.getEmptyEdge();
                    }
                }
                break;
        }
        console.log("in get Best Move returning position = " + position);
        return position;
    };

    // below function checks if the there is a winning position with given marker
    // return winning position number
    this.checkPossibleWin = function(marker){
        var winScore = 0;
        if(marker == marker_X){
            winScore = 18;
        }else{
            winScore = 50;
        }
        // checking for row wins
        for (var index = 0; index < 7; index += 3) {
            if ((SquareGrid[index].getCellMarker() * SquareGrid[index + 1].getCellMarker() * SquareGrid[index + 2].getCellMarker())  == winScore) {
                if(SquareGrid[index].getCellMarker() == 2){
                    return index;
                }else if(SquareGrid[index + 1].getCellMarker() == 2){
                    return index + 1;
                }else{
                    return index + 2;
                }
            }
        }

        // checking for col wins
        for (index = 0; index < 3; index++) {
            console.log("checking wins at position = " + index, index + 3, index + 6 + " marker = " + marker);
            if ((SquareGrid[index].getCellMarker() * SquareGrid[index + 3].getCellMarker() * SquareGrid[index + 6].getCellMarker()) == winScore) {
                if(SquareGrid[index].getCellMarker() == 2){
                    return index;
                }else if(SquareGrid[index + 3].getCellMarker() == 2){
                    return index + 3;
                }else{
                    return index + 6;
                }
            }
        }

        // checking for diagonal wins
        if ((SquareGrid[0].getCellMarker() * SquareGrid[4].getCellMarker() * SquareGrid[8].getCellMarker()) == winScore) {
            if(SquareGrid[0].getCellMarker() == 2){
                return 0;
            }else if(SquareGrid[4].getCellMarker() == 2){
                return 4;
            }else{
                return 8;
            }
        }

        if ((SquareGrid[2].getCellMarker() * SquareGrid[4].getCellMarker() * SquareGrid[6].getCellMarker()) == winScore) {
            if(SquareGrid[2].getCellMarker() == 2){
                return 2;
            }else if(SquareGrid[4].getCellMarker() == 2){
                return 4;
            }else{
                return 6;
            }
        }
        return -1;
    };
}

// tic tac toe bot that uses minimax algo to play
function MinMaxBot(botName, playerNumber, marker){
    this.name = botName;
    this.playerNumber = playerNumber;
    this.marker = marker;
    this.firstMoveMade = false;

    // function to make move
    this.makeMove = function(){
        var position = this.getBestMove();
        console.log("in makeMove position returned = " + position);
        this.makeMark(position);

    };

    // function to make mark on the grid
    this.makeMark = function(position) {
        if(position == -1){
            // marking any position randomly
            while(true){
                position = parseInt(random(10000), 10) % 9;
                if(SquareGrid[position].getCellMarker() == 2){
                    break;
                }
            }
            SquareGrid[position].marker = this.marker;
        }
        console.log("In make mark minmaxbot marking position " + position);
        if(SquareGrid[position].getCellMarker() == 2) {
            SquareGrid[position].marker = this.marker;
        }
    };

    // function to undo a move
    this.undoMove = function(position){
        SquareGrid[position].marker = 2;
    };

    var corners = [0,2,6,8];
    var edges   = [1,3,5,7];

    // function that check if a corner is empty and returns postion of the empty corner
    this.getEmptyCorner = function() {
        var emptyCorner = -1;
        for(var index = 0; index < corners.length; index++) {
            var pos = corners[index];
            if (SquareGrid[pos].getCellMarker() == 2) {
                emptyCorner = corners[index];
                break;
            }
        }
        console.log("in getEmptyCorner returning position = " + emptyCorner);
        return emptyCorner;
    };

    // function that check if a edge is empty and returns postion of the empty edge
    this.getEmptyEdge = function() {
        var emptyEdge = -1;
        for(var index = 0; index < edges.length; index++) {
            if (SquareGrid[ edges[index]].getCellMarker() == 2) {
                emptyEdge = edges[index];
                break;
            }
        }
        console.log("in getEmptyEdge returning position = " + emptyEdge);
        return emptyEdge;
    };

    // function that creates a dummy board
    this.createGridCopy = function(){
        var board = [];
        for(var index = 0; index < 9; index++){
            board.push(SquareGrid[index].getCellMarker());
        }
        return board;
    };

    /*
       Board positions

       0   |  1  |  2
     ------------------
       3   |  4  |  5
     ------------------
       6   |  7  |  8

     */

    // function that returns true if there are blank spaces on the board
    this.isMovesLeft = function(){
        var movesLeft = 0;
        for(var index = 0; index < 9; index++){
            if(SquareGrid[index].marker == 2){
                return true;
            }
        }
        return false;
    };

    this.MinMaxMove = function(board, depth, isMax){
        if(depth > 2){
            if(isMax)
                return -100;
            else
                return 100;
        }

        // check for win method must return a score of 10 if the maximizer has won and -10 if the minimizer has won
        var score = this.checkPossibleWin(this.marker, board);
        // If Maximizer has won the game return his/her
        // evaluated score
        if (score == 10)
            return score;

        // If Minimizer has won the game return his/her
        // evaluated score
        if (score == -10)
            return score;

        // If there are no more moves and no winner then
        // it is a tie
        if (this.isMovesLeft() == false) {
            return 0;
        }

        // If this maximizer's move
        if (isMax) {
            // setting best to be the min value
            var best = -10000;

            // Traverse all cells
            for (var index = 0; index < 9; index++)
            {
                // Check if cell is empty
                if (board[index] == 2) {
                    // Make the move
                    board[index] = this.marker;

                    // Call minimax recursively and choose
                    // the maximum value
                    best = this.max(best,this.MinMaxMove(board, depth + 1, !isMax));

                    // Undo the move
                    board[index] = 2;
                }
            }
            // console.log("In minMaxMove returning best value " + best);
            return best;
        }

        // If this minimizer's move
        else {
            // setting best to be the max value
            var best = 10000;

            // Traverse all cells
            for (var index = 0; index < 9; index++)
            {
                // Check if cell is empty
                if (board[index] == 2)
                {
                    // Make the move
                    board[index] = (this.marker == marker_X) ? marker_O : marker_X;

                    // Call minimax recursively and choose
                    // the minimum value
                    best = this.min(best, this.MinMaxMove(board, depth+1, !isMax));

                    // Undo the move
                    board[index] = 2;
                }

            }
            // console.log("In minMaxMove returning best value " + best);
            return best;
        }
    };

    // This will return the best possible move for the player
    this.findBestMove = function()
    {
        var bestVal = -1000;
        var bestMoveIndex = -1;
        this.board = this.createGridCopy();

        // Traverse all cells, evalutae minimax function for
        // all empty cells. And return the cell with optimal
        // value.
        for (var index = 0; index < 9; index++)
        {
            // Check if cell is empty
            if (this.board[index] == 2) {
                console.log("Empty index " + index + " found checking move value");
                // Make the move
                this.board[index] = this.marker;

                // compute evaluation function for this
                // move.
                var moveVal = this.MinMaxMove(this.board, 2, false);
                console.log("Value for empty index " + index + " is " + moveVal);

                // Undo the move
                this.board[index] = 2;

                // If the value of the current move is
                // more than the best value, then update
                // best
                if (moveVal > bestVal) {
                    bestVal = moveVal;
                    bestMoveIndex = index;
                }
            }
        }

        console.log("The value of the best Move Index is : %d", bestVal);
        return bestMoveIndex;
    };

    this.getBestMove = function(){
        var position = -1;
        var movesMade = 10 - moves;
        console.log("In getBestMove movesMade = " + movesMade);
        switch(movesMade)
        {
            // if board is empty then take the centre
            case 1:
                position = 4;
                break;

            // if making second move check if centre is empty if yes then mark it
            // else get a corner
            case 2:
                if(SquareGrid[4].getCellMarker() == 2) {
                    position = 4;
                }else {
                    position = this.getEmptyCorner();
                }
                break;

            // mark a corner as we have marked centre in first move
            case 3:
                position = this.getEmptyCorner();
                break;

            /*
            case 4:
                // for the fourth move first check if the opponent is winning or not
                // if yes then block that position
                position = this.checkPossibleWin( (this.marker == marker_X) ? marker_O : marker_X );
                console.log("checking if enemy can win position returned = " + position);
                // if the opponent is not winning then aquire another corner
                if(position == -1) {
                    position = this.getEmptyCorner();
                    this.makeMark(position);
                }
                break;
            */
            case 4:
            case 5:
                position = this.findBestMove();
                break;
            case 6:
            case 7:
            case 8:
            case 9:
                position = this.findBestMove();
                break;
        }
        console.log("in get Best Move returning position = " + position);
        return position;
    };

    this.max = function(a,b){
        return (a > b)? a : b;
    };

    this.min = function(a,b){
        return (a > b)? b : a;
    };

    // below function checks if the there is a winning position with given marker
    // return winning position number
    this.checkPossibleWin = function(marker, board) {

        var playerMarker = marker;
        var opponentMarker = (marker == marker_X) ? marker_O : marker_X;
        // console.log(board);
        if (this.check_for_win(playerMarker, board)) {
            //console.log("Found a config with player win " + board);
            return 10;
        }
        if (this.check_for_win(opponentMarker, board)) {
            //console.log("Found a config with opponent win " + board);
            return -10;
        } else {
            return 0;
        }
    };

    this.check_for_win = function( marker, board ){
        // checking for row wins
        for (var index = 0; index < 7; index += 3) {
            if (board[index] == marker && board[index + 1] == marker && board[index + 2] == marker) {
                return true;
            }
        }

        // checking for col wins
        for (index = 0; index < 3; index++) {
            if (board[index] == marker && board[index + 3] == marker && board[index + 6] == marker) {
                return true;
            }
        }

        // checking for diagonal wins
        if (board[0] == marker && board[4] == marker && board[8] == marker) {
            return true;
        }

        if (board[2] == marker && board[4] == marker && board[6] == marker) {
            return true;
        }

        // if none of above cases is true then return false
        return false;
    }
}

// references
// https://stackoverflow.com/questions/37832505/how-to-make-a-checkbox-in-circle-shape-with-custom-css
// https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
// https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe
// https://www.wikihow.com/Win-at-Tic-Tac-Toe#Never_Losing_when_Playing_Second_sub