<?php
	class Tool{
		public static $DB;

		public static function checkUserStatus() {
			if(session_is_registered('staffID')) {
				return TRUE;
			}
			return FALSE;
		}

		public static function checkAuthoriation($auth) {
			foreach($auth as $a) {
				if($_SESSION['auth'] & $a == 0) {
					return FALSE;
				}			
			}
			return TRUE;
		}

		public static function initDB($dbConfig) {
			self::$DB = new mysqli($dbConfig['db_address'], $dbConfig['db_user'], $dbConfig['db_password'], $dbConfig['db_name']);
			self::$DB->set_charset("utf8");
		}

		public static function getDBConnection() {
			return self::$DB;
		}
	}
?>