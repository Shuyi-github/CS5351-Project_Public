<?php
	$conn =  new mysqli("localhost:3306", "sag", "cs5351sag", "sag");
	$conn->set_charset("utf8");

	$sql = "insert into client(Name, Phone, Address, ContactPerson) values(?, ?, ?, ?);";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('sssi', $_POST['client_name'], $_POST['contact_information'], $_POST['client_address'], rand(0, 65535));
	$stmt->execute();
	if($conn->errno == 0) {
		echo json_encode(['status' => 0, 'message' => 'success']);
	} else {
		echo json_encode(['status' => 1, 'message' => $conn->error_list]);
	}	
?>