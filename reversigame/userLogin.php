<?php //Login.php

//config.php creates a connection to database and checks for connection errors
include "config.php"

//Variables submitted by user
$loginUser = $_POST["loginUser"];
$loginPass = $_POST["loginPass"];

$sql = "SELECT password FROM players WHERE username = '" . $loginUser . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
 //output data of each row
 while($row = $result->fetch_assoc()) {
    if($row["password"] == $loginPass)
    {
        echo "Login Success.";
        //Add other functionalities here:

        //Get user's data here.

        //Get player info.

        //Get Inventory.
        
        //Modify player data.

        //Update inventory.
    }
    else 
    {
        echo "Wrong Credentials.";
    }
}
} else {
echo "Username does not exist.";
}

//Close connection
$conn->close();


?> 