<?php
	$conn =  new mysqli("localhost:3306", "sag", "cs5351sag", "sag");
	$conn->set_charset("utf8");

	$sql = "insert into staff(FirstName, LastName, Phone, Email, Password, Payrate, Role) values($_GET['FirstName'], $_GET['LastName'], '0', '$_GET['Email']', '0', 0, 0)";
	echo json_encode(['status': 0, 'message': 'success']);
?>