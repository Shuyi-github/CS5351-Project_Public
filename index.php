<?php
	if($_SERVER['REQUEST_URI'] == '/') {
		include './frontend/home.html';
	} else {
		$target = $_SERVER['REQUEST_URI'];
		$pos = strpos($target, '?');
		if($pos) {
			$target = substr($target, 0, $pos);
		}
		$pos = strpos($target, '/', 1);
		if($pos && (substr($target, 1, $pos - 1) == 'backend')) {
			include './backend/index.php';
		} else {
			$target = './frontend' . $target;
			if(file_exists($target)) {
				include $target;
			} elseif(file_exists($target . '.html')) {
				include $target . '.html';
			} elseif(file_exists($target . '.php')) {
				include $target . '.php';
			} else {
				include './frontend/404.html';
			}
		}
	}	
?>