<?php
	if($_SERVER['REQUEST_URI'] == '/') {
		include './frontend/index.html';
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
				$suffix = substr($target , strrpos($target, '.') + 1);
				switch($suffix) {
					case 'css':
						header('Content-Type: text/css; charset=UTF-8');
						break;
					case 'js':
						header('Content-Type: text/javascript; charset=UTF-8');
						break;
					default:
						header('Content-Type: ' . mime_content_type($target) . '; charset=UTF-8');
				}
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