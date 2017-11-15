<?php
	if(strlen($_SERVER['REQUEST_URI']) <= 9) {
		echo json_encode(['status' => 1, 'message' => 'Invalid path.']);
		exit;
	}
	$api = substr($_SERVER['REQUEST_URI'], 9);
	if(!file_exists('./backend/logic/' . $api . '.php')) {
		echo json_encode(['status' => 1, 'message' => 'Invalid path.']);
		exit;
	}

	include 'config.php';
	include 'tool.php';
	Tool::initDB(Config::$DBCONFIG);
	session_start();
	
	/*if($api != 'login' && !$TOOL->checkUserStatus()) {
		echo json_encode(['status' => 1, 'message' => 'Please login first.']);
		exit;
	}*/

	include 'logic/' . $api . '.php';
	$classname = $api . 'Logic';
	if(Tool::checkAuthoriation($classname::auth())) {
		echo json_encode($classname::$api());
	} else {
		echo json_encode(['status' => 1, 'message' => 'Not authorized.']);
	}
?>