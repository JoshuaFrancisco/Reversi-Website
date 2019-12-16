<!-- login.php -->
<!DOCTYPE html>
<html lang= "en">
 <head> 
  <meta charset="utf 8">
   <title> Login Page </title>

	<!-- CSS elements header file --> 
    <link rel="stylesheet" href="CSS/styles.css" media="all" />
    
 </head>

 <!-- Background Gradient-->
 <body class = "bgGradient">

	<!-- Reversi image board top right --> 
 	<div id = "content"> <img src="images/reversi_board.png" class="board" alt="reversi board"> </div>
 	
 	<!-- Login logo title -->
  	<div class="title" alt="Login logo"> LOGIN </div>

 	<!-- left indent in margins -->
  <div class="leftMargins arialChange">
 	<h3 class="arialChange"> Created by using HTML, CSS, Javascript, and PHP </h3> <br>



    <h3> <br> Welcome to Reversi Game! </h3>
    <form method="POST" action="userLogin.php" class="arialChange">

      <!--Username and Password input -->
      USERNAME: <input type="text" name="username" class="formBox"><br><br>
      PASSWORD: <input type="password" name="password" class="formBox"><br><br>

      <!--Login and Register Buttons -->
      <input type="submit" name="submit" class= "myButton" value="Login">
      <button class= "myButton"><a class = "noLink" href="Register.php"> Register </a></button> 
   </div>
	<br> <br>
   <!-- Go back to homepage -->
   <a class = "leftMargins myButton" href="index.php"> ← BACK </a>

</body>
</html>