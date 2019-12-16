<!-- login.php -->

<!DOCTYPE html>
<html lang= "en">
 <head> 
  <meta charset="utf 8">
   <title> Sign Up Page </title>

	<!-- CSS elements header file --> 
    <link rel="stylesheet" href="CSS/styles.css"/>

 </head>

<!-- Background Gradient-->
 <body class = "bgGradient">

  <!-- Reversi image board top right --> 
  <div id = "content"> <img src="images/reversi_board.png" class="board" alt="reversi board"> </div>
  
  <!-- Register logo title -->
  <div class="title" alt="Register logo"> REGISTER </div>

  <!-- left indent in margins -->
  <div class="leftMargins">
  <h3 class="arialChange"> Created by using HTML, CSS, Javascript, and PHP </h3> <br>

 <body>

    <form class="arialChange" method="POST" action="userRegistration.php">
    USERNAME : <input type="text" name="username" class="formBox"><br>
    PASSWORD : <input type="password" name="password" class="formBox"><br>
    FIRST NAME : <input type="text" name="first_name" class="formBox"><br>
    LAST NAME : <input type="text" name="last_name" class="formBox"><br>
    AGE : <input type="number" name="age" class="formBox"><br>
    GENDER: <input type="text" name="gender" class="formBox"><br>
    LOCATION : <input type="text" name="location" class="formBox"><br><br>

    <input class= "myButton" type="submit" value="SUBMIT" >
    </form>
 
  <br> <br>
   <!-- Go back to homepage -->
   <a class = "myButton" href="login.php"> ← BACK </a>

  </body>
</html>

