<?php
	include 'config.php';
	include 'tool.php';
	$TOOL = new Tool();
	$TOOL->initDB($db);
	session_start();	

	$api = $_GET['target'];
	if($api != 'login' && !$TOOL->checkUserStatus()) {
		echo json_encode(['status': 1, 'message': 'Please login first.']);
	}

	include 'logic/' . $api . '.php';
	$classname = $api . 'Logic';
	$logic = new $classname();
	if($TOOL->checkAuthoriation($logic->auth)) {
		echo json_encode($logic->$api());
	} else {
		echo json_encode(['status': 1, 'message': 'Not authorized.']);
	}

?>