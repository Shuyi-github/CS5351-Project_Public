<?php
	preg_match_all("/\//", $_SERVER['REQUEST_URI'], $path);
	if(sizeof($path[0]) != 3) {
		echo json_encode(['status' => 1, 'message' => 'Invalid path.']);
		exit;
	}
	preg_match("/\/([^\/]*)?\/([^\/]*)?\/([^\/]*)?/", $_SERVER['REQUEST_URI'], $path);
	if(!file_exists('./backend/logic/' . $path[2] . '.php')) {
		echo json_encode(['status' => 1, 'message' => 'Invalid path.']);
		exit;
	}


	include 'config.php';
	include 'tool.php';
	Tool::initDB(Config::$DBCONFIG);
	session_start();

	include 'logic/' . $path[2] . '.php';
	$classname = $path[2] . 'Logic';
	$api = $path[3];
	echo json_encode($classname::$api());
	Tool::getDBConnection()->close();
?>