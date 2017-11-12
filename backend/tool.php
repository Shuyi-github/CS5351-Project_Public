<?php
	class Tool{
		private $DB;

		function checkUserStatus() {
			if(session_is_registered('staffID')) {
				return TRUE;
			}
			return FALSE;
		}

		function checkAuthoriation($auth) {
			foreach($auth as $a) {
				if($_SESSION['auth'] & $a == 0) {
					return FALSE;
				}			
			}
			return TRUE;
		}

		function initDB($dbConfig) {
			$this->DB = new mysqli($dbConfig['db_address'], $dbConfig['db_user'], $dbConfig['db_password'], $dbConfig['db_name']);
			$this->DB->set_charset("utf8");
		}

		function getDBConnection() {
			return $DB;
		}
	}
?>