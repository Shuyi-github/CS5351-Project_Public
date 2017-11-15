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
			'CHECKTEAM_SELF' => 1,
			'CHECKTEAM_ALL' => 2,
			'PUBLIC' => 65535,
		];
	}
	
?>