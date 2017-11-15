<?php
	include 'data/common.php';
	include 'data/staffModel.php';
	class loginLogic {
		public static function auth() {
			return [$AUTHORITY['PUBLIC']];
		}

		public static function login() {
			$searchModel = new StaffModel();
			$user = $searchModel->findByEmail($_POST['Email']);
		}
	}
?>