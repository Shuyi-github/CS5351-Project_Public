<?php
	class Config {
		public static $DBCONFIG = [
			'db_address' => 'localhost:3306',
			'db_user' => 'sag',
			'db_password' => 'cs5351sag',
			'db_name' => 'sag',
		];

		public static  $DOMAIN = "http://localhost";

		public static  $AUTHORITY = [
			'CHECK_SELF' => 1,
			'UPDATE_CAMPAIGN' => 8,
			'PUBLIC' => 65535,
		];

		public static $ADTYPE = [
			1 => 'NEWSPAPER AD',
			2 => 'ONLINE AD',
			3 => 'TV COMMERCIAL'
		];
	}
	
?>