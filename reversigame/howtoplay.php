<!-- howtoplay.php -->
<!DOCTYPE html>
<html lang= "en">
 <head>
  <meta charset="utf 8">
   <title> How to Play </title>

	<!-- CSS elements header file --> 
    <link rel="stylesheet" href="CSS/styles.css" media="all" />
 </head>

 <!-- Green to black gradient background -->
 <body class = "bgGradient">
	
	<!-- Reversi image board top right --> 
 	<div id = "content"> <img src="images/reversi_board.png" class="board" alt="reversi board"> </div>
 	
 	<!-- How to Play PNG logo title -->
  <div class="title" alt="How to Play"> HOW TO PLAY </div>

	<!-- left indent in margins and font change-->
  <div class="leftMargins">
  <span class="arialChange textAlign">
   <h3> Created by using HTML, CSS, Javascript, and PHP </h3> <br>
  
  <!-- "Meat" of the page -->
   <h3> INTRODUCTION </h3>
   
   <p> Hello, and Welcome to the How to Play page. This page includes the history of Reversi, provides a description of the <br> game, and teaches you how to play the game. </p>
   
   <h3> ORIGIN </h3>
   
   <p> Othello, more commonly known as Reversi, is a classic board game. The origins of the game has no formal proof but two places have <br> suggested it's invention. One origin comes from China from a game called 'Fan Mian.' The other is from Lewis Waterman and John W. <br> Mollett in the late 1800s. In the 1970's a japanese man named Goro Hasegawa created and developed the modern rules of Othello <br> and are formally adopted throughout the world.  </p>
   
   <h3> DESCRIPTION </h3>
   
   <p> Reversi strategy board game pits two players against each other. Reversi is traditionally played on an 8x8 board but we allow the option <br> to play the game on either a 6x6 or a 4x4 board as well. There are 64 (32 on 6x6, 16 on 4x4) identical circular pieces called *italicize* disks <br> (often spelled "discs"), similiar to checker chips. Each side of the disk has a different color, one side is black the other is white. Players take <br> turns placing their assigned colored disk on the board. During a player's turn a player must place a piece to flank an opposing player's <br> piece/pieces so that it changes color to the player's color and vice versa. The game ends where there are no more legal moves available. <br> The player who has the most of their colored pieces on the board wins the game. </p>
   
   <h3> RULES </h3>

   <p> A move consists of placing from a "new" outside piece onto the board. Placed pieces can never be moved to another square later in the game. <br> <br>

   The incorporation of the pieces must abide by these following rules: </p>
   
   <ul>
    <li> The incorported piece must outflank one or more of the opposing colors placed pieces </li>
    <li> To outflank means that a one piece or one straight row (vertical, horizontal or diagonal) of pieces of the opponent <br> 
      is in both sides next to the owned pieces, with no empty squares between all those pieces </li>
    <li> The player who makes the move turns the outflanked pieces to their color, turning all of them into their owned colored pieces </li>
    <li> If there is more than one outflanked row, all the involved pieces in those rows must be flipped </li>
    <li> If it´s not possible to make this type of move, their turn is forfeited and the opponent repeats another move </li>
   </ul>
  </span>

   <br> <br>
   <!-- Go back to homepage -->
   <a class="myButton" href="index.php"> ← BACK </a>

  </div>

</body>
</html>