<?php
	class Tool{
		public static $DB;

		public static function checkUserStatus() {
			if(isset($_SESSION['id'])) {
				return TRUE;
			}
			return FALSE;
		}

		public static function checkAuthoriation($auth) {
			if(isset(Config::$AUTHORITY['$auth'])) {
				if(Config::$AUTHORITY['$auth'] & $_SESSION['auth']) {
					return TRUE;
				}
			}
			return FALSE;
		}

		public static function initDB($dbConfig) {
			self::$DB = new mysqli($dbConfig['db_address'], $dbConfig['db_user'], $dbConfig['db_password'], $dbConfig['db_name']);
			self::$DB->set_charset("utf8");
		}

		public static function getDBConnection() {
			return self::$DB;
		}

		public static function checkParameters($param) {
			foreach($param as $key => $value) {
				if(isset($_POST[$key])) {
					switch($value) {
						case 'not null':
							if(empty($_POST[$key])) {
								return FALSE;
							}
							break;
						case 'int':
							$_POST[$key] = intval($_POST[$key]);
							break;
						default:
					}
				} else {
					return FALSE;
				}
			}
			return TRUE;
		}
	}
?>