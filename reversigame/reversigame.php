<!-- reversigame.php -->
<html lang = "en">
 <head>
  <meta charset="UTF-8"> 
   <title> Reversi Game </title>

    <!-- CSS elements header file --> 
    <link rel="stylesheet" href="CSS/styles.css" media="all" />

    <!-- Up-to-date Jquery url link -->
    <script src="http://code.jquery.com/jquery-3.4.1.min.js"></script>

    <!-- include reversi.js and game.js --> 
    <script src="JS/reversi.js"></script>
    <script src="JS/game.js"></script>

    <!-- Initialize reversi game --> 
    <script>
        $(function(){
            init();
        });
    </script>
 </head>

 <!-- Blue to Black Gradient-->
 <body class = "bgGradient">

 <!-- Reversi image board top right --> 
 <div id = "content"> <img src="images/reversi_board.png" class="board" alt="reversi board"> </div>

        <!-- Go back to homepage -->
        <a class = "leftMargins myButton" href="index.php"> ← Back </a>
        <br> <br>

        <!-- Timer -->
        <p id="timer" class ="arialChange"></p>
        <br> <br>

        <script class="arialChange">
        var sec = 0;
        var timer = document.getElementById("timer");
        
        function countTime() {
        if (!gameOver) { // run timer while game is not over
            sec++;
            timer.innerText = "Timer: " + sec + " seconds";
            }
        else { // end timer when game is over
            var endTime = sec;
            timer.innerText = "Timer: " + endTime + " seconds";
            }
        }
        var seconds = setInterval(countTime, 1000);
        </script>

        <!-- Game board -->
        <div id="game"></div> <br><br>

       <!-- Message board that displays turn, score, errors, win and game over -->
        <div id="messages" class="messageStyles"></div>